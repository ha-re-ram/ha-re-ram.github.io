"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-20 px-6 border-t border-[#1a1a1a]/5 bg-[#E5D5D0]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 mb-16">
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="font-syne font-black text-3xl uppercase tracking-tighter">Hareram.</span>
            </Link>
            <p className="font-cormorant italic text-lg md:text-xl text-[#1a1a1a]/60 max-w-sm leading-relaxed">
              Crafting digital experiences where logic meets art. Building the future, one line of code at a time.
            </p>
          </div>

          <div className="col-span-1">
            <h4 className="font-syne font-bold uppercase tracking-widest text-[10px] text-[#1a1a1a]/40 mb-6">Navigation</h4>
            <ul className="space-y-4 font-syne font-bold uppercase tracking-widest text-[10px]">
              <li><Link href="/about" className="hover:opacity-60 transition-opacity">About</Link></li>
              <li><Link href="/projects" className="hover:opacity-60 transition-opacity">Projects</Link></li>
              <li><Link href="/blog" className="hover:opacity-60 transition-opacity">Blog</Link></li>
              <li><Link href="/contact" className="hover:opacity-60 transition-opacity">Contact</Link></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-syne font-bold uppercase tracking-widest text-[10px] text-[#1a1a1a]/40 mb-6">Social</h4>
            <ul className="space-y-4 font-syne font-bold uppercase tracking-widest text-[10px]">
              <li><a href={`https://github.com/${siteConfig.social.github}`} target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">GitHub</a></li>
              <li><a href={`https://linkedin.com/in/${siteConfig.social.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">LinkedIn</a></li>
              <li><a href={`https://twitter.com/${siteConfig.social.twitter}`} target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">Twitter</a></li>
              <li><a href={`https://leetcode.com/${siteConfig.social.leetcode}`} target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">LeetCode</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#1a1a1a]/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-syne text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/40">
            © 2025 Hareram Kushwaha. All Rights Reserved.
          </p>
          <div className="flex gap-8 items-center">
            <span className="font-cormorant italic text-sm text-[#1a1a1a]/40 italic">
              Designed & Built with <span className="not-italic">♥</span>
            </span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-10 h-10 rounded-full border border-[#1a1a1a]/10 flex items-center justify-center hover:bg-[#1a1a1a] hover:text-[#E5D5D0] transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
