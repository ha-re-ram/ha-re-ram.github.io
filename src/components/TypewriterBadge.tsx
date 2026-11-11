"use client";

import React, { memo } from "react";
import { useTypewriterMachine } from "@/lib/machines/typewriterMachine";

interface TypewriterBadgeProps {
  words: string[];
}

export const TypewriterBadge = memo(function TypewriterBadge({ words }: TypewriterBadgeProps) {
  const { text, phase } = useTypewriterMachine({ words });

  return (
    <span
      data-typewriter-phase={phase}
      data-typewriter-text={text}
      className="inline-flex items-center gap-2.5 px-4.5 py-2.5 rounded-full border border-emerald-500/20 text-[10px] md:text-xs tracking-[0.1em] uppercase font-syne font-extrabold bg-emerald-500/10 backdrop-blur-md text-emerald-800 shadow-[0_4px_15px_rgba(16,185,129,0.05)] hover:scale-105 transition-all duration-300 flex-shrink-0 min-w-[210px] sm:min-w-[240px]"
    >
      <span className="relative flex h-2 w-2 flex-shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
      </span>
      <span className="whitespace-nowrap flex items-center">
        {text}
        <span className="w-[1.5px] h-3.5 bg-emerald-700 animate-pulse inline-block ml-1">|</span>
      </span>
    </span>
  );
});

