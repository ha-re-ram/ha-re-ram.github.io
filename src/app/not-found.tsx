"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#E5D5D0] flex items-center justify-center px-6 selection:bg-[#1a1a1a] selection:text-[#E5D5D0]">
      <div className="max-w-3xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-syne font-black text-[10rem] md:text-[15rem] uppercase tracking-tighter text-[#1a1a1a]/5 leading-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
            404
          </span>
          
          <h1 className="font-syne font-black text-6xl md:text-8xl uppercase tracking-tighter text-[#1a1a1a] mb-6 relative z-10">
            Lost in <br />
            <span className="font-cormorant italic font-light lowercase">space?</span>
          </h1>
          
          <p className="font-cormorant italic text-xl md:text-2xl text-[#1a1a1a]/60 mb-12 max-w-lg mx-auto leading-relaxed">
            The page you are looking for has either drifted into another dimension or never existed in the first place.
          </p>

          <Link
            href="/"
            className="group relative inline-flex items-center gap-4 px-10 py-5 bg-[#1a1a1a] text-[#E5D5D0] font-syne font-bold uppercase tracking-widest rounded-full overflow-hidden transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
          >
            <div className="absolute inset-0 bg-white/10 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-500 ease-in-out"></div>
            <span className="relative z-10 flex items-center gap-3">
              Back to Home
              <span className="group-hover:-translate-x-1 transition-transform inline-block">←</span>
            </span>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
