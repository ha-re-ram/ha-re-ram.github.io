"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DynamicProjectList() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            if (!db) {
                setLoading(false);
                return;
            }
            try {
                const querySnapshot = await getDocs(collection(db, "projects"));
                const data: any[] = [];
                querySnapshot.forEach((doc) => {
                    data.push({ id: doc.id, ...doc.data() });
                });

                // Sort by order first, then date
                data.sort((a, b) => {
                    if (a.order !== undefined && b.order !== undefined) return a.order - b.order;
                    return new Date(b.date).getTime() - new Date(a.date).getTime();
                });

                setProjects(data);
            } catch (error) {
                console.error("Error fetching dynamic projects", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariant = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    if (loading) return <div className="text-center py-20 border border-gray-800 rounded-3xl bg-gray-900/20 text-gray-500">Loading Portfolio...</div>;

    if (projects.length === 0) return (
        <div className="text-center py-20 border border-gray-800 rounded-3xl bg-gray-900/20">
            <p className="text-gray-500 text-lg">No repositories found. Add some from the Admin Dashboard!</p>
        </div>
    );

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
            {projects.map((repo) => (
                <motion.div
                    key={repo.id}
                    variants={itemVariant}
                    className="group flex flex-col p-8 border border-gray-800 rounded-3xl bg-gray-900/20 backdrop-blur-sm hover:bg-gray-900/40 hover:border-blue-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/5"
                >
                    <div className="flex justify-between items-start mb-6">
                        {repo.imageUrl ? (
                            <img src={repo.imageUrl} alt={repo.title} className="w-full h-40 object-cover rounded-2xl border border-gray-800/50 mb-2" />
                        ) : (
                            <div className="p-3 bg-gray-800/50 rounded-2xl group-hover:bg-blue-500/20 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-blue-400 transition-colors"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <Link href={`/article?id=${repo.id}&type=projects`}>
                            <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                                {repo.title}
                            </h2>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-4 min-h-[5rem]">
                            {(repo.content || "").substring(0, 160)}...
                        </p>
                    </div>

                    <div className="mt-auto space-y-6">
                        {repo.category && (
                            <div className={`inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-full border ${repo.category.toLowerCase() === 'completed' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                repo.category.toLowerCase() === 'working' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                    'bg-blue-500/10 text-blue-500 border-blue-500/20'
                                }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${repo.category.toLowerCase() === 'completed' ? 'bg-emerald-500' :
                                    repo.category.toLowerCase() === 'working' ? 'bg-amber-500' : 'bg-blue-500'
                                    }`}></span>
                                {repo.category}
                            </div>
                        )}

                        <div className="flex items-center justify-between pt-6 border-t border-gray-800/50">
                            <span className="text-xs text-gray-500">
                                {new Date(repo.date).getFullYear()}
                            </span>
                            <div className="flex gap-4">
                                <Link
                                    href={`/article?id=${repo.id}&type=projects`}
                                    className="text-white hover:text-blue-400 font-medium text-sm flex items-center gap-2 transition-colors"
                                >
                                    Details
                                </Link>

                                {repo.githubUrl && (
                                    <Link
                                        href={repo.githubUrl}
                                        target="_blank"
                                        className="text-white hover:text-blue-400 font-medium text-sm flex items-center gap-2 transition-colors"
                                    >
                                        Source
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-45 transition-transform"><path d="M7 17L17 7" /><path d="M7 7h10v10" /></svg>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
}
