"use client";

import { useCallback } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock, ArrowRight, AlertCircle, RefreshCw } from "lucide-react";
import { useAsyncDataMachine } from "@/lib/machines/asyncDataMachine";

export interface BlogPost {
  id: string;
  title: string;
  content?: string;
  date: string;
  readingTime: number;
}

export default function DynamicBlogList() {
  const fetchBlogs = useCallback(async (): Promise<BlogPost[]> => {
    if (!db) return [];
    const querySnapshot = await getDocs(collection(db, "blogs"));
    const data: BlogPost[] = [];
    querySnapshot.forEach((docSnap) => {
      const docData = docSnap.data();
      const content = docData.content || "";
      const wordCount = content.trim().split(/\s+/).length;
      const readingTime = Math.max(1, Math.ceil(wordCount / 200));

      data.push({
        id: docSnap.id,
        title: docData.title || "Untitled",
        content,
        date: docData.date || new Date().toISOString(),
        readingTime,
      });
    });
    data.sort((a, b) => {
      const timeB = new Date(b.date).getTime();
      const timeA = new Date(a.date).getTime();
      return (isNaN(timeB) ? 0 : timeB) - (isNaN(timeA) ? 0 : timeA);
    });
    return data;
  }, []);

  const filterBlog = useCallback((blog: BlogPost, query: string) => {
    return blog.title.toLowerCase().includes(query.toLowerCase());
  }, []);

  const {
    status,
    filteredItems: blogs,
    searchQuery,
    error,
    isLoading,
    isError,
    setSearchQuery,
    retry,
  } = useAsyncDataMachine<BlogPost>({
    fetcher: fetchBlogs,
    filterFn: filterBlog,
  });

  if (isLoading) {
    return (
      <div data-status="loading" className="space-y-6 mt-12">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white/20 backdrop-blur-xl border border-white/40 p-8 rounded-[2.5rem] animate-pulse h-[160px]"
          >
            <div className="h-8 w-3/4 bg-[#1a1a1a]/10 rounded-full mb-6"></div>
            <div className="h-4 w-full bg-[#1a1a1a]/5 rounded-full mb-3"></div>
            <div className="h-4 w-2/3 bg-[#1a1a1a]/5 rounded-full"></div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div
        data-status="error"
        className="text-center py-24 bg-white/20 backdrop-blur-xl border border-rose-500/30 rounded-[3rem] mt-12 p-8"
      >
        <AlertCircle className="w-12 h-12 text-rose-500/60 mx-auto mb-4" />
        <h3 className="font-syne font-bold uppercase tracking-tight text-xl text-[#1a1a1a] mb-2">
          Unable to Load Articles
        </h3>
        <p className="text-[#1a1a1a]/60 font-cormorant italic text-lg mb-6">{error}</p>
        <button
          onClick={retry}
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#1a1a1a] text-[#E5D5D0] rounded-full font-syne font-bold uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-transform"
        >
          <RefreshCw className="w-4 h-4" /> Try Again
        </button>
      </div>
    );
  }

  return (
    <div data-status={status} className="space-y-12 mt-12">
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
          {blogs.length > 0 ? (
            blogs.map((post, i) => (
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
                        month: "short",
                        day: "numeric",
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
              <p className="text-[#1a1a1a]/40 font-cormorant italic text-2xl">
                {searchQuery
                  ? "No articles found matching your search query."
                  : "No articles published yet."}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-6 text-sm font-syne font-bold uppercase tracking-widest text-[#1a1a1a] underline underline-offset-8"
                >
                  Clear Search
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
