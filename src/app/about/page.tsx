"use client";

import { siteConfig } from "@/lib/config";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <main className="min-h-screen py-32 px-6 sm:px-10 max-w-5xl mx-auto z-20 relative">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
            >
                {/* Header Section */}
                <motion.section variants={fadeIn} className="mb-32">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-syne font-black uppercase tracking-tighter mb-16 text-[#1a1a1a] leading-none">
                        About <br /><span className="font-cormorant italic font-light tracking-tight normal-case text-6xl md:text-8xl lg:text-9xl text-[#1a1a1a]">The Developer</span>
                    </h1>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                        {/* Image Column */}
                        <div className="lg:col-span-5 relative w-full h-[50vh] md:h-[70vh] rounded-[3.5rem] overflow-hidden border-[8px] border-white/40 shadow-[0_30px_60px_rgba(0,0,0,0.05)] bg-white/20 group order-1 lg:order-2">
                            <Image
                                src={siteConfig.images.about}
                                alt="Hareram Kushwaha"
                                fill
                                className="object-cover object-center filter grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000 ease-out group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-[#E5D5D0]/10 mix-blend-overlay"></div>
                        </div>

                        {/* Text Column */}
                        <div className="lg:col-span-7 flex flex-col gap-12 order-2 lg:order-1">
                            <div>
                                <p className="text-3xl md:text-5xl font-cormorant italic text-[#1a1a1a] leading-tight mb-10 font-light relative">
                                    <span className="absolute -left-8 -top-8 text-8xl text-[#1a1a1a]/10 font-syne font-black">"</span>
                                    I build systems that don't just work, but <span className="font-syne not-italic font-bold tracking-tight uppercase text-2xl md:text-3xl bg-white/40 px-3 py-1 rounded-xl">scale and endure</span>.
                                </p>
                                <p className="text-xl text-[#4a4a4a] leading-relaxed font-light mb-6 border-l-2 border-[#1a1a1a]/20 pl-6">
                                    I am <span className="font-syne font-bold uppercase tracking-widest text-sm text-[#1a1a1a]">Hareram Kushwaha</span>, a Computer Science Engineering student at KPR Institute of Engineering and Technology.
                                </p>
                                <p className="text-lg text-[#4a4a4a] leading-relaxed font-light pl-6">
                                    My philosophy is simple: write correct, readable code and never stop solving complex problems. I bridge the gap between heavy backend logic and seamless, beautiful user interfaces, ensuring that every layer of the stack is meticulously crafted.
                                </p>
                            </div>

                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="bg-white/30 backdrop-blur-xl border border-white/40 p-10 rounded-[2.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.02)] self-start w-full md:w-auto min-w-[300px]"
                            >
                                <h3 className="text-xs uppercase tracking-[0.3em] font-syne font-bold mb-8 text-[#1a1a1a]/50">Core Expertise</h3>
                                <ul className="space-y-6 text-[#1a1a1a] font-syne font-bold uppercase tracking-widest text-sm">
                                    <li className="flex items-center gap-4">
                                        <span className="w-2 h-2 rounded-full bg-[#1a1a1a]"></span>
                                        Full-Stack (MERN)
                                    </li>
                                    <li className="flex items-center gap-4">
                                        <span className="w-2 h-2 rounded-full bg-[#1a1a1a]/60"></span>
                                        DS & Algorithms
                                    </li>
                                    <li className="flex items-center gap-4">
                                        <span className="w-2 h-2 rounded-full bg-[#1a1a1a]/30"></span>
                                        System Design Architecture
                                    </li>
                                </ul>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>

                {/* Tech Stack */}
                <motion.section variants={fadeIn} className="mb-32">
                    <h2 className="text-sm uppercase tracking-[0.4em] font-syne font-bold mb-10 flex items-center gap-4 text-[#1a1a1a]/60">
                        <span className="w-12 h-px bg-[#1a1a1a]/20"></span>
                        Technologies
                    </h2>
                    <div className="flex flex-wrap gap-4">
                        {['Java', 'JavaScript (ES6+)', 'PHP', 'Python', 'React.js', 'Node.js', 'MongoDB', 'MySQL', 'HTML & CSS', 'Git & GitHub'].map((tech) => (
                            <motion.span
                                key={tech}
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.6)" }}
                                className="px-6 py-3 border border-white/40 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-[#1a1a1a] transition-colors cursor-default"
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>
                </motion.section>

                {/* Experience Section */}
                <motion.section variants={fadeIn} className="mb-32">
                    <h2 className="text-sm uppercase tracking-[0.4em] font-syne font-bold mb-12 flex items-center gap-4 text-[#1a1a1a]/60">
                        <span className="w-12 h-px bg-[#1a1a1a]/20"></span>
                        Experience
                    </h2>
                    <div className="relative pl-12 border-l border-[#1a1a1a]/10 ml-4 group">
                        <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-[#1a1a1a] group-hover:scale-150 transition-transform"></div>
                        <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                            <div>
                                <h3 className="text-3xl font-cormorant italic font-bold">Full Stack Intern</h3>
                                <p className="text-lg font-syne uppercase tracking-wider font-bold mt-2">Oasis Infobyte</p>
                            </div>
                            <span className="text-[#1a1a1a]/60 font-mono text-sm">2024 — Present</span>
                        </div>
                        <ul className="space-y-4 text-[#4a4a4a] text-lg max-w-3xl font-light">
                            <li className="flex gap-4">&mdash; Engineered a responsive storefront interface achieving 100% cross-device compatibility.</li>
                            <li className="flex gap-4">&mdash; Reduced average page-load time by 200ms through optimized asset-loading.</li>
                            <li className="flex gap-4">&mdash; Decreased merge conflict frequency by 30% using advanced Git strategies.</li>
                        </ul>
                    </div>
                </motion.section>

                {/* Selected Projects */}
                <motion.section variants={fadeIn} className="mb-32">
                    <div className="flex justify-between items-end mb-12">
                        <h2 className="text-5xl md:text-6xl font-syne font-black uppercase tracking-tighter">Selected <span className="font-cormorant italic font-light lowercase">Work</span></h2>
                        <Link href="/projects" className="text-[#1a1a1a] font-syne font-bold uppercase tracking-widest text-sm hover:opacity-60 transition-colors flex items-center gap-2 group pb-2">
                            Full Portfolio <span className="group-hover:translate-x-2 transition-transform">→</span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {siteConfig.projects.slice(0, 4).map((project) => (
                            <motion.a
                                key={project.name}
                                whileHover={{ y: -5 }}
                                href={`https://github.com/${siteConfig.social.github}/${project.name}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-10 bg-white/30 backdrop-blur-xl border border-white/40 rounded-[2.5rem] hover:bg-white/50 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.03)]"
                            >
                                <h3 className="text-2xl font-syne font-bold uppercase tracking-tight mb-4 flex items-center justify-between">
                                    {project.name.replace(/-/g, ' ')}
                                    <span className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                                </h3>
                                <p className="text-[#4a4a4a] text-lg font-light">
                                    {project.description}
                                </p>
                            </motion.a>
                        ))}
                    </div>
                </motion.section>

                {/* Education & Links */}
                <motion.section variants={fadeIn} className="mb-32 grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <h2 className="text-3xl font-cormorant italic font-bold mb-8">Work & Practice</h2>
                        <div className="flex flex-col gap-4">
                            <a href={`https://leetcode.com/u/${siteConfig.social.leetcode}/`} target="_blank" className="group flex items-center gap-6 p-6 bg-white/30 backdrop-blur-xl border border-white/40 rounded-[2rem] hover:bg-white/50 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
                                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#1a1a1a] text-2xl font-syne font-black">L</div>
                                <div>
                                    <div className="text-xl font-syne font-bold uppercase tracking-tight">LeetCode</div>
                                    <div className="text-[#4a4a4a] font-light">Algorithmic Problem Solving</div>
                                </div>
                            </a>
                            <a href={`https://www.hackerrank.com/profile/${siteConfig.social.hackerrank}`} target="_blank" className="group flex items-center gap-6 p-6 bg-white/30 backdrop-blur-xl border border-white/40 rounded-[2rem] hover:bg-white/50 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
                                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#1a1a1a] text-2xl font-syne font-black">H</div>
                                <div>
                                    <div className="text-xl font-syne font-bold uppercase tracking-tight">HackerRank</div>
                                    <div className="text-[#4a4a4a] font-light">OOP & Java Fundamentals</div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="bg-[#1a1a1a] p-12 rounded-[3rem] text-[#E5D5D0] relative overflow-hidden group flex flex-col justify-center">
                        <h2 className="text-4xl font-syne font-bold uppercase tracking-tighter mb-6 relative z-10">Professional Resume</h2>
                        <p className="text-white/70 text-lg mb-10 font-light leading-relaxed relative z-10">
                            Looking for a printable or single-page version of my journey? Get the latest copy of my resume here.
                        </p>
                        <a
                            href={siteConfig.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#E5D5D0] text-[#1a1a1a] font-syne font-bold uppercase tracking-widest text-sm rounded-full hover:scale-[1.02] transition-all w-full relative z-10 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                        >
                            View PDF Resume
                            <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
                        </a>
                    </div>
                </motion.section>

                {/* Contact Section */}
                <motion.section variants={fadeIn} className="border-t border-[#1a1a1a]/10 pt-32 pb-20">
                    <h2 className="text-7xl md:text-9xl font-syne font-black uppercase tracking-tighter mb-16">Connect.</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                        <div className="space-y-10">
                            <p className="text-[#4a4a4a] text-2xl font-light leading-relaxed">
                                I am usually online and responsive to messages regarding interesting projects or opportunities.
                            </p>
                            <div className="flex flex-col gap-6">
                                <a href={`mailto:${siteConfig.contact.email}`} className="text-3xl md:text-5xl font-cormorant italic text-[#1a1a1a] hover:opacity-60 transition-colors break-words">
                                    {siteConfig.contact.email}
                                </a>
                                <a href={`tel:${siteConfig.contact.phone}`} className="text-xl font-syne font-bold text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition-colors">
                                    {siteConfig.contact.phone}
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-col justify-end gap-12">
                            <div className="flex flex-wrap gap-10">
                                <a href={`https://linkedin.com/in/${siteConfig.social.linkedin}`} target="_blank" className="text-sm font-syne font-bold uppercase tracking-widest text-[#1a1a1a]/80 hover:text-[#1a1a1a] transition-colors">LinkedIn</a>
                                <a href={`https://github.com/${siteConfig.social.github}`} target="_blank" className="text-sm font-syne font-bold uppercase tracking-widest text-[#1a1a1a]/80 hover:text-[#1a1a1a] transition-colors">GitHub</a>
                                <a href={`https://twitter.com/${siteConfig.social.twitter}`} target="_blank" className="text-sm font-syne font-bold uppercase tracking-widest text-[#1a1a1a]/80 hover:text-[#1a1a1a] transition-colors">Twitter</a>
                            </div>
                            <p className="text-[#1a1a1a]/50 font-syne text-xs uppercase tracking-widest font-bold">
                                &copy; 2026 Hareram Kushwaha &bull; Design by Antigravity
                            </p>
                        </div>
                    </div>
                </motion.section>
            </motion.div>
        </main>
    );
}
