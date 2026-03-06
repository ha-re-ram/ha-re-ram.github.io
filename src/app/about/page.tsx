"use client";

import { siteConfig } from "@/lib/config";
import Link from "next/link";
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
        <main className="min-h-screen bg-black text-white py-20 px-6 sm:px-10 max-w-5xl mx-auto">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
            >
                {/* Header Section */}
                <motion.section variants={fadeIn} className="mb-24">
                    <h1 className="text-6xl md:text-8xl font-black mb-12 bg-gradient-to-r from-white via-gray-300 to-gray-600 bg-clip-text text-transparent">
                        About Me
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
                        <div className="md:col-span-2">
                            <p className="text-2xl md:text-3xl text-gray-300 leading-relaxed mb-8 font-light italic">
                                &quot;I build systems that don&apos;t just work, but <span className="text-white font-medium">scale and endure</span>.&quot;
                            </p>
                            <p className="text-lg text-gray-400 leading-relaxed space-y-4">
                                I am <span className="text-white font-medium">Hareram Kushwaha</span>, a Computer Science Engineering student at <span className="text-white">KPR Institute of Engineering and Technology</span>. My philosophy is simple: write correct, readable code and never stop solving complex problems.
                            </p>
                        </div>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="glass p-8 rounded-3xl"
                        >
                            <h3 className="text-xs uppercase tracking-[0.3em] text-blue-500 font-bold mb-6">Expertise</h3>
                            <ul className="space-y-4 text-gray-300">
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
                                    Full-Stack (MERN)
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
                                    DS & Algorithms
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></span>
                                    System Design
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </motion.section>

                {/* Tech Stack */}
                <motion.section variants={fadeIn} className="mb-32">
                    <h2 className="text-sm uppercase tracking-[0.4em] text-gray-500 mb-10 flex items-center gap-4">
                        <span className="w-12 h-px bg-gray-900"></span>
                        Technologies
                    </h2>
                    <div className="flex flex-wrap gap-4">
                        {['Java', 'JavaScript (ES6+)', 'PHP', 'Python', 'React.js', 'Node.js', 'MongoDB', 'MySQL', 'HTML & CSS', 'Git & GitHub'].map((tech) => (
                            <motion.span
                                key={tech}
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
                                className="px-6 py-3 border border-gray-800 rounded-2xl text-base text-gray-300 transition-colors cursor-default"
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>
                </motion.section>

                {/* Experience Section */}
                <motion.section variants={fadeIn} className="mb-32">
                    <h2 className="text-sm uppercase tracking-[0.4em] text-gray-500 mb-12 flex items-center gap-4">
                        <span className="w-12 h-px bg-gray-900"></span>
                        Experience
                    </h2>
                    <div className="relative pl-12 border-l border-gray-900 ml-4 group">
                        <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-blue-500 ring-8 ring-black group-hover:scale-150 transition-transform"></div>
                        <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                            <div>
                                <h3 className="text-3xl font-bold text-white">Full Stack Intern</h3>
                                <p className="text-xl text-blue-400 font-medium">Oasis Infobyte</p>
                            </div>
                            <span className="text-gray-500 font-mono">2024 — Present</span>
                        </div>
                        <ul className="space-y-4 text-gray-400 text-lg max-w-3xl">
                            <li className="flex gap-4 italic">&mdash; Engineered a responsive storefront interface achieving 100% cross-device compatibility.</li>
                            <li className="flex gap-4 italic">&mdash; Reduced average page-load time by 200ms through optimized asset-loading.</li>
                            <li className="flex gap-4 italic">&mdash; Decreased merge conflict frequency by 30% using advanced Git strategies.</li>
                        </ul>
                    </div>
                </motion.section>

                {/* Selected Projects */}
                <motion.section variants={fadeIn} className="mb-32">
                    <div className="flex justify-between items-end mb-12">
                        <h2 className="text-4xl font-bold">Selected Work</h2>
                        <Link href="/projects" className="text-blue-400 hover:text-white transition-colors flex items-center gap-2 group">
                            Full Portfolio
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-2 transition-transform"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {siteConfig.projects.slice(0, 4).map((project) => (
                            <motion.a
                                key={project.name}
                                whileHover={{ y: -10 }}
                                href={`https://github.com/${siteConfig.social.github}/${project.name}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-10 glass rounded-[2.5rem] hover:bg-white/5 transition-all"
                            >
                                <h3 className="text-2xl font-bold mb-4 flex items-center justify-between">
                                    {project.name.replace(/-/g, ' ')}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 group-hover:-translate-y-1"><path d="M7 17L17 7" /><path d="M7 7h10v10" /></svg>
                                </h3>
                                <p className="text-gray-400 text-lg group-hover:text-gray-300 transition-colors font-light">
                                    {project.description}
                                </p>
                            </motion.a>
                        ))}
                    </div>
                </motion.section>

                {/* Education & Links */}
                <motion.section variants={fadeIn} className="mb-32 grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <h2 className="text-2xl font-bold mb-8">Work & Practice</h2>
                        <div className="flex flex-col gap-4">
                            <a href={`https://leetcode.com/u/${siteConfig.social.leetcode}/`} target="_blank" className="group flex items-center gap-6 p-6 glass rounded-3xl hover:border-orange-500/50 transition-all">
                                <div className="w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500 text-2xl font-black">L</div>
                                <div>
                                    <div className="text-xl font-bold">LeetCode</div>
                                    <div className="text-gray-500 font-light italic">Algorithmic Problem Solving</div>
                                </div>
                            </a>
                            <a href={`https://www.hackerrank.com/profile/${siteConfig.social.hackerrank}`} target="_blank" className="group flex items-center gap-6 p-6 glass rounded-3xl hover:border-green-500/50 transition-all">
                                <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500 text-2xl font-black">H</div>
                                <div>
                                    <div className="text-xl font-bold">HackerRank</div>
                                    <div className="text-gray-500 font-light italic">OOP & Java Fundamentals</div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="glass p-12 rounded-[3rem] border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl group-hover:bg-blue-500/10 transition-colors"></div>
                        <h2 className="text-3xl font-bold mb-8">Professional Resume</h2>
                        <p className="text-gray-400 text-lg mb-10 font-light leading-relaxed">
                            Looking for a printable or single-page version of my journey? Get the latest copy of my resume here.
                        </p>
                        <a
                            href={siteConfig.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-black font-bold rounded-2xl hover:scale-105 transition-all w-full"
                        >
                            View PDF Resume
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                        </a>
                    </div>
                </motion.section>

                {/* Contact Section */}
                <motion.section variants={fadeIn} className="border-t border-gray-900 pt-32 pb-20">
                    <h2 className="text-5xl md:text-7xl font-black mb-16">Connect.</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                        <div className="space-y-10">
                            <p className="text-gray-400 text-2xl font-light leading-relaxed">
                                I am usually online and responsive to messages regarding interesting projects or opportunities.
                            </p>
                            <div className="flex flex-col gap-6">
                                <a href={`mailto:${siteConfig.contact.email}`} className="text-3xl md:text-4xl font-medium text-white hover:text-blue-400 transition-colors break-words">
                                    {siteConfig.contact.email}
                                </a>
                                <a href={`tel:${siteConfig.contact.phone}`} className="text-2xl text-gray-400 hover:text-white transition-colors">
                                    {siteConfig.contact.phone}
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-col justify-end gap-12">
                            <div className="flex flex-wrap gap-10">
                                <a href={`https://linkedin.com/in/${siteConfig.social.linkedin}`} target="_blank" className="text-xl text-gray-500 hover:text-white transition-colors font-mono">LinkedIn</a>
                                <a href={`https://github.com/${siteConfig.social.github}`} target="_blank" className="text-xl text-gray-500 hover:text-white transition-colors font-mono">GitHub</a>
                                <a href={`https://twitter.com/${siteConfig.social.twitter}`} target="_blank" className="text-xl text-gray-500 hover:text-white transition-colors font-mono">Twitter</a>
                                <a href={siteConfig.url} className="text-xl text-gray-500 hover:text-white transition-colors font-mono">Portfolio</a>
                            </div>
                            <p className="text-gray-700 font-mono text-sm uppercase tracking-widest">
                                &copy; 2024 Hareram Kushwaha &bull; Design by Antigravity
                            </p>
                        </div>
                    </div>
                </motion.section>
            </motion.div>
        </main>
    );
}
