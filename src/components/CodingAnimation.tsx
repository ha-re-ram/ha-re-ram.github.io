"use client";

import { motion } from "framer-motion";
import { Code2, Terminal, Cpu, Database, Globe, Layers, Zap, Braces, Binary } from "lucide-react";
import { useEffect, useState } from "react";

const icons = [Code2, Terminal, Cpu, Database, Globe, Layers, Zap, Braces, Binary];

export default function CodingAnimation() {
  const [mounted, setMounted] = useState(false);
  const [randomValues, setRandomValues] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    const values = icons.map(() => ({
      initialX: Math.random() * 100 - 50 + "%",
      initialY: Math.random() * 100 - 50 + "%",
      animateX: [
        Math.random() * 100 - 50 + "%",
        Math.random() * 100 - 50 + "%",
        Math.random() * 100 - 50 + "%"
      ],
      animateY: [
        Math.random() * 100 - 50 + "%",
        Math.random() * 100 - 50 + "%",
        Math.random() * 100 - 50 + "%"
      ],
      duration: 10 + Math.random() * 10,
      size: 30 + Math.random() * 50,
      color: Math.random() > 0.7 ? "text-[#1a1a1a]/20" : Math.random() > 0.5 ? "text-[#d97706]/20" : "text-[#0d9488]/20"
    }));
    setRandomValues(values);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center scale-110 lg:scale-125">
      {/* Main Video Terminal Window */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.8, rotate: -2 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-[85%] max-w-[550px] aspect-[16/10] bg-white/40 backdrop-blur-3xl rounded-[3rem] border border-white/80 shadow-[0_40px_100px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col group"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-10 py-6 border-b border-white/50 bg-white/30 z-10">
          <div className="flex gap-3">
            <div className="w-3.5 h-3.5 rounded-full bg-red-400/30"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-amber-400/30"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-emerald-400/30"></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] font-syne font-black uppercase tracking-[0.3em] text-[#1a1a1a]/40">Hareram.stream</span>
          </div>
        </div>

        {/* Video Content */}
        <div className="flex-1 relative overflow-hidden bg-black">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
          </video>
          
          {/* Scanning Line Effect */}
          <motion.div 
            animate={{ y: ["0%", "100%", "0%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-x-0 h-[2px] bg-white/20 blur-[1px] pointer-events-none z-10"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none"></div>
        </div>

        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/40 to-transparent pointer-events-none z-20"></div>
      </motion.div>

      {/* Dynamic Aura Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[-1]">
        {[0.8, 1.1, 1.4].map((scale, i) => (
          <motion.div
            key={i}
            animate={{ 
              rotate: i % 2 === 0 ? [0, 360] : [360, 0],
              scale: [scale, scale * 1.05, scale],
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{ 
              duration: 25 + i * 10, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute w-[500px] h-[500px] border border-[#1a1a1a]/10 rounded-[4rem]"
          />
        ))}
      </div>
    </div>
  );
}
