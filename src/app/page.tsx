"use client";

import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { motion, Variants, AnimatePresence } from "framer-motion";
import {
  Code2,
  Database,
  Server,
  Terminal,
  GitBranch,
  Layers,
  Cpu,
  Globe,
  Coffee,
  Workflow
} from "lucide-react";

import HeroVideo from "@/components/HeroVideo";
import { TypewriterBadge } from "@/components/TypewriterBadge";

const credentialWords = [
  "Open to Opportunities",
  "Final Year CS @ KPRIET (VII Sem)",
  "Full Stack Developer",
  "Software Developer",
  "Problem Solver",
  "Nepal → Building Things"
];

export default function Home() {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const row1Skills = [
    { name: "Java", icon: <Coffee className="w-4 h-4 text-amber-800/80" /> },
    { name: "JavaScript", icon: <Code2 className="w-4 h-4 text-amber-600" /> },
    { name: "React", icon: <Layers className="w-4 h-4 text-cyan-700" /> },
    { name: "Python", icon: <Terminal className="w-4 h-4 text-emerald-700" /> },
    { name: "Node.js", icon: <Server className="w-4 h-4 text-green-700" /> },
    { name: "PHP", icon: <Globe className="w-4 h-4 text-blue-700" /> },
  ];

  const row2Skills = [
    { name: "MongoDB", icon: <Database className="w-4 h-4 text-emerald-700" /> },
    { name: "MySQL", icon: <Database className="w-4 h-4 text-sky-700" /> },
    { name: "Git", icon: <GitBranch className="w-4 h-4 text-orange-700" /> },
    { name: "Algorithms & DS", icon: <Cpu className="w-4 h-4 text-purple-700" /> },
    { name: "System Design", icon: <Workflow className="w-4 h-4 text-stone-700" /> },
  ];

  return (
    <main className="min-h-screen text-[#1a1a1a] relative overflow-hidden selection:bg-[#1a1a1a] selection:text-[#E5D5D0]">
      {/* Lightweight GPU-friendly ambient glow orbs without costly Gaussian blurs or mix-blend layers */}
      <div
        className="absolute top-[-10%] left-[-10%] w-[520px] h-[520px] rounded-full pointer-events-none opacity-40 -z-10"
        style={{
          background: "radial-gradient(circle, #f8e1da 0%, transparent 70%)",
          transform: "translate3d(0,0,0)",
        }}
      />
      <div
        className="absolute top-[25%] right-[-5%] w-[480px] h-[480px] rounded-full pointer-events-none opacity-40 -z-10"
        style={{
          background: "radial-gradient(circle, #d9e4eb 0%, transparent 70%)",
          transform: "translate3d(0,0,0)",
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-[auto] lg:min-h-screen flex items-center justify-center px-4 md:px-6 pt-20 lg:pt-32 pb-12 overflow-hidden z-20">
        <div className="max-w-7xl mx-auto w-full relative min-h-[auto] lg:min-h-[75vh] flex flex-col lg:flex-row items-center gap-8 lg:gap-0">

          {/* Hero Video - Prominent on mobile, Absolute on desktop */}
          <div className="relative lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 w-full lg:w-[45%] h-[30vh] md:h-[50vh] lg:h-[70vh] z-0 opacity-100 flex items-center justify-center lg:justify-end pointer-events-none lg:pointer-events-auto mb-4 lg:mb-0">
            <HeroVideo />
          </div>

          {/* Foreground Text Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="w-full lg:w-[80%] relative z-10 flex flex-col items-start text-left"
          >
            {/* Targeted Change 1: Added premium glassmorphic credentials badges below the name badge */}
            <motion.div variants={fadeUp} className="mb-6 md:mb-10 flex flex-col gap-4 w-full">
              <div className="flex flex-wrap items-center gap-3">
                {/* Main Name Badge */}
                <span className="px-6 py-3 rounded-full border border-[#1a1a1a]/10 text-xs tracking-[0.3em] uppercase font-syne font-black bg-white/70 backdrop-blur-md text-[#1a1a1a] shadow-[0_10px_30px_rgba(0,0,0,0.03)]">
                  Hareram Kushwaha
                </span>
              </div>
              
              <div className="flex flex-wrap items-center gap-2.5 md:gap-3 w-full">
                {/* Single Premium Dynamic Typewriter Badge */}
                <TypewriterBadge words={credentialWords} />
              </div>
            </motion.div>

            <motion.h1 variants={fadeUp} className="flex flex-col mb-4 md:mb-10 relative">
              <span className="font-cormorant italic font-light text-[clamp(2.2rem,9vw,7.5rem)] tracking-tight text-[#1a1a1a] leading-[0.9]">
                Engineering <span className="font-syne not-italic font-black text-[clamp(2.2rem,9vw,7.5rem)] uppercase tracking-tighter">the</span>
              </span>
              <span className="font-syne font-black text-[clamp(2.5rem,11vw,8rem)] tracking-tighter uppercase text-[#1a1a1a] leading-[0.8] ml-[-1px] md:ml-[-4px]">
                Future.
              </span>
            </motion.h1>

            {/* Targeted Change 2: Replaced the corporate quote with an honest, genuine developer personal philosophy */}
            <motion.p variants={fadeUp} className="text-xl md:text-3xl text-[#1a1a1a] mb-8 md:mb-14 max-w-xl font-light leading-relaxed font-cormorant italic border-l-2 border-[#1a1a1a]/30 pl-6">
              "A student of computer science who believes software engineering isn't just about writing code that works, but about designing systems that are robust, readable, and genuinely delightful to experience."
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-row flex-wrap items-center justify-start gap-3 md:gap-4 w-full">
              <Link
                href="/projects"
                className="group relative px-6 md:px-10 py-3.5 md:py-5 bg-[#1a1a1a] text-[#E5D5D0] font-syne font-bold uppercase tracking-widest rounded-full hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-all flex items-center justify-center gap-3 md:gap-4 text-[10px] md:text-xs overflow-hidden flex-none"
              >
                <div className="absolute inset-0 bg-white/10 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-500 ease-in-out"></div>
                <span className="relative z-10 flex items-center gap-2 md:gap-3">
                  Explore
                  <span className="group-hover:translate-x-2 transition-transform inline-block">→</span>
                </span>
              </Link>

              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-6 md:px-10 py-3.5 md:py-5 bg-[#E5D5D0]/80 backdrop-blur-md border border-[#1a1a1a]/20 text-[#1a1a1a] font-syne font-bold uppercase tracking-widest rounded-full hover:bg-white/50 hover:shadow-lg transition-all flex items-center justify-center gap-2 md:gap-3 text-[10px] md:text-xs flex-none"
              >
                Resume
                <span className="group-hover:translate-x-1 transition-transform inline-block">↗</span>
              </a>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* Philosophy / Features Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 relative z-20 bg-white/30 backdrop-blur-md border-y border-white/40 text-left">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row gap-8 md:gap-16 items-start"
          >
            <div className="flex-1">
              <h2 className="font-cormorant italic text-4xl md:text-6xl lg:text-7xl mb-4 md:mb-6">Scalable <span className="font-syne not-italic font-bold text-3xl md:text-5xl lg:text-6xl uppercase tracking-tighter">Systems</span></h2>
            </div>
            <div className="flex-1 space-y-4 md:space-y-6 pt-2">
              <p className="text-xl text-[#3a3a3a] leading-relaxed font-light">
                Every application is built with a deep understanding of architecture. I construct secure APIs, robust data pipelines, and interfaces that feel completely fluid.
              </p>
              <div className="w-full h-[1px] bg-[#1a1a1a]/10 my-5 md:my-8"></div>
              <p className="text-lg text-[#5a5a5a] leading-relaxed font-light">
                By merging raw technical power with immaculate design, the result is always a digital product that performs seamlessly under pressure.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Competencies / Technical Arsenal Showcase */}
      <section className="py-16 md:py-24 relative z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-center"
          >
            <span className="text-[10px] md:text-xs font-syne font-black uppercase tracking-[0.35em] text-[#1a1a1a]/40 mb-3">
              Core Competencies
            </span>
            <div className="w-12 h-[1px] bg-[#1a1a1a]/15 mb-3"></div>
            <p className="text-sm md:text-base font-cormorant italic text-[#1a1a1a]/60">
              Languages, architectures &amp; tools engineered for production
            </p>
          </motion.div>
        </div>

        {/* Dual-Track Tape with Edge-to-Edge Fade Mask */}
        <div className="relative w-full overflow-hidden marquee-mask space-y-4 md:space-y-5">
          {/* Track 1: Languages & Frontend (Moving Left) */}
          <div className="flex w-max gap-3 md:gap-4 animate-ticker hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing">
            {[...row1Skills, ...row1Skills, ...row1Skills, ...row1Skills].map((skill, index) => (
              <div
                key={`t1-${index}`}
                className="flex-shrink-0 flex items-center gap-3.5 px-6 py-3.5 bg-white/50 backdrop-blur-sm border border-white/70 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:bg-white/80 hover:border-[#1a1a1a]/20 hover:scale-105 transition-all duration-300"
              >
                <span className="p-1.5 rounded-full bg-white/70 shadow-2xs">{skill.icon}</span>
                <span className="font-syne font-bold uppercase tracking-widest text-[11px] text-[#1a1a1a]">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>

          {/* Track 2: Backend, Data & Systems (Moving Right) */}
          <div className="flex w-max gap-3 md:gap-4 animate-ticker-reverse hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing">
            {[...row2Skills, ...row2Skills, ...row2Skills, ...row2Skills].map((skill, index) => (
              <div
                key={`t2-${index}`}
                className="flex-shrink-0 flex items-center gap-3.5 px-6 py-3.5 bg-white/50 backdrop-blur-sm border border-white/70 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:bg-white/80 hover:border-[#1a1a1a]/20 hover:scale-105 transition-all duration-300"
              >
                <span className="p-1.5 rounded-full bg-white/70 shadow-2xs">{skill.icon}</span>
                <span className="font-syne font-bold uppercase tracking-widest text-[11px] text-[#1a1a1a]">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 md:py-24 px-4 md:px-6 relative z-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase font-syne font-bold text-[#1a1a1a]/40">
              Academic &amp; Development Metrics
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
            {[
              { label: "Solved", value: siteConfig.stats.leetcode, sub: "LeetCode" },
              { label: "OSS", value: siteConfig.stats.githubRepos, sub: "Repos" },
              { label: "CGPA", value: "7.9", sub: "KPRIET (VII Sem / Final Year)" },
              { label: "EXP", value: siteConfig.stats.experienceMonths, sub: "Years" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="text-center group"
              >
                <div className="font-syne font-black text-[clamp(2rem,8vw,4.5rem)] md:text-7xl uppercase tracking-tighter text-[#1a1a1a] mb-1 group-hover:scale-110 transition-transform duration-500">
                  {stat.value}
                </div>
                <div className="font-syne font-bold uppercase tracking-[0.2em] text-[8px] md:text-[10px] text-[#1a1a1a]/40 mb-1">
                  {stat.label}
                </div>
                <div className="font-cormorant italic text-sm md:text-lg text-[#1a1a1a]/60">
                  {stat.sub}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 md:py-32 px-4 md:px-6 text-center relative z-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto"
        >
          <div className="px-8 py-3 mx-auto bg-white/50 backdrop-blur-md border border-white/50 rounded-full flex items-center justify-center mb-8 md:mb-12 shadow-[0_20px_40px_rgba(0,0,0,0.05)] hover:scale-105 transition-transform duration-300 w-fit">
            <span className="font-cormorant italic text-3xl md:text-4xl text-[#1a1a1a] tracking-wide">Say</span>
          </div>
          <h2 className="font-syne font-black text-[5rem] md:text-[8rem] uppercase tracking-tighter mb-12 text-[#1a1a1a] leading-none">
            Hello.
          </h2>
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-4 text-xl md:text-2xl text-[#1a1a1a] font-cormorant italic hover:opacity-70 transition-opacity"
          >
            Let's build together
            <span className="w-12 h-12 rounded-full border border-[#1a1a1a]/20 flex items-center justify-center group-hover:bg-[#1a1a1a] group-hover:text-[#E5D5D0] group-hover:border-transparent transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </span>
          </Link>
        </motion.div>
      </section>

    </main>
  );
}
