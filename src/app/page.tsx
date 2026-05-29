"use client";

import { useState, useEffect } from "react";
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

export default function Home() {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const skills = [
    { name: "Java", icon: <Coffee className="w-5 h-5" /> },
    { name: "JavaScript", icon: <Code2 className="w-5 h-5" /> },
    { name: "React", icon: <Layers className="w-5 h-5" /> },
    { name: "Node.js", icon: <Server className="w-5 h-5" /> },
    { name: "MongoDB", icon: <Database className="w-5 h-5" /> },
    { name: "MySQL", icon: <Database className="w-5 h-5" /> },
    { name: "PHP", icon: <Globe className="w-5 h-5" /> },
    { name: "Python", icon: <Terminal className="w-5 h-5" /> },
    { name: "Git", icon: <GitBranch className="w-5 h-5" /> },
  ];

  return (
    <main className="min-h-screen text-[#1a1a1a] relative overflow-hidden selection:bg-[#1a1a1a] selection:text-[#E5D5D0]">
      {/* Soft Vignette/Glow overlay for the edge surreal feel */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(255,255,255,0.4)] z-10 mix-blend-overlay"></div>

      {/* 3D-like floating orb gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#f8e1da] blur-[100px] rounded-full animate-blob pointer-events-none opacity-60 mix-blend-multiply" />
      <div className="absolute top-[30%] right-[-10%] w-[40%] h-[40%] bg-[#d9e4eb] blur-[120px] rounded-full animate-blob [animation-delay:3s] pointer-events-none opacity-60 mix-blend-multiply" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-2 md:pt-32 pb-12 overflow-hidden z-20">
        <div className="max-w-7xl mx-auto w-full relative min-h-[75vh] flex flex-col lg:flex-row items-center">

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
            <motion.div variants={fadeUp} className="mb-3 md:mb-12 flex flex-col gap-3 w-full">
              <div className="flex flex-wrap items-center gap-4">
                <span className="px-6 py-3 rounded-full border border-white/50 text-xs tracking-[0.3em] uppercase font-syne font-bold bg-[#E5D5D0]/80 backdrop-blur-md text-[#1a1a1a]/80 shadow-sm">
                  Hareram Kushwaha
                </span>
              </div>
              <span className="text-[10px] md:text-xs tracking-[0.15em] md:tracking-[0.2em] uppercase font-syne font-bold text-[#1a1a1a]/60 pl-2 leading-relaxed whitespace-normal break-words">
                CS Engineering Student · Full Stack Developer · Open to Opportunities
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="flex flex-col mb-4 md:mb-10 relative">
              <span className="font-cormorant italic font-light text-[clamp(2.2rem,9vw,7.5rem)] tracking-tight text-[#1a1a1a] leading-[0.9]">
                Engineering <span className="font-syne not-italic font-black text-[clamp(2.2rem,9vw,7.5rem)] uppercase tracking-tighter">the</span>
              </span>
              <span className="font-syne font-black text-[clamp(2.5rem,11vw,8rem)] tracking-tighter uppercase text-[#1a1a1a] leading-[0.8] ml-[-1px] md:ml-[-4px]">
                Future.
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg md:text-3xl text-[#1a1a1a] mb-8 md:mb-14 max-w-xl font-light leading-relaxed font-cormorant italic border-l-2 border-[#1a1a1a]/30 pl-6">
              "A student of computer science who believes software engineering isn't just about writing code that works, but about designing systems that are robust, readable, and genuinely delightful to experience."
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-row flex-wrap items-center justify-center lg:justify-start gap-4 w-full">
              <Link
                href="/projects"
                className="group relative px-6 md:px-10 py-4 md:py-5 bg-[#1a1a1a] text-[#E5D5D0] font-syne font-bold uppercase tracking-widest rounded-full hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-all flex items-center justify-center gap-3 md:gap-4 text-[10px] md:text-xs overflow-hidden flex-1 sm:flex-none"
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
                className="group px-6 md:px-10 py-4 md:py-5 bg-[#E5D5D0]/80 backdrop-blur-md border border-[#1a1a1a]/20 text-[#1a1a1a] font-syne font-bold uppercase tracking-widest rounded-full hover:bg-white/50 hover:shadow-lg transition-all flex items-center justify-center gap-2 md:gap-3 text-[10px] md:text-xs flex-1 sm:flex-none"
              >
                Resume
                <span className="group-hover:translate-x-1 transition-transform inline-block">↗</span>
              </a>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* Philosophy / Features Section */}
      <section className="py-16 md:py-32 px-6 relative z-20 bg-white/20 backdrop-blur-3xl border-y border-white/30 text-center md:text-left">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row gap-16 items-start"
          >
            <div className="flex-1">
              <h2 className="font-cormorant italic text-5xl md:text-7xl mb-6">Scalable <br /><span className="font-syne not-italic font-bold text-4xl md:text-6xl uppercase tracking-tighter">Systems</span></h2>
            </div>
            <div className="flex-1 space-y-6 pt-2">
              <p className="text-xl text-[#3a3a3a] leading-relaxed font-light">
                Every application is built with a deep understanding of architecture. I construct secure APIs, robust data pipelines, and interfaces that feel completely fluid.
              </p>
              <div className="w-full h-[1px] bg-[#1a1a1a]/10 my-8"></div>
              <p className="text-lg text-[#5a5a5a] leading-relaxed font-light">
                By merging raw technical power with immaculate design, the result is always a digital product that performs seamlessly under pressure.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Ticker Section */}
      <section className="py-24 px-6 relative z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center mb-16"
          >
            <h3 className="font-syne font-bold uppercase tracking-[0.3em] text-xs text-[#1a1a1a]/40 mb-4">Core Competencies</h3>
            <div className="w-12 h-[1px] bg-[#1a1a1a]/20"></div>
          </motion.div>

          <div className="relative overflow-x-hidden">
            <div className="flex gap-4 md:gap-6 animate-ticker hover:[animation-play-state:paused]">
              {[...skills, ...skills, ...skills].map((skill, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 flex items-center gap-3 md:gap-4 px-5 py-3.5 md:px-8 md:py-5 bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl shadow-sm hover:shadow-md hover:bg-white/60 transition-all cursor-default"
                >
                  <span className="text-[#1a1a1a]/60 w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">{skill.icon}</span>
                  <span className="font-syne font-bold uppercase tracking-widest text-[10px] md:text-xs text-[#1a1a1a]">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-8 md:py-12 overflow-hidden relative z-20 opacity-30">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-8 md:gap-16 items-center px-4 md:px-8">
              {['Java', 'JavaScript', 'React', 'Node.js', 'MongoDB', 'MySQL', 'PHP', 'Python', 'Git'].map((tech) => (
                <span key={tech} className="font-syne text-3xl md:text-7xl font-bold text-transparent" style={{ WebkitTextStroke: '1px rgba(26,26,26,0.3)' }}>
                  {tech}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-32 px-6 relative z-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase font-syne font-bold text-[#1a1a1a]/40">
              Academic &amp; Development Metrics · Coimbatore, IN
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
            {[
              { label: "Solved", value: siteConfig.stats.leetcode, sub: "LeetCode" },
              { label: "OSS", value: siteConfig.stats.githubRepos, sub: "Repos" },
              { label: "CGPA", value: "7.9", sub: "KPRIET (3rd Year)" },
              { label: "EXP", value: siteConfig.stats.experienceMonths, sub: "Years" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
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
      <section className="py-24 md:py-40 px-6 text-center relative z-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <div className="w-32 h-32 mx-auto bg-white/50 backdrop-blur-md border border-white/50 rounded-full flex items-center justify-center mb-12 shadow-[0_20px_40px_rgba(0,0,0,0.05)]">
            <span className="font-cormorant italic text-4xl text-[#1a1a1a]">Say</span>
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
