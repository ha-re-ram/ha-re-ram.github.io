"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/config";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className={`fixed top-0 z-[100] w-full transition-all duration-300 ${isOpen ? 'bg-[#E5D5D0]' : 'bg-[#E5D5D0]/80 backdrop-blur-2xl border-b border-[#1a1a1a]/5'} text-[#1a1a1a] shadow-sm`}>
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-5">
        <Link href="/" className="hover:opacity-80 transition-all flex items-center gap-3 relative z-[110] py-1">
          <img src="/icon.svg" alt="Logo" className="w-8 h-8 object-contain" />
          <span className="font-syne font-black text-xl tracking-tighter leading-none">Ha-re-Ram</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10 text-xs font-bold uppercase tracking-widest">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-all duration-300 relative group ${pathname === link.href ? "text-[#1a1a1a]" : "text-[#1a1a1a]/50 hover:text-[#1a1a1a]"
                }`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 h-px bg-[#1a1a1a] transition-all duration-300 ${pathname === link.href ? "w-full" : "w-0 group-hover:w-full"}`} />
            </Link>
          ))}
          <a
            href={siteConfig.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-[#1a1a1a] text-[#E5D5D0] rounded-full hover:scale-105 transition-all"
          >
            Resume
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden relative z-[110] flex items-center justify-center p-2 -mr-2 hover:bg-[#1a1a1a]/5 rounded-full transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 bg-[#E5D5D0] z-[105] md:hidden flex flex-col pt-32"
            >
              <div className="flex flex-col items-center gap-8 w-full max-w-sm mx-auto px-10">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                    className="w-full text-center"
                  >
                    <Link
                      href={link.href}
                      className={`text-[clamp(1.5rem,8vw,2.5rem)] font-syne font-black uppercase tracking-tighter transition-all block py-2 ${pathname === link.href ? "text-[#1a1a1a]" : "text-[#1a1a1a]/20 hover:text-[#1a1a1a]"
                        }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-10 w-full flex justify-center"
                >
                  <a
                    href={siteConfig.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-10 py-5 bg-[#1a1a1a] text-[#E5D5D0] text-[10px] font-syne font-bold uppercase tracking-widest rounded-full shadow-2xl active:scale-95 transition-all"
                  >
                    Resume
                    <ArrowUpRight size={18} />
                  </a>
                </motion.div>
              </div>

              {/* Decorative elements in mobile menu */}
              <div className="absolute bottom-12 left-0 right-0 text-center text-[10px] font-syne font-bold uppercase tracking-[0.4em] text-[#1a1a1a]/10">
                Hareram Kushwaha &bull; 2025
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
