"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef(null);
  // Simplified variants for a quick fade in instead of long staggered chains that break visibility
  const simpleFadeIn: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <main ref={containerRef} className="min-h-screen bg-black text-white relative overflow-hidden selection:bg-blue-500/30">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-600/10 blur-[120px] rounded-full animate-blob mix-blend-screen pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full animate-blob [animation-delay:2s] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] bg-emerald-600/10 blur-[120px] rounded-full animate-blob [animation-delay:4s] mix-blend-screen pointer-events-none" />

      <div className="relative z-10 w-full">
        {/* Header/Hero Section */}
        <section className="relative min-h-[100vh] flex flex-col items-center justify-center px-6 text-center overflow-hidden">
          <motion.div
            variants={simpleFadeIn}
            initial="hidden"
            animate="visible"
            className="max-w-6xl mx-auto w-full flex flex-col items-center relative z-20 pt-20"
          >
            <div className="mb-8 inline-block">
              <span className="glass-glow px-6 py-2 rounded-full text-sm text-blue-200 flex items-center gap-3 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="font-medium tracking-wide">Available for new opportunities</span>
              </span>
            </div>

            <h1 className="sr-only">Hareram Kushwaha - Software Developer Portfolio</h1>
            <h2
              className="text-7xl md:text-9xl lg:text-[11rem] font-black mb-6 tracking-tighter leading-[0.9]"
            >
              <span className="text-white drop-shadow-2xl">
                Engineering
              </span>
              <br />
              <span className="text-gradient drop-shadow-2xl">
                Excellence.
              </span>
            </h2>

            <p
              className="text-xl md:text-2xl lg:text-3xl text-gray-400 mb-14 max-w-3xl mx-auto leading-relaxed font-light drop-shadow-md"
            >
              {siteConfig.bio}
            </p>

            <div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full sm:w-auto mt-4"
            >
              <Link
                href="/projects"
                className="group relative px-10 py-5 bg-white text-black font-bold rounded-2xl hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] w-full sm:w-auto overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent translate-x-[-150%] skew-x-[-15deg] group-hover:translate-x-[150%] transition-transform duration-700"></div>
                View My Work
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
              </Link>

              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-10 py-5 glass-glow text-white font-semibold rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-3 w-full sm:w-auto"
              >
                Get Resume
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M7 7h10v10" /><path d="M7 17L17 7" /></svg>
              </a>
            </div>
          </motion.div>


        </section>

        {/* Dynamic Interactive Features Section */}
        <section className="py-32 px-6 relative z-20">
          <div className="max-w-7xl mx-auto space-y-32">

            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col md:flex-row items-center gap-12 lg:gap-20"
            >
              <div className="flex-1 space-y-6">
                <div className="inline-flex max-w-min items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-sm font-semibold tracking-wide shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /></svg>
                  Architecture
                </div>
                <h2 className="text-4xl md:text-5xl font-bold">Scalable Systems</h2>
                <p className="text-xl text-gray-400 font-light leading-relaxed">
                  Building backend infrastructure designed to scale from day one. I architect robust data pipelines, secure APIs, and deeply optimized databases that handle massive growth effortlessly.
                </p>
              </div>
              <div className="flex-1 w-full glass-glow p-8 rounded-[2.5rem] relative group border border-blue-500/20">
                <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-32 bg-black/40 rounded-2xl border border-white/5 p-4 flex flex-col justify-end group-hover:-translate-y-2 transition-transform duration-500 shadow-xl">
                    <div className="h-2 w-12 bg-blue-400 rounded-full mb-2"></div>
                    <div className="h-2 w-24 bg-gray-600 rounded-full"></div>
                  </div>
                  <div className="h-32 bg-black/40 rounded-2xl border border-white/5 p-4 flex flex-col justify-end group-hover:-translate-y-4 transition-transform duration-500 delay-75 shadow-xl">
                    <div className="h-2 w-16 bg-purple-400 rounded-full mb-2"></div>
                    <div className="h-2 w-20 bg-gray-600 rounded-full"></div>
                  </div>
                  <div className="h-32 bg-black/40 rounded-2xl border border-white/5 p-4 flex flex-col justify-end group-hover:-translate-y-1 transition-transform duration-500 delay-150 shadow-xl">
                    <div className="h-2 w-20 bg-emerald-400 rounded-full mb-2"></div>
                    <div className="h-2 w-16 bg-gray-600 rounded-full"></div>
                  </div>
                  <div className="h-32 bg-black/40 rounded-2xl border border-white/5 p-4 flex flex-col justify-end group-hover:-translate-y-3 transition-transform duration-500 delay-200 shadow-xl">
                    <div className="h-2 w-10 bg-pink-400 rounded-full mb-2"></div>
                    <div className="h-2 w-28 bg-gray-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20"
            >
              <div className="flex-1 space-y-6">
                <div className="inline-flex max-w-min items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-sm font-semibold tracking-wide shadow-[0_0_20px_rgba(168,85,247,0.1)]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 16 4-4-4-4" /><path d="m6 8-4 4 4 4" /><path d="m14.5 4-5 16" /></svg>
                  Clean Code
                </div>
                <h2 className="text-4xl md:text-5xl font-bold">Elegant Solutions</h2>
                <p className="text-xl text-gray-400 font-light leading-relaxed">
                  I believe code should be as readable as it is functional. Drawing upon strict design patterns and modular architectures to ensure codebases remain maintainable for years to come.
                </p>
              </div>
              <div className="flex-1 w-full glass-glow p-8 rounded-[2.5rem] relative group border border-purple-500/20 flex flex-col gap-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-transparent mix-blend-overlay rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="w-full h-12 bg-black/60 rounded-xl border border-white/5 flex items-center px-4 gap-3 transform group-hover:scale-105 transition-transform duration-500 shadow-xl">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
                <div className="w-full flex-1 bg-black/40 rounded-xl border border-white/5 p-6 font-mono text-sm sm:text-base text-gray-400 leading-relaxed shadow-xl">
                  <span className="text-purple-400">const</span> <span className="text-blue-400">createImpact</span> = <span className="text-amber-400">async</span> () ={'>'} {'{\n'}
                  <div className="pl-4">
                    <span className="text-purple-400">await</span> optimize();<br />
                    <span className="text-purple-400">return</span> <span className="text-emerald-400">"Excellence"</span>;
                  </div>
                  {'}'};
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* Featured Skills Marquee */}
        <section className="py-24 border-y border-white/5 bg-black/50 backdrop-blur-3xl overflow-hidden group">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-20 items-center px-10">
                {['Next.js', 'React', 'TypeScript', 'Java', 'Python', 'Node.js', 'PostgreSQL', 'Firebase', 'AWS', 'Docker'].map((tech) => (
                  <span key={tech} className="text-6xl md:text-8xl font-black text-transparent hover:text-white transition-all duration-300 pointer-events-auto cursor-default uppercase italic group-hover:text-gray-900 group-hover:hover:text-white" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
                    {tech}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-40 px-6 text-center relative z-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="glass-glow max-w-4xl mx-auto rounded-[3rem] p-12 md:p-20 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-purple-500/10"></div>
            <h2 className="text-4xl md:text-7xl font-bold mb-8 relative z-10 leading-tight">
              Ready to build <br />
              <span className="text-gradient">the impossible?</span>
            </h2>
            <Link
              href="/about"
              className="relative z-10 inline-flex items-center gap-4 text-xl md:text-2xl text-white font-medium hover:text-blue-300 transition-colors group"
            >
              Contact Me
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
              </div>
            </Link>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
