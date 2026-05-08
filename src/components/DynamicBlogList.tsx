"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock, ArrowRight } from "lucide-react";

export default function DynamicBlogList() {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [filteredBlogs, setFilteredBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchBlogs = async () => {
            if (!db) {
                setLoading(false);
                return;
            }
            try {
                const querySnapshot = await getDocs(collection(db, "blogs"));
                const data: any[] = [];
                querySnapshot.forEach((doc) => {
                    const content = doc.data().content || "";
                    const wordCount = content.trim().split(/\s+/).length;
                    const readingTime = Math.max(1, Math.ceil(wordCount / 200));
                    
                    data.push({ 
                        id: doc.id, 
                        ...doc.data(),
                        readingTime
                    });
                });
                data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setBlogs(data);
                setFilteredBlogs(data);
            } catch (error) {
                console.error("Error fetching dynamic blogs", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    useEffect(() => {
        const filtered = blogs.filter((blog) => 
            blog.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredBlogs(filtered);
    }, [searchQuery, blogs]);

    if (loading) return (
        <div className="space-y-6 mt-12">
            {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/20 backdrop-blur-xl border border-white/40 p-8 rounded-[2.5rem] animate-pulse h-[160px]">
                    <div className="h-8 w-3/4 bg-[#1a1a1a]/10 rounded-full mb-6"></div>
                    <div className="h-4 w-full bg-[#1a1a1a]/5 rounded-full mb-3"></div>
                    <div className="h-4 w-2/3 bg-[#1a1a1a]/5 rounded-full"></div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="space-y-12 mt-12">
            {/* Search Bar */}
            <div className="relative group max-w-2xl">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1a1a1a]/30 group-focus-within:text-[#1a1a1a] transition-colors" />
                <input
                    type="text"
                    placeholder="Search articles by title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-16 pr-8 py-5 bg-white/30 backdrop-blur-xl border border-white/40 rounded-full outline-none focus:bg-white/50 focus:border-[#1a1a1a]/20 font-syne font-medium text-lg transition-all shadow-[0_10px_30px_rgba(0,0,0,0.02)]"
                />
            </div>

            <div className="space-y-8">
                <AnimatePresence mode="popLayout">
                    {filteredBlogs.length > 0 ? (
                        filteredBlogs.map((post, i) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: i * 0.05 }}
                                key={post.id}
                                className="group relative bg-white/30 backdrop-blur-xl border border-white/40 p-10 rounded-[3rem] hover:bg-white/50 transition-all duration-700 ease-out shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.05)]"
                            >
                                <Link href={`/article?id=${post.id}`} className="block">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                                        <div className="flex items-center gap-4">
                                            <span className="text-xs font-syne font-black uppercase tracking-[0.3em] text-[#1a1a1a]/30 px-4 py-2 border border-[#1a1a1a]/5 rounded-full">
                                                {new Date(post.date).getFullYear()}
                                            </span>
                                            <div className="flex items-center gap-2 text-[#1a1a1a]/40 font-syne font-bold uppercase tracking-widest text-[10px]">
                                                <Clock className="w-3 h-3" />
                                                {post.readingTime} min read
                                            </div>
                                        </div>
                                        <span className="text-[#1a1a1a]/40 font-mono text-xs hidden md:block">
                                            {new Date(post.date).toLocaleDateString(undefined, {
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>

                                    <h3 className="text-4xl md:text-5xl font-syne font-bold uppercase tracking-tighter mb-6 group-hover:opacity-60 transition-opacity text-[#1a1a1a] leading-tight">
                                        {post.title}
                                    </h3>

                                    <p className="text-[#4a4a4a] text-xl font-cormorant italic font-light leading-relaxed mb-10 line-clamp-2 max-w-3xl">
                                        {(post.content || "").substring(0, 120)}...
                                    </p>

                                    <div className="flex items-center gap-3 text-[#1a1a1a] font-syne font-bold uppercase tracking-widest text-xs group-hover:gap-5 transition-all">
                                        Read Article
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </Link>
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-24 bg-white/20 backdrop-blur-xl border border-white/40 rounded-[3rem]"
                        >
                            <p className="text-[#1a1a1a]/40 font-cormorant italic text-2xl">No articles found matching your query.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
