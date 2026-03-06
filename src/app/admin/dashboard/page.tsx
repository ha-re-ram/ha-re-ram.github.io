"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Edit2, Trash2, Github, Plus, GripVertical, Save } from "lucide-react";
import { Reorder } from "framer-motion";

export default function AdminDashboard() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Form states
    const [tab, setTab] = useState("blogs"); // 'blogs' | 'projects'
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("Completed");
    const [githubUrl, setGithubUrl] = useState("");
    const [liveUrl, setLiveUrl] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [editId, setEditId] = useState<string | null>(null);

    const [items, setItems] = useState<any[]>([]);
    const [isSavingOrder, setIsSavingOrder] = useState(false);

    // GitHub candidates
    const [githubRepos, setGithubRepos] = useState<any[]>([]);
    const [showGithub, setShowGithub] = useState(false);

    useEffect(() => {
        if (!auth) {
            setLoading(false);
            router.push("/admin");
            return;
        }
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                router.push("/admin");
            } else {
                const isEmailPasswordUser = currentUser.providerData.some(p => p.providerId === 'password');
                const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
                if (adminEmail && currentUser.email !== adminEmail) {
                    signOut(auth);
                    router.push("/admin");
                    alert("Access Denied: You are not the admin. Logging out.");
                } else if (!adminEmail && !isEmailPasswordUser) {
                    signOut(auth);
                    router.push("/admin");
                    alert("Access Denied: Dashboard is for email/password admins only.");
                } else {
                    setUser(currentUser);
                    fetchItems("blogs");
                }
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [router]);

    const fetchItems = async (collectionName: string) => {
        if (!db) return;
        try {
            const querySnapshot = await getDocs(collection(db, collectionName));
            const data: any[] = [];
            querySnapshot.forEach((doc) => {
                data.push({ id: doc.id, ...doc.data() });
            });
            // Sort by order first, then date
            data.sort((a, b) => {
                if (a.order !== undefined && b.order !== undefined) return a.order - b.order;
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            });
            setItems(data);
        } catch (error: any) {
            console.error("Error fetching data:", error);
            alert("Database Error: " + error.message + "\n\nPlease check your Firestore Security Rules in the Firebase Console! They might be set to 'Production' instead of 'Test Mode'.");
        }
    };

    const fetchGithubRepos = async () => {
        if (githubRepos.length > 0) {
            setShowGithub(!showGithub);
            return;
        }
        try {
            const res = await fetch("https://api.github.com/users/ha-re-ram/repos?sort=updated&per_page=100");
            const repos = await res.json();
            setGithubRepos(repos);
            setShowGithub(true);
        } catch (error) {
            alert("Error fetching GitHub repos");
        }
    };

    const importFromGithub = (repo: any) => {
        setTitle(repo.name.replace(/-/g, ' '));
        setContent(repo.description || "");
        setGithubUrl(repo.html_url);
        setCategory("Pending");
        setShowGithub(false);
    };

    const handleTabChange = (newTab: string) => {
        setTab(newTab);
        resetForm();
        fetchItems(newTab);
    };

    const resetForm = () => {
        setTitle("");
        setContent("");
        setCategory("Completed");
        setGithubUrl("");
        setLiveUrl("");
        setImageUrl("");
        setEditId(null);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!db) return alert("Database not initialized");

        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

        const dataPayload: any = {
            title,
            content,
            slug,
        };

        if (tab === "projects") {
            dataPayload.category = category;
            dataPayload.githubUrl = githubUrl;
            dataPayload.liveUrl = liveUrl;
            dataPayload.imageUrl = imageUrl;
        }

        try {
            if (editId) {
                // Update
                await updateDoc(doc(db, tab, editId), dataPayload);
                alert(`${tab === "blogs" ? "Blog" : "Project"} updated!`);
            } else {
                // Add
                dataPayload.date = new Date().toISOString();
                dataPayload.order = items.length;
                await addDoc(collection(db, tab), dataPayload);
                alert(`${tab === "blogs" ? "Blog" : "Project"} added!`);
            }
            resetForm();
            fetchItems(tab);
        } catch (error: any) {
            alert("Error saving document: " + error.message);
        }
    };

    const handleEdit = (item: any) => {
        setEditId(item.id);
        setTitle(item.title);
        setContent(item.content);
        if (tab === "projects") {
            setCategory(item.category || "Completed");
            setGithubUrl(item.githubUrl || "");
            setLiveUrl(item.liveUrl || "");
            setImageUrl(item.imageUrl || "");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        if (!db) return alert("Database not initialized");
        try {
            await deleteDoc(doc(db, tab, id));
            fetchItems(tab);
        } catch (error: any) {
            alert("Error deleting document: " + error.message);
        }
    };

    const handleReorder = (newOrder: any[]) => {
        setItems(newOrder); // Instant local UI update
    };

    const saveReorder = async () => {
        if (!db) return;
        setIsSavingOrder(true);
        try {
            // Only update those whose index actually changed from their local .order property
            const promises = items.map((item, index) => {
                if (item.order !== index) {
                    return updateDoc(doc(db, tab, item.id), { order: index });
                }
                return Promise.resolve();
            });
            await Promise.all(promises);
            fetchItems(tab);
            alert("New order saved successfully!");
        } catch (error) {
            alert("Error saving the new order.");
        } finally {
            setIsSavingOrder(false);
        }
    };

    const handleLogout = async () => {
        if (auth) {
            await signOut(auth);
        }
        router.push("/admin");
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-black text-white">Loading...</div>;
    if (!user) return null;

    return (
        <main className="min-h-screen bg-black text-white p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">
                        Admin CMS
                    </h1>
                    <button onClick={handleLogout} className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/40 transition">
                        Logout
                    </button>
                </div>

                <div className="flex gap-4 mb-8 border-b border-gray-800 pb-2">
                    <button
                        onClick={() => handleTabChange("blogs")}
                        className={`px-4 py-2 font-semibold transition-colors ${tab === "blogs" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-500 hover:text-gray-300"}`}
                    >
                        📝 Blogs
                    </button>
                    <button
                        onClick={() => handleTabChange("projects")}
                        className={`px-4 py-2 font-semibold transition-colors ${tab === "projects" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-500 hover:text-gray-300"}`}
                    >
                        🚀 Projects
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Form Section */}
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 flex flex-col h-fit">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">{editId ? "Edit" : "Add New"} {tab === "blogs" ? "Blog" : "Project"}</h2>
                            {editId && (
                                <button onClick={resetForm} className="text-sm text-gray-400 hover:text-white px-3 py-1 bg-white/5 rounded-md border border-white/10">
                                    Cancel Edit
                                </button>
                            )}
                        </div>

                        {tab === "projects" && (
                            <button
                                onClick={fetchGithubRepos}
                                className="mb-6 w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg border border-gray-600 transition"
                            >
                                <Github size={18} /> Fetch / Import from GitHub
                            </button>
                        )}

                        {showGithub && tab === "projects" && (
                            <div className="mb-6 max-h-48 overflow-y-auto bg-black p-4 rounded-lg border border-gray-800 custom-scrollbar fade-in">
                                {githubRepos.map(repo => (
                                    <div key={repo.id} className="flex justify-between items-center p-2 border-b border-gray-800 hover:bg-gray-900 rounded cursor-pointer transition" onClick={() => importFromGithub(repo)}>
                                        <span className="font-semibold">{repo.name}</span>
                                        <Plus size={16} className="text-blue-400" />
                                    </div>
                                ))}
                            </div>
                        )}

                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Title</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            {tab === "projects" && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Category</label>
                                        <select
                                            className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 appearance-none"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                        >
                                            <option>Completed</option>
                                            <option>Working</option>
                                            <option>Pending</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Source URL (Git)</label>
                                        <input
                                            type="text"
                                            className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                                            value={githubUrl}
                                            onChange={(e) => setGithubUrl(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm text-gray-400 mb-1">Image URL (Optional)</label>
                                        <input
                                            type="text"
                                            placeholder="/projects/example.png or https://..."
                                            className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                                            value={imageUrl}
                                            onChange={(e) => setImageUrl(e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Content (Markdown supported)</label>
                                <textarea
                                    required
                                    rows={8}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500 custom-scrollbar"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder={tab === "projects" ? "Describe your project..." : "Write your blog..."}
                                />
                            </div>

                            <button type="submit" className={`w-full font-bold py-3 mt-4 rounded-lg transition-colors ${editId ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}>
                                {editId ? "Update" : "Publish"} {tab === "blogs" ? "Blog" : "Project"}
                            </button>
                        </form>
                    </div>

                    {/* List Section */}
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 flex flex-col">
                        <h2 className="text-2xl font-bold mb-6 flex justify-between items-center">
                            <span>Manage {tab === "blogs" ? "Blogs" : "Projects"}</span>
                            <div className="flex items-center gap-3">
                                {items.length > 1 && (
                                    <button
                                        onClick={saveReorder}
                                        disabled={isSavingOrder}
                                        className="flex items-center gap-2 text-sm bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/40 px-4 py-1.5 rounded-full border border-emerald-500/20 transition disabled:opacity-50"
                                    >
                                        <Save size={14} /> {isSavingOrder ? "Saving..." : "Save Order"}
                                    </button>
                                )}
                                <span className="text-sm font-normal text-gray-500 bg-black/50 px-3 py-1 rounded-full border border-gray-800">Total: {items.length}</span>
                            </div>
                        </h2>

                        <div className="space-y-4 max-h-[750px] overflow-y-auto pr-2 custom-scrollbar flex-1 overflow-x-hidden">
                            {items.length === 0 ? (
                                <div className="text-center py-20 text-gray-600 bg-black/20 rounded-xl border border-dashed border-gray-800">
                                    No {tab} found. Create your first one!
                                </div>
                            ) : (
                                <Reorder.Group axis="y" values={items} onReorder={handleReorder} className="space-y-4">
                                    {items.map((item) => (
                                        <Reorder.Item
                                            key={item.id}
                                            value={item}
                                            className={`bg-black/40 p-4 rounded-xl border transition group flex justify-between items-center cursor-grab active:cursor-grabbing ${editId === item.id ? 'border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'border-white/5 hover:border-blue-500/30'}`}
                                        >

                                            <div className="flex items-center gap-4 flex-1 overflow-hidden pointer-events-none">
                                                <div className="flex flex-col gap-1 items-center px-1 text-gray-600 group-hover:text-gray-400 transition">
                                                    <GripVertical size={20} />
                                                </div>
                                                <div className="flex-1 truncate">
                                                    <h3 className="font-semibold text-lg truncate flex items-center gap-3">
                                                        {item.title}
                                                        {tab === "projects" && (
                                                            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${item.category === 'Completed' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                                                item.category === 'Working' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                                                    'bg-blue-500/10 text-blue-500 border-blue-500/20'
                                                                }`}>{item.category || "Completed"}</span>
                                                        )}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 truncate mr-4">{(item.content || "").substring(0, 80)}...</p>
                                                </div>
                                            </div>

                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    className="text-amber-400 opacity-80 hover:opacity-100 hover:bg-amber-400/20 transition p-2 rounded-md bg-white/5 cursor-pointer"
                                                    title="Edit"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="text-red-400 opacity-80 hover:opacity-100 hover:bg-red-500/20 transition p-2 rounded-md bg-white/5 cursor-pointer"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>

                                        </Reorder.Item>
                                    ))}
                                </Reorder.Group>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
