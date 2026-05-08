"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Edit2, Trash2, Github, Plus, GripVertical, Save, Award } from "lucide-react";
import { Reorder } from "framer-motion";

export default function AdminDashboard() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Form states
    const [tab, setTab] = useState("blogs"); // 'blogs' | 'projects' | 'certifications'
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("Completed");
    const [githubUrl, setGithubUrl] = useState("");
    const [liveUrl, setLiveUrl] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    
    // Cert specific
    const [issuer, setIssuer] = useState("");
    const [date, setDate] = useState("");
    
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
                return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime();
            });
            setItems(data);
        } catch (error: any) {
            console.error("Error fetching data:", error);
            alert("Database Error: " + error.message);
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
        setIssuer("");
        setDate("");
        setEditId(null);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!db) return alert("Database not initialized");

        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

        let dataPayload: any = {
            title,
            slug,
        };

        if (tab === "blogs") {
            dataPayload.content = content;
        } else if (tab === "projects") {
            dataPayload.content = content;
            dataPayload.category = category;
            dataPayload.githubUrl = githubUrl;
            dataPayload.liveUrl = liveUrl;
            dataPayload.imageUrl = imageUrl;
        } else if (tab === "certifications") {
            dataPayload.name = title; // Reuse title as name
            dataPayload.issuer = issuer;
            dataPayload.date = date;
        }

        try {
            if (editId) {
                await updateDoc(doc(db, tab, editId), dataPayload);
                alert(`${tab.slice(0, -1)} updated!`);
            } else {
                dataPayload.createdAt = new Date().toISOString();
                dataPayload.order = items.length;
                await addDoc(collection(db, tab), dataPayload);
                alert(`${tab.slice(0, -1)} added!`);
            }
            resetForm();
            fetchItems(tab);
        } catch (error: any) {
            alert("Error saving document: " + error.message);
        }
    };

    const handleEdit = (item: any) => {
        setEditId(item.id);
        setTitle(item.title || item.name || "");
        setContent(item.content || "");
        if (tab === "projects") {
            setCategory(item.category || "Completed");
            setGithubUrl(item.githubUrl || "");
            setLiveUrl(item.liveUrl || "");
            setImageUrl(item.imageUrl || "");
        } else if (tab === "certifications") {
            setIssuer(item.issuer || "");
            setDate(item.date || "");
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
        setItems(newOrder);
    };

    const saveReorder = async () => {
        if (!db) return;
        setIsSavingOrder(true);
        try {
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

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#E5D5D0] text-[#1a1a1a] font-syne font-bold uppercase tracking-widest text-sm animate-pulse">Loading...</div>;
    if (!user) return null;

    return (
        <main className="min-h-screen pt-32 p-8 relative z-20 text-[#1a1a1a]">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-syne font-black uppercase tracking-tighter text-[#1a1a1a]">
                        Admin <span className="font-cormorant italic font-light lowercase">CMS</span>
                    </h1>
                    <button onClick={handleLogout} className="bg-[#1a1a1a]/5 hover:bg-[#1a1a1a]/10 text-[#1a1a1a] px-6 py-2 rounded-full border border-[#1a1a1a]/10 font-syne font-bold uppercase tracking-widest text-xs transition-colors">
                        Logout
                    </button>
                </div>

                <div className="flex flex-wrap gap-4 mb-12 border-b border-[#1a1a1a]/10 pb-4">
                    {["blogs", "projects", "certifications"].map((t) => (
                        <button
                            key={t}
                            onClick={() => handleTabChange(t)}
                            className={`px-4 py-2 font-syne font-bold uppercase tracking-widest text-sm transition-colors relative capitalize ${tab === t ? "text-[#1a1a1a]" : "text-[#1a1a1a]/40 hover:text-[#1a1a1a]/80"}`}
                        >
                            {t === "blogs" ? "📝 Blogs" : t === "projects" ? "🚀 Projects" : "🏆 Certs"}
                            {tab === t && <span className="absolute bottom-[-16px] left-0 right-0 h-0.5 bg-[#1a1a1a]"></span>}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Form Section */}
                    <div className="bg-white/30 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/40 flex flex-col h-fit shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-syne font-bold tracking-tight text-[#1a1a1a]">{editId ? "Edit" : "Add New"} {tab.slice(0, -1)}</h2>
                            {editId && (
                                <button onClick={resetForm} className="text-[10px] font-syne font-bold uppercase tracking-widest text-[#1a1a1a]/60 hover:text-[#1a1a1a] px-4 py-2 bg-white/50 rounded-full border border-[#1a1a1a]/10">
                                    Cancel Edit
                                </button>
                            )}
                        </div>

                        {tab === "projects" && (
                            <button
                                onClick={fetchGithubRepos}
                                className="mb-8 w-full flex items-center justify-center gap-3 bg-[#1a1a1a]/5 hover:bg-[#1a1a1a]/10 text-[#1a1a1a] font-syne font-bold uppercase tracking-widest text-xs py-4 rounded-2xl border border-[#1a1a1a]/10 transition-colors"
                            >
                                <Github size={18} /> Fetch / Import from GitHub
                            </button>
                        )}

                        <form onSubmit={handleSave} className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-syne font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/60 mb-2">{tab === "certifications" ? "Certificate Name" : "Title"}</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-white/50 backdrop-blur-md border border-[#1a1a1a]/10 rounded-2xl p-4 text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]/30 transition-colors font-medium"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            {tab === "certifications" && (
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-syne font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/60 mb-2">Issuer</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full bg-white/50 backdrop-blur-md border border-[#1a1a1a]/10 rounded-2xl p-4 text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]/30 transition-colors font-medium"
                                            value={issuer}
                                            onChange={(e) => setIssuer(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-syne font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/60 mb-2">Year/Date</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. 2024"
                                            className="w-full bg-white/50 backdrop-blur-md border border-[#1a1a1a]/10 rounded-2xl p-4 text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]/30 transition-colors font-medium"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}

                            {tab === "projects" && (
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-syne font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/60 mb-2">Category</label>
                                        <select
                                            className="w-full bg-white/50 backdrop-blur-md border border-[#1a1a1a]/10 rounded-2xl p-4 text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]/30 transition-colors font-medium appearance-none"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                        >
                                            <option>Completed</option>
                                            <option>Working</option>
                                            <option>Pending</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-syne font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/60 mb-2">Source URL</label>
                                        <input
                                            type="text"
                                            className="w-full bg-white/50 backdrop-blur-md border border-[#1a1a1a]/10 rounded-2xl p-4 text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]/30 transition-colors font-medium"
                                            value={githubUrl}
                                            onChange={(e) => setGithubUrl(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-[10px] font-syne font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/60 mb-2">Image URL</label>
                                        <input
                                            type="text"
                                            placeholder="/projects/example.png or https://..."
                                            className="w-full bg-white/50 backdrop-blur-md border border-[#1a1a1a]/10 rounded-2xl p-4 text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]/30 transition-colors font-medium"
                                            value={imageUrl}
                                            onChange={(e) => setImageUrl(e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}

                            {tab !== "certifications" && (
                                <div>
                                    <label className="block text-[10px] font-syne font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/60 mb-2">Content (Markdown)</label>
                                    <textarea
                                        required
                                        rows={8}
                                        className="w-full bg-white/50 backdrop-blur-md border border-[#1a1a1a]/10 rounded-2xl p-4 text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]/30 transition-colors font-medium custom-scrollbar"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        placeholder={tab === "projects" ? "## The Problem\n\n## The Architecture\n\n## The Impact & Results" : "Write your blog..."}
                                    />
                                </div>
                            )}

                            <button type="submit" className="w-full font-syne font-bold uppercase tracking-widest text-sm py-4 mt-6 rounded-full bg-[#1a1a1a] text-[#E5D5D0] transition-shadow hover:shadow-xl">
                                {editId ? "Update" : "Publish"} {tab.slice(0, -1)}
                            </button>
                        </form>
                    </div>

                    {/* List Section */}
                    <div className="bg-white/30 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/40 flex flex-col shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
                        <h2 className="text-2xl font-syne font-bold tracking-tight mb-8 flex justify-between items-center text-[#1a1a1a]">
                            <span>Manage {tab}</span>
                            <div className="flex items-center gap-4">
                                {items.length > 1 && (
                                    <button
                                        onClick={saveReorder}
                                        disabled={isSavingOrder}
                                        className="flex items-center gap-2 text-[10px] font-syne font-bold uppercase tracking-widest bg-[#1a1a1a] text-[#E5D5D0] hover:bg-[#1a1a1a]/80 px-6 py-3 rounded-full transition-colors disabled:opacity-50"
                                    >
                                        <Save size={14} /> {isSavingOrder ? "Saving..." : "Save Order"}
                                    </button>
                                )}
                                <span className="text-[10px] font-syne font-bold uppercase tracking-widest text-[#1a1a1a] bg-white px-4 py-2 rounded-full border border-white/40 shadow-sm">{items.length} Items</span>
                            </div>
                        </h2>

                        <div className="space-y-4 max-h-[750px] overflow-y-auto pr-2 custom-scrollbar flex-1 overflow-x-hidden">
                            {items.length === 0 ? (
                                <div className="text-center py-20 text-[#1a1a1a]/40 bg-white/20 rounded-3xl border border-dashed border-[#1a1a1a]/20 font-cormorant italic text-lg">
                                    No {tab} found. Create your first one.
                                </div>
                            ) : (
                                <Reorder.Group axis="y" values={items} onReorder={handleReorder} className="space-y-4">
                                    {items.map((item) => (
                                        <Reorder.Item
                                            key={item.id}
                                            value={item}
                                            className={`bg-white/50 p-5 rounded-2xl border transition-all group flex justify-between items-center cursor-grab active:cursor-grabbing ${editId === item.id ? 'border-[#1a1a1a] shadow-[0_5px_15px_rgba(0,0,0,0.05)]' : 'border-[#1a1a1a]/5 hover:border-[#1a1a1a]/20 hover:bg-white/80'}`}
                                        >
                                            <div className="flex items-center gap-4 flex-1 overflow-hidden pointer-events-none">
                                                <div className="flex flex-col gap-1 items-center px-2 text-[#1a1a1a]/20 group-hover:text-[#1a1a1a]/40 transition-colors">
                                                    <GripVertical size={20} />
                                                </div>
                                                <div className="flex-1 truncate">
                                                    <h3 className="font-syne font-bold tracking-tight text-lg text-[#1a1a1a] truncate flex items-center gap-3">
                                                        {item.title || item.name}
                                                        {tab === "projects" && (
                                                            <span className="text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-full border bg-[#1a1a1a]/5 text-[#1a1a1a] border-[#1a1a1a]/10">{item.category || "Completed"}</span>
                                                        )}
                                                        {tab === "certifications" && (
                                                            <span className="text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-full border bg-[#1a1a1a]/5 text-[#1a1a1a] border-[#1a1a1a]/10">{item.date}</span>
                                                        )}
                                                    </h3>
                                                    <p className="text-sm text-[#4a4a4a] font-light truncate mr-4 mt-1">
                                                        {tab === "certifications" ? item.issuer : (item.content || "").substring(0, 80) + "..."}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    className="text-[#1a1a1a] opacity-40 hover:opacity-100 hover:bg-[#1a1a1a]/10 transition-colors p-3 rounded-xl bg-white/50 cursor-pointer"
                                                    title="Edit"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="text-red-500 opacity-60 hover:opacity-100 hover:bg-red-50 transition-colors p-3 rounded-xl bg-white/50 cursor-pointer"
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
