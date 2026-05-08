"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

interface ExperienceCardProps {
  company: string;
  role: string;
  period: string;
  description: string;
  isFirst?: boolean;
}

export default function ExperienceCard({ company, role, period, description, isFirst }: ExperienceCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative pl-8 md:pl-12 pb-12 last:pb-0"
    >
      {/* Timeline Line */}
      <div className="absolute left-[11px] md:left-[15px] top-0 bottom-0 w-[2px] bg-[#1a1a1a]/5 last:bg-transparent"></div>
      
      {/* Timeline Dot */}
      <div className={`absolute left-0 top-0 w-6 h-6 rounded-full border-2 border-[#1a1a1a] flex items-center justify-center bg-[#E5D5D0] z-10 ${isFirst ? 'scale-110 shadow-lg' : 'scale-90 opacity-50'}`}>
        <div className={`w-2 h-2 rounded-full bg-[#1a1a1a] ${isFirst ? 'animate-pulse' : ''}`}></div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="font-syne font-bold uppercase tracking-widest text-[10px] text-[#1a1a1a]/40">{period}</span>
        <h3 className="font-syne font-black text-2xl md:text-3xl uppercase tracking-tighter text-[#1a1a1a]">{company}</h3>
        <span className="font-cormorant italic text-xl text-[#1a1a1a]/60">{role}</span>
        <p className="font-cormorant text-lg text-[#1a1a1a]/80 mt-4 leading-relaxed max-w-2xl">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
