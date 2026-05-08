"use client";

import { motion } from "framer-motion";

export default function HeroVideo() {
  return (
    <div className="relative w-full h-full flex items-center justify-center lg:scale-110 px-4 md:px-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full aspect-video md:aspect-[16/10] lg:aspect-[4/3] max-w-[900px] rounded-[1.5rem] md:rounded-[4rem] overflow-hidden shadow-[0_60px_120px_-20px_rgba(0,0,0,0.2)] bg-[#1a1a1a]/5 border border-white/40 backdrop-blur-sm"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-90 transition-opacity duration-1000"
        >
          <source src="/videos/landing-video.mp4" type="video/mp4" />
        </video>

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/20 via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-[2.5rem] md:rounded-[4rem]"></div>
        
        {/* Subtle Scanline Effect for that "engineered" feel */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-20"></div>
      </motion.div>

      {/* Background Glow */}
      <div className="absolute -inset-20 bg-gradient-to-r from-[#E5D5D0]/30 to-[#d9e4eb]/30 blur-[100px] -z-10 opacity-50"></div>
    </div>
  );
}
