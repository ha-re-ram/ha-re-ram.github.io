"use client";

import { useCallback } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Hash, AlertCircle, RefreshCw } from "lucide-react";
import { useAsyncDataMachine } from "@/lib/machines/asyncDataMachine";

export interface ProjectItem {
  id: string;
  title: string;
  content?: string;
  category?: string;
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  tags?: string[] | string;
  date: string;
  order?: number;
}

const categories = ["All", "Completed", "Working", "Pending"];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariant = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export default function DynamicProjectList() {
  const fetchProjects = useCallback(async (): Promise<ProjectItem[]> => {
    if (!db) return [];
    const querySnapshot = await getDocs(collection(db, "projects"));
    const data: ProjectItem[] = [];
    querySnapshot.forEach((docSnap) => {
      data.push({ id: docSnap.id, ...(docSnap.data() as any) });
    });

    data.sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) return a.order - b.order;
      const timeB = new Date(b.date || 0).getTime();
      const timeA = new Date(a.date || 0).getTime();
      return (isNaN(timeB) ? 0 : timeB) - (isNaN(timeA) ? 0 : timeA);
    });

    return data;
  }, []);

  const filterProject = useCallback(
    (project: ProjectItem, search: string, filter: string) => {
      const matchesSearch = project.title
        ?.toLowerCase()
        .includes(search.toLowerCase());
      const matchesFilter =
        filter === "All" ||
        (project.category &&
          project.category.toLowerCase() === filter.toLowerCase());
      return Boolean(matchesSearch && matchesFilter);
    },
    []
  );

  const {
    status,
    filteredItems: filteredProjects,
    searchQuery,
    activeFilter,
    error,
    isLoading,
    isError,
    setSearchQuery,
    setActiveFilter,
    resetFilters,
    retry,
  } = useAsyncDataMachine<ProjectItem>({
    fetcher: fetchProjects,
    filterFn: filterProject,
    initialFilter: "All",
  });

  if (isLoading) {
    return (
      <div data-status="loading" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="flex flex-col p-8 border border-white/40 rounded-[2.5rem] bg-white/20 backdrop-blur-xl animate-pulse h-[500px]"
          >
            <div className="w-full h-48 bg-[#1a1a1a]/5 rounded-3xl mb-8"></div>
            <div className="h-8 w-3/4 bg-[#1a1a1a]/10 rounded-full mb-4"></div>
            <div className="h-4 w-full bg-[#1a1a1a]/5 rounded-full mb-3"></div>
            <div className="h-4 w-4/6 bg-[#1a1a1a]/5 rounded-full mb-8"></div>
            <div className="mt-auto flex justify-between pt-6 border-t border-[#1a1a1a]/5">
              <div className="h-6 w-16 bg-[#1a1a1a]/10 rounded-full"></div>
              <div className="flex gap-4">
                <div className="h-6 w-16 bg-[#1a1a1a]/10 rounded-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div
        data-status="error"
        className="text-center py-24 bg-white/20 backdrop-blur-xl border border-rose-500/30 rounded-[3rem] p-8"
      >
        <AlertCircle className="w-12 h-12 text-rose-500/60 mx-auto mb-4" />
        <h3 className="font-syne font-bold uppercase tracking-tight text-xl text-[#1a1a1a] mb-2">
          Unable to Load Projects
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
    <div data-status={status} className="space-y-12">
      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center bg-white/30 backdrop-blur-xl border border-white/40 p-6 rounded-[2.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
        <div className="relative w-full md:max-w-md group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1a1a1a]/30 group-focus-within:text-[#1a1a1a] transition-colors" />
          <input
            type="text"
            placeholder="Search projects by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-white/40 border border-white/60 rounded-full outline-none focus:bg-white/60 focus:border-[#1a1a1a]/20 font-syne font-medium text-sm transition-all"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full justify-center md:justify-start" role="tablist" aria-label="Project category filters">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeFilter === cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-3 rounded-full font-syne font-bold uppercase tracking-widest text-[10px] transition-all cursor-pointer ${
                activeFilter === cat
                  ? "bg-[#1a1a1a] text-[#E5D5D0] shadow-lg"
                  : "bg-white/40 text-[#1a1a1a]/40 hover:bg-white/60 hover:text-[#1a1a1a]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {filteredProjects.length > 0 ? (
          <motion.div
            key="grid"
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12"
          >
            {filteredProjects.map((repo) => (
              <motion.div
                key={repo.id}
                layout
                variants={itemVariant}
                className="group flex flex-col p-8 border border-white/40 rounded-[2.5rem] bg-white/30 backdrop-blur-xl hover:bg-white/50 transition-all duration-700 ease-out hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] overflow-hidden"
              >
                <div className="flex justify-between items-start mb-8 relative">
                  {repo.imageUrl ? (
                    <div className="w-full h-48 overflow-hidden rounded-3xl border border-white/20 shadow-sm">
                      <img
                        src={repo.imageUrl}
                        alt={repo.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-48 bg-[#1a1a1a]/5 rounded-3xl flex items-center justify-center border border-white/20 shadow-sm">
                      <span className="font-syne font-black text-4xl text-[#1a1a1a]/10 uppercase tracking-tighter">
                        {repo.title.substring(0, 2)}
                      </span>
                    </div>
                  )}

                  {repo.category && (
                    <div className="absolute top-4 right-4 bg-[#1a1a1a] text-[#E5D5D0] text-[8px] font-syne font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full shadow-lg">
                      {repo.category}
                    </div>
                  )}
                </div>

                <div className="mb-6 flex-grow">
                  <Link href={`/article?id=${repo.id}&type=projects`}>
                    <h2 className="text-3xl font-syne font-bold text-[#1a1a1a] mb-4 group-hover:opacity-60 transition-opacity tracking-tight uppercase break-words">
                      {repo.title}
                    </h2>
                  </Link>
                  <p className="text-[#4a4a4a] text-lg font-light leading-relaxed mb-6 line-clamp-3">
                    {(repo.content || "").substring(0, 160)}...
                  </p>

                  {/* Tech Tags */}
                  {repo.tags && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(Array.isArray(repo.tags)
                        ? repo.tags
                        : repo.tags.split(",")
                      ).map((tag: string, idx: number) => (
                        <span
                          key={idx}
                          className="flex items-center gap-1 text-[9px] font-syne font-bold uppercase tracking-widest text-[#1a1a1a]/40 bg-[#1a1a1a]/5 px-3 py-1 rounded-full"
                        >
                          <Hash className="w-2 h-2" />
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-auto pt-6 border-t border-[#1a1a1a]/10 flex items-center justify-between">
                  <span className="text-xs font-syne font-bold text-[#1a1a1a]/30 uppercase tracking-widest">
                    {new Date(repo.date).getFullYear()}
                  </span>
                  <div className="flex gap-3">
                    <Link
                      href={`/article?id=${repo.id}&type=projects`}
                      className="px-6 py-2 rounded-full bg-[#1a1a1a] text-[#E5D5D0] font-syne text-[10px] uppercase tracking-widest font-black hover:bg-[#1a1a1a]/80 hover:shadow-lg transition-all"
                    >
                      Details
                    </Link>

                    {repo.githubUrl && (
                      <Link
                        href={repo.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full border border-[#1a1a1a]/10 flex items-center justify-center text-[#1a1a1a]/40 hover:text-[#1a1a1a] hover:bg-white/50 transition-all group/btn"
                        aria-label="View source on GitHub"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="group-hover/btn:scale-110 transition-transform"
                        >
                          <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0 -.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2V21" />
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32 border border-[#1a1a1a]/10 rounded-[2.5rem] bg-white/20 backdrop-blur-xl"
          >
            <Search className="w-12 h-12 text-[#1a1a1a]/10 mx-auto mb-6" />
            <p className="text-[#1a1a1a]/60 text-xl font-cormorant italic">
              No projects found matching your search.
            </p>
            <button
              onClick={resetFilters}
              className="mt-6 text-sm font-syne font-bold uppercase tracking-widest text-[#1a1a1a] underline underline-offset-8 cursor-pointer"
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
