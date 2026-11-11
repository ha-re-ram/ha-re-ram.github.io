"use client";

import { motion } from "framer-motion";

export default function HeroVideo() {
  return (
    <div className="relative w-full h-full flex items-center justify-center lg:scale-110 px-4 md:px-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full aspect-video md:aspect-[16/10] lg:aspect-[4/3] max-w-[900px] rounded-[1.5rem] md:rounded-[4rem] overflow-hidden shadow-[0_30px_70px_-20px_rgba(0,0,0,0.15)] bg-[#1a1a1a]/5 border border-white/40"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          transform: "translate3d(0,0,0)",
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-90 transition-opacity duration-700"
        >
          <source src="/videos/landing-video.mp4" type="video/mp4" />
        </video>

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/20 via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-[2.5rem] md:rounded-[4rem]"></div>

        {/* Subtle Scanline Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-20"></div>
      </motion.div>

      {/* Lightweight GPU-Friendly Background Glow */}
      <div
        className="absolute -inset-10 rounded-full pointer-events-none -z-10 opacity-60"
        style={{
          background: "radial-gradient(circle, rgba(229,213,208,0.6) 0%, rgba(217,228,235,0.4) 45%, transparent 70%)",
          transform: "translate3d(0,0,0)",
        }}
      />
    </div>
  );
}
