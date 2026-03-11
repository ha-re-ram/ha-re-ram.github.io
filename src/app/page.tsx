"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { motion, Variants, AnimatePresence } from "framer-motion";

export default function Home() {
  const heroImages = siteConfig.images.hero;

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleNextImage = () => {
    setActiveImgIndex((prev) => (prev + 1) % heroImages.length);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered) {
      interval = setInterval(() => {
        setActiveImgIndex((prev) => (prev + 1) % heroImages.length);
      }, 1200); // Auto-advances every 1.2s while hovering
    }
    return () => clearInterval(interval);
  }, [isHovered, heroImages.length]);

  const mainImage = heroImages[activeImgIndex];
  const nextImage = heroImages[(activeImgIndex + 1) % heroImages.length];

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

  return (
    <main className="min-h-screen text-[#1a1a1a] relative overflow-hidden selection:bg-[#1a1a1a] selection:text-[#E5D5D0]">
      {/* Soft Vignette/Glow overlay for the edge surreal feel */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(255,255,255,0.4)] z-10 mix-blend-overlay"></div>

      {/* 3D-like floating orb gradients to emulate the Unseen 3D feel */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#f8e1da] blur-[100px] rounded-full animate-blob pointer-events-none opacity-60 mix-blend-multiply" />
      <div className="absolute top-[30%] right-[-10%] w-[40%] h-[40%] bg-[#d9e4eb] blur-[120px] rounded-full animate-blob [animation-delay:3s] pointer-events-none opacity-60 mix-blend-multiply" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20 overflow-hidden z-20">
        <div className="max-w-7xl mx-auto w-full relative min-h-[75vh] flex items-center">

          {/* Interactive Collage Images behind text */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full lg:w-[50%] h-[60vh] lg:h-[80vh] z-0 opacity-40 lg:opacity-100 flex items-center justify-end pr-4 lg:pr-10">
            {/* Main Portrait */}
            <div
              onMouseEnter={() => { setIsHovered(true); handleNextImage(); }}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleNextImage}
              className="relative w-[85%] sm:w-[70%] md:w-[60%] lg:w-[80%] h-[95%] rounded-[3rem] overflow-hidden border-[8px] border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.1)] origin-center rotate-2 z-10 bg-[#E5D5D0] cursor-pointer"
            >
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={mainImage}
                  initial={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
                  animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                  exit={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <Image src={mainImage} alt="Hareram Main" fill className="object-cover object-top filter contrast-[1.05] brightness-[0.95]" priority />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-black/5 mix-blend-overlay pointer-events-none"></div>
            </div>

            {/* Interactive Image floating Bottom Left cluster */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              onMouseEnter={() => { setIsHovered(true); handleNextImage(); }}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleNextImage}
              className="absolute right-[50%] bottom-[0%] w-[45%] lg:w-[40%] h-[40%] hidden sm:block z-20 cursor-pointer group"
            >
              {/* Stacked Edge / Back Photo (Gives the illusion of a deck of photos) */}
              <div className="absolute inset-0 rounded-[2rem] border-[6px] border-white/60 bg-white/50 shadow-xl -rotate-12 translate-x-2 translate-y-2 transition-transform duration-500 group-hover:-rotate-[15deg] group-hover:-translate-x-3 group-hover:translate-y-4"></div>

              {/* Foreground Next Photo Preview */}
              <div className="absolute inset-0 rounded-[2rem] overflow-hidden border-[6px] border-white shadow-2xl -rotate-6 transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-105 bg-[#E5D5D0]">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={nextImage}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                  >
                    <Image src={nextImage} alt="Next Image Preview" fill className="object-cover filter sepia-[0.2] group-hover:sepia-0 transition-all duration-500" />
                  </motion.div>
                </AnimatePresence>

                {/* Overlay Prompt */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-30 pointer-events-none">
                  <span className="font-syne font-bold text-white uppercase tracking-widest text-xs flex items-center gap-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                    Swap <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m21 16-4 4-4-4" /><path d="M17 20V4" /><path d="m3 8 4-4 4 4" /><path d="M7 4v16" /></svg>
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Foreground Text Content overlapping the images */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="w-full lg:w-[80%] relative z-10 flex flex-col items-start text-left mt-10 md:mt-0"
          >
            <motion.div variants={fadeUp} className="mb-8 md:mb-12">
              <span className="px-6 py-3 rounded-full border border-white/50 text-xs tracking-[0.3em] uppercase font-syne font-bold bg-[#E5D5D0]/80 backdrop-blur-md text-[#1a1a1a]/80 shadow-sm">
                Hareram Kushwaha
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="flex flex-col items-start -space-y-2 md:-space-y-6 mb-8 w-full mix-blend-normal">
              <span className="font-cormorant italic font-light text-[3.25rem] sm:text-6xl md:text-8xl lg:text-[7.5rem] tracking-tight text-[#1a1a1a] leading-none">
                Designing <span className="font-syne not-italic font-black text-[3.25rem] sm:text-6xl md:text-8xl lg:text-[7.5rem] uppercase tracking-tighter">the</span>
              </span>
              <span className="font-syne font-black text-[3.85rem] sm:text-[5.5rem] md:text-[8rem] lg:text-[9.5rem] tracking-tighter uppercase text-[#1a1a1a] leading-none ml-[-2px] md:ml-[-4px]">
                Future.
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-xl md:text-3xl text-[#1a1a1a] mb-14 max-w-xl font-light leading-relaxed font-cormorant italic bg-[#E5D5D0]/60 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none p-4 lg:p-0 rounded-2xl lg:rounded-none border-l-2 border-[#1a1a1a]/30 pl-6">
              "Where raw logic unites with uncompromised aesthetics to forge the next generation of digital platforms."
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
              <Link
                href="/projects"
                className="group relative px-10 py-5 bg-[#1a1a1a] text-[#E5D5D0] font-syne font-bold uppercase tracking-widest rounded-full hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-all flex items-center justify-center gap-4 text-xs overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-500 ease-in-out"></div>
                <span className="relative z-10 flex items-center gap-3">
                  Explore Masterpieces
                  <span className="group-hover:translate-x-2 transition-transform inline-block">→</span>
                </span>
              </Link>

              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-10 py-5 bg-[#E5D5D0]/80 backdrop-blur-md border border-[#1a1a1a]/20 text-[#1a1a1a] font-syne font-bold uppercase tracking-widest rounded-full hover:bg-white/50 hover:shadow-lg transition-all flex items-center justify-center gap-3 text-xs"
              >
                Download Resume
                <span className="group-hover:translate-x-1 transition-transform inline-block">↗</span>
              </a>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* Philosophy / Features Section */}
      <section className="py-32 px-6 relative z-20 bg-white/20 backdrop-blur-3xl border-y border-white/30 text-center md:text-left">
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

      {/* Marquee Section */}
      <section className="py-24 overflow-hidden relative z-20">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-16 items-center px-8">
              {['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'].map((tech) => (
                <span key={tech} className="font-syne text-5xl md:text-7xl font-bold text-transparent" style={{ WebkitTextStroke: '1px rgba(26,26,26,0.3)' }}>
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
            href="/about"
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
