"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTerminalMachine } from "@/lib/machines/terminalMachine";

export default function TerminalEasterEgg() {
  const {
    isOpen,
    status,
    input,
    output,
    inputRef,
    bottomRef,
    close,
    setInput,
    historyPrev,
    historyNext,
    executeCommand,
  } = useTerminalMachine();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      historyPrev();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      historyNext();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-label="Developer Terminal"
          data-terminal-state={isOpen ? "open" : "closed"}
          data-terminal-status={status}
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-full sm:max-w-[420px] h-[360px] bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] z-[100] flex flex-col font-mono text-sm overflow-hidden"
        >
          <div className="flex justify-between items-center px-4 py-3 bg-white/40 border-b border-white/50 select-none backdrop-blur-md">
            <div className="flex gap-2 items-center">
              <button
                type="button"
                aria-label="Close terminal"
                onClick={close}
                className="w-3 h-3 rounded-full bg-[#1a1a1a]/20 hover:bg-rose-500/80 transition-colors cursor-pointer"
              />
              <div className="w-3 h-3 rounded-full bg-[#1a1a1a]/10" />
              <div className="w-3 h-3 rounded-full bg-[#1a1a1a]/10" />
            </div>
            <span className="text-[#1a1a1a]/40 font-syne font-bold tracking-widest uppercase text-[10px]">
              hk-os (Ctrl+` or Esc)
            </span>
          </div>

          <div
            className="flex-1 p-5 overflow-y-auto w-full custom-scrollbar text-[#1a1a1a]"
            onClick={() => inputRef.current?.focus()}
          >
            {output.map((line) => (
              <div
                key={line.id}
                className={`mb-1.5 ${
                  line.type === "error"
                    ? "text-red-500 font-medium"
                    : line.type === "user"
                    ? "text-[#1a1a1a]/60 font-semibold"
                    : line.type === "ascii"
                    ? "text-[#1a1a1a] whitespace-pre font-black leading-tight"
                    : "text-[#1a1a1a]/80 font-light"
                }`}
              >
                {line.text}
              </div>
            ))}

            <form onSubmit={handleSubmit} className="flex gap-2 mt-4 w-full">
              <span className="text-[#1a1a1a] font-bold">~/hk</span>
              <span className="text-[#1a1a1a]/40">❯</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent border-none outline-none text-[#1a1a1a] w-full font-medium placeholder-[#1a1a1a]/20"
                autoComplete="off"
                placeholder="Type 'help'..."
                autoFocus
              />
            </form>
            <div ref={bottomRef} className="h-1" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
