"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/config";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ExperienceCard from "@/components/ExperienceCard";
import { Award, BookOpen, GraduationCap } from "lucide-react";

export default function About() {
    const [certs, setCerts] = useState<any[]>([]);
    const [loadingCerts, setLoadingCerts] = useState(true);
    const [projects, setProjects] = useState<any[]>([]);
    const [loadingProjects, setLoadingProjects] = useState(true);

    useEffect(() => {
        const fetchCerts = async () => {
            if (!db) {
                setCerts(siteConfig.certifications);
                setLoadingCerts(false);
                return;
            }
            try {
                const querySnapshot = await getDocs(collection(db, "certifications"));
                const data: any[] = [];
                querySnapshot.forEach((doc) => {
                    data.push({ id: doc.id, ...doc.data() });
                });
                
                if (data.length > 0) {
                    // Sort by order or date
                    data.sort((a, b) => {
                        if (a.order !== undefined && b.order !== undefined) return a.order - b.order;
                        return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime();
                    });
                    setCerts(data);
                } else {
                    setCerts(siteConfig.certifications);
                }
            } catch (error) {
                console.error("Error fetching certs:", error);
                setCerts(siteConfig.certifications);
            } finally {
                setLoadingCerts(false);
            }
        };
        fetchCerts();

        const fetchProjects = async () => {
            if (!db) {
                setProjects(siteConfig.projects.slice(0, 4));
                setLoadingProjects(false);
                return;
            }
            try {
                const querySnapshot = await getDocs(collection(db, "projects"));
                const data: any[] = [];
                querySnapshot.forEach((doc) => {
                    data.push({ id: doc.id, ...doc.data() });
                });
                
                if (data.length > 0) {
                    // Filter for featured projects or sort by order
                    let featured = data.filter(p => p.featured === true || p.isFeatured === true);
                    if (featured.length === 0) {
                        featured = data.slice(0, 4);
                    }
                    setProjects(featured);
                } else {
                    setProjects(siteConfig.projects.slice(0, 4));
                }
            } catch (error) {
                console.error("Error fetching projects:", error);
                setProjects(siteConfig.projects.slice(0, 4));
            } finally {
                setLoadingProjects(false);
            }
        };
        fetchProjects();
    }, []);

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
        <main className="min-h-screen py-12 md:py-32 px-6 sm:px-10 max-w-5xl mx-auto z-20 relative">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
            >
                {/* Header Section */}
                <motion.section variants={fadeIn} className="mb-16 md:mb-32">
                    <h1 className="text-[clamp(2.5rem,10vw,5.5rem)] md:text-7xl lg:text-8xl font-syne font-black uppercase tracking-tighter mb-10 md:mb-16 text-[#1a1a1a] leading-tight md:leading-none">
                        About <br /><span className="font-cormorant italic font-light tracking-tight normal-case text-[clamp(2.5rem,12vw,6.5rem)] md:text-8xl lg:text-9xl text-[#1a1a1a]">The Developer</span>
                    </h1>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                        {/* Image Column with Cinematic Effects */}
                        <div 
                            className="lg:col-span-5 relative w-full aspect-[4/5] md:h-[70vh] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border border-white/40 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] bg-white/20 group order-1 lg:order-2"
                            style={{
                                maskImage: "linear-gradient(to bottom, black 90%, transparent)",
                                WebkitMaskImage: "linear-gradient(to bottom, black 90%, transparent)"
                            }}
                        >
                            <Image
                                src={siteConfig.images.about}
                                alt="Hareram Kushwaha"
                                fill
                                className="object-cover object-center filter grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 ease-out group-hover:scale-105"
                            />
                            
                            {/* Cinematic Overlays */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/20 via-transparent to-transparent pointer-events-none"></div>
                            <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-[3.5rem]"></div>
                            
                            {/* Scanline Effect */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-20"></div>

                            {/* Background Glow behind the image */}
                            <div className="absolute -inset-10 bg-[#E5D5D0]/10 blur-2xl -z-10 group-hover:opacity-100 transition-opacity"></div>
                        </div>

                        {/* Text Column */}
                        <div className="lg:col-span-7 flex flex-col gap-12 order-2 lg:order-1">
                            <div>
                                <p className="text-2xl md:text-5xl font-cormorant italic text-[#1a1a1a] leading-tight mb-8 md:mb-10 font-light relative">
                                    <span className="absolute -left-4 -top-8 md:-left-8 md:-top-8 text-6xl md:text-8xl text-[#1a1a1a]/10 font-syne font-black">"</span>
                                    I build systems that don't just work, but <span className="font-syne not-italic font-bold tracking-tight uppercase text-lg md:text-3xl bg-white/40 px-3 py-1 rounded-xl inline-block mt-2 md:mt-0">scale and endure</span>.
                                </p>
                                <p className="text-xl text-[#4a4a4a] leading-relaxed font-light mb-6 border-l-2 border-[#1a1a1a]/20 pl-6">
                                    I am <span className="font-syne font-bold uppercase tracking-widest text-sm text-[#1a1a1a]">Hareram Kushwaha</span>, a Computer Science Engineering student at KPR Institute of Engineering and Technology.
                                </p>
                                <p className="text-lg text-[#4a4a4a] leading-relaxed font-light pl-6">
                                    My philosophy is simple: write correct, readable code and never stop solving complex problems. I bridge the gap between heavy backend logic and seamless, beautiful user interfaces.
                                </p>
                            </div>

                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="bg-white/30 backdrop-blur-xl border border-white/40 p-6 md:p-10 rounded-[2.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.02)] self-start w-full md:w-auto"
                            >
                                <h3 className="text-xs uppercase tracking-[0.3em] font-syne font-bold mb-8 text-[#1a1a1a]/50">Core Expertise</h3>
                                <ul className="space-y-6 text-[#1a1a1a] font-syne font-bold uppercase tracking-widest text-sm">
                                    <li className="flex items-center gap-4">
                                        <span className="w-2 h-2 rounded-full bg-[#1a1a1a]"></span>
                                        Full-Stack Development
                                    </li>
                                    <li className="flex items-center gap-4">
                                        <span className="w-2 h-2 rounded-full bg-[#1a1a1a]/60"></span>
                                        Backend Systems
                                    </li>
                                    <li className="flex items-center gap-4">
                                        <span className="w-2 h-2 rounded-full bg-[#1a1a1a]/30"></span>
                                        System Architecture
                                    </li>
                                </ul>
                            </motion.div>
                        </div>
                    </div>
                </motion.section>

                {/* Tech Stack */}
                <motion.section variants={fadeIn} className="mb-16 md:mb-32">
                    <h2 className="text-sm uppercase tracking-[0.4em] font-syne font-bold mb-10 flex items-center gap-4 text-[#1a1a1a]/60">
                        <span className="w-12 h-px bg-[#1a1a1a]/20"></span>
                        Technologies
                    </h2>
                    <div className="flex flex-wrap gap-4">
                        {['Java', 'JavaScript', 'PHP', 'Python', 'React.js', 'Node.js', 'MongoDB', 'MySQL', 'HTML & CSS', 'Git & GitHub'].map((tech) => (
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
                <motion.section variants={fadeIn} className="mb-20 md:mb-32">
                    <h2 className="text-sm uppercase tracking-[0.4em] font-syne font-bold mb-12 flex items-center gap-4 text-[#1a1a1a]/60">
                        <span className="w-12 h-px bg-[#1a1a1a]/20"></span>
                        Experience
                    </h2>
                    <div className="flex flex-col">
                        <ExperienceCard
                            company="Oasis Infobyte"
                            role="Full Stack Intern"
                            period="2024 — 2025"
                            description="Engineered a responsive storefront interface achieving 100% cross-device compatibility. Reduced average page-load time by 200ms through optimized asset-loading. Decreased merge conflict frequency by 30% using advanced Git strategies."
                            isFirst={true}
                        />
                    </div>
                </motion.section>

                {/* Education Section */}
                <motion.section variants={fadeIn} className="mb-32">
                    <h2 className="text-sm uppercase tracking-[0.4em] font-syne font-bold mb-12 flex items-center gap-4 text-[#1a1a1a]/60">
                        <span className="w-12 h-px bg-[#1a1a1a]/20"></span>
                        Education
                    </h2>
                    <div className="flex flex-col">
                        <ExperienceCard
                            company="KPR Institute of Engineering and Technology"
                            role="B.E. Computer Science and Engineering"
                            period="2023 — 2027"
                            description="Focused on core computer science principles including Data Structures, Algorithms, Operating Systems, and Database Management Systems. Maintaining a strong academic record while building real-world projects."
                            isFirst={false}
                        />
                    </div>
                </motion.section>

                {/* Certifications Section */}
                <motion.section variants={fadeIn} className="mb-32">
                    <h2 className="text-sm uppercase tracking-[0.4em] font-syne font-bold mb-12 flex items-center gap-4 text-[#1a1a1a]/60">
                        <span className="w-12 h-px bg-[#1a1a1a]/20"></span>
                        Certifications
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {loadingCerts ? (
                             [1, 2].map((i) => (
                                <div key={i} className="h-32 bg-white/20 animate-pulse rounded-[2rem] border border-white/40"></div>
                            ))
                        ) : (
                            certs.map((cert, index) => (
                                <motion.div
                                    key={cert.id || index}
                                    whileHover={{ y: -5 }}
                                    className="group p-8 bg-white/30 backdrop-blur-xl border border-white/40 rounded-[2rem] hover:bg-white/50 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex items-start gap-6"
                                >
                                    <div className="w-12 h-12 rounded-full bg-[#1a1a1a]/5 flex items-center justify-center text-[#1a1a1a]/40 group-hover:bg-[#1a1a1a] group-hover:text-[#E5D5D0] transition-all">
                                        <Award className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-syne font-bold uppercase tracking-tight mb-2">{cert.name}</h3>
                                        <p className="text-[#1a1a1a]/60 font-cormorant italic text-lg">{cert.issuer} &bull; {cert.date}</p>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </motion.section>

                {/* Selected Work Summary */}
                <motion.section variants={fadeIn} className="mb-32">
                    <div className="flex justify-between items-end mb-12">
                        <h2 className="text-5xl md:text-6xl font-syne font-black uppercase tracking-tighter">Selected <span className="font-cormorant italic font-light lowercase">Work</span></h2>
                        <Link href="/projects" className="text-[#1a1a1a] font-syne font-bold uppercase tracking-widest text-sm hover:opacity-60 transition-colors flex items-center gap-2 group pb-2">
                            Full Portfolio <span className="group-hover:translate-x-2 transition-transform">→</span>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {loadingProjects ? (
                            [1, 2].map((i) => (
                                <div key={i} className="h-48 bg-white/20 animate-pulse rounded-[2.5rem] border border-white/40"></div>
                            ))
                        ) : (
                            projects.map((project) => (
                                <motion.div
                                    key={project.id || project.name}
                                    whileHover={{ y: -5 }}
                                    className="group p-10 bg-white/30 backdrop-blur-xl border border-white/40 rounded-[2.5rem] hover:bg-white/50 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.03)]"
                                >
                                    <h3 className="text-2xl font-syne font-bold uppercase tracking-tight mb-4 flex items-center justify-between">
                                        {(project.title || project.name || "").replace(/-/g, ' ')}
                                        <Link 
                                            href={project.id ? `/article?id=${project.id}&type=projects` : `https://github.com/${siteConfig.social.github}/${project.name}`}
                                            target={project.id ? "_self" : "_blank"}
                                            className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 group-hover:-translate-y-1"
                                        >
                                            ↗
                                        </Link>
                                    </h3>
                                    <p className="text-[#4a4a4a] text-lg font-light line-clamp-2">
                                        {project.content || project.description}
                                    </p>
                                </motion.div>
                            ))
                        )}
                    </div>
                </motion.section>

                {/* Professional Resume CTA */}
                <motion.section variants={fadeIn} className="mb-32">
                    <div className="bg-[#1a1a1a] p-12 rounded-[3rem] text-[#E5D5D0] relative overflow-hidden group flex flex-col items-center text-center">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -mr-32 -mt-32"></div>
                        <h2 className="text-4xl md:text-6xl font-syne font-bold uppercase tracking-tighter mb-6 relative z-10">Professional Journey</h2>
                        <p className="text-white/70 text-lg md:text-xl mb-10 font-light leading-relaxed max-w-2xl relative z-10">
                            Interested in the full technical breakdown of my academic and professional path? Download the comprehensive PDF resume.
                        </p>
                        <a
                            href={siteConfig.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#E5D5D0] text-[#1a1a1a] font-syne font-bold uppercase tracking-widest text-sm rounded-full hover:scale-[1.02] transition-all relative z-10 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                        >
                            View PDF Resume
                            <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
                        </a>
                    </div>
                </motion.section>
            </motion.div>
        </main>
    );
}
