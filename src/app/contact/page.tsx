"use client";

import { siteConfig } from "@/lib/config";
import { useForm, ValidationError } from "@formspree/react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Linkedin, Github, Twitter } from "lucide-react";

export default function Contact() {
    const [state, handleSubmit] = useForm(siteConfig.contact.formspreeId);

    return (
        <main className="min-h-screen py-20 md:py-32 px-6 sm:px-10 max-w-7xl mx-auto relative z-20">
            <header className="mb-12 md:mb-20">
                <h1 className="text-[clamp(2.5rem,10vw,5rem)] md:text-8xl lg:text-9xl font-syne font-black uppercase tracking-tighter mb-8 text-[#1a1a1a] leading-tight md:leading-none">
                    Get in <span className="font-cormorant italic font-light tracking-tight normal-case text-[clamp(2.5rem,12vw,6rem)] md:text-8xl lg:text-9xl">Touch</span>
                </h1>
                <p className="text-xl md:text-3xl font-cormorant italic text-[#4a4a4a] max-w-2xl leading-relaxed font-light">
                    Have a project in mind or just want to say hello? I'm always open to discussing new opportunities and interesting ideas.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-start">
                {/* Contact Info */}
                <div className="lg:col-span-5 space-y-12">
                    <div className="space-y-8">
                        <motion.div 
                            whileHover={{ x: 10 }}
                            className="flex items-start gap-6 group"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-white/40 border border-white/60 flex items-center justify-center text-[#1a1a1a]/40 group-hover:bg-[#1a1a1a] group-hover:text-[#E5D5D0] transition-all shadow-sm">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-[10px] font-syne font-black uppercase tracking-widest text-[#1a1a1a]/40 mb-1">Email Me</p>
                                <a href={`mailto:${siteConfig.contact.email}`} className="text-xl font-syne font-bold text-[#1a1a1a] hover:opacity-60 transition-opacity break-all">{siteConfig.contact.email}</a>
                            </div>
                        </motion.div>

                        <motion.div 
                            whileHover={{ x: 10 }}
                            className="flex items-start gap-6 group"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-white/40 border border-white/60 flex items-center justify-center text-[#1a1a1a]/40 group-hover:bg-[#1a1a1a] group-hover:text-[#E5D5D0] transition-all shadow-sm">
                                <Phone className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-[10px] font-syne font-black uppercase tracking-widest text-[#1a1a1a]/40 mb-1">Call Me</p>
                                <a href={`tel:${siteConfig.contact.phone}`} className="text-xl font-syne font-bold text-[#1a1a1a] hover:opacity-60 transition-opacity">{siteConfig.contact.phone}</a>
                            </div>
                        </motion.div>

                        <motion.div 
                            whileHover={{ x: 10 }}
                            className="flex items-start gap-6 group"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-white/40 border border-white/60 flex items-center justify-center text-[#1a1a1a]/40 group-hover:bg-[#1a1a1a] group-hover:text-[#E5D5D0] transition-all shadow-sm">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-[10px] font-syne font-black uppercase tracking-widest text-[#1a1a1a]/40 mb-1">Location</p>
                                <p className="text-xl font-syne font-bold text-[#1a1a1a]">Tamil Nadu, India</p>
                            </div>
                        </motion.div>
                    </div>

                    <div className="pt-12 border-t border-[#1a1a1a]/10">
                        <p className="text-[10px] font-syne font-black uppercase tracking-widest text-[#1a1a1a]/40 mb-8">Social Connect</p>
                        <div className="flex gap-4">
                            {[
                                { icon: Linkedin, href: `https://linkedin.com/in/${siteConfig.social.linkedin}` },
                                { icon: Github, href: `https://github.com/${siteConfig.social.github}` },
                                { icon: Twitter, href: `https://twitter.com/${siteConfig.social.twitter}` }
                            ].map((social, i) => (
                                <motion.a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -5 }}
                                    className="w-12 h-12 rounded-full bg-white/40 border border-white/60 flex items-center justify-center text-[#1a1a1a]/60 hover:bg-[#1a1a1a] hover:text-[#E5D5D0] transition-all shadow-sm"
                                >
                                    <social.icon className="w-5 h-5" />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="lg:col-span-7">
                    <div className="bg-white/30 backdrop-blur-xl p-6 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.03)] relative overflow-hidden">
                        <AnimatePresence mode="wait">
                            {state.succeeded ? (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="py-20 text-center space-y-6"
                                >
                                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                                        <CheckCircle2 className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-4xl font-syne font-black uppercase tracking-tighter">Inquiry Sent!</h3>
                                    <p className="text-xl font-cormorant italic text-[#1a1a1a]/60 max-w-md mx-auto">
                                        Thank you for reaching out. Your message has been transmitted successfully. I'll get back to you shortly.
                                    </p>
                                    <button 
                                        onClick={() => window.location.reload()}
                                        className="mt-8 px-8 py-4 bg-[#1a1a1a] text-[#E5D5D0] font-syne font-black uppercase tracking-widest text-xs rounded-full hover:scale-105 transition-transform"
                                    >
                                        Send Another
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-8"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                        <div className="space-y-3">
                                            <label htmlFor="full-name" className="text-[10px] font-syne font-black uppercase tracking-widest text-[#1a1a1a]/40 ml-4">Full Name</label>
                                            <input
                                                id="full-name"
                                                type="text"
                                                name="name"
                                                required
                                                placeholder="e.g. Hareram Kushwaha"
                                                className="w-full bg-white/50 border border-white/60 rounded-2xl p-5 text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]/20 transition-all font-medium placeholder:text-[#1a1a1a]/20 shadow-sm"
                                            />
                                            <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-[10px] uppercase font-bold ml-4 mt-1" />
                                        </div>
                                        <div className="space-y-3">
                                            <label htmlFor="email" className="text-[10px] font-syne font-black uppercase tracking-widest text-[#1a1a1a]/40 ml-4">Email Address</label>
                                            <input
                                                id="email"
                                                type="email"
                                                name="email"
                                                required
                                                placeholder="email@example.com"
                                                className="w-full bg-white/50 border border-white/60 rounded-2xl p-5 text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]/20 transition-all font-medium placeholder:text-[#1a1a1a]/20 shadow-sm"
                                            />
                                            <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-[10px] uppercase font-bold ml-4 mt-1" />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label htmlFor="subject" className="text-[10px] font-syne font-black uppercase tracking-widest text-[#1a1a1a]/40 ml-4">Inquiry Subject</label>
                                        <input
                                            id="subject"
                                            type="text"
                                            name="subject"
                                            required
                                            placeholder="How can I help you today?"
                                            className="w-full bg-white/50 border border-white/60 rounded-2xl p-5 text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]/20 transition-all font-medium placeholder:text-[#1a1a1a]/20 shadow-sm"
                                        />
                                        <ValidationError prefix="Subject" field="subject" errors={state.errors} className="text-red-500 text-[10px] uppercase font-bold ml-4 mt-1" />
                                    </div>

                                    <div className="space-y-3">
                                        <label htmlFor="message" className="text-[10px] font-syne font-black uppercase tracking-widest text-[#1a1a1a]/40 ml-4">Detailed Message</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            rows={4}
                                            placeholder="Provide details about your project..."
                                            className="w-full bg-white/50 border border-white/60 rounded-2xl p-5 text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]/20 transition-all font-light leading-relaxed placeholder:text-[#1a1a1a]/20 shadow-sm text-base md:text-lg"
                                        />
                                        <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-[10px] uppercase font-bold ml-4 mt-1" />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={state.submitting}
                                        className="w-full bg-[#1a1a1a] text-[#E5D5D0] font-syne font-black uppercase tracking-[0.2em] text-sm py-5 rounded-full shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3"
                                    >
                                        {state.submitting ? (
                                            <>Transmitting...</>
                                        ) : (
                                            <>
                                                Send Inquiry
                                                <Send className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>

                                    {state.errors && (
                                        <motion.p 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-red-500 text-xs font-syne font-bold uppercase tracking-widest text-center mt-4 flex items-center justify-center gap-2"
                                        >
                                            <AlertCircle className="w-4 h-4" />
                                            Submission failed. Please verify your details or contact directly via email.
                                        </motion.p>
                                    )}
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </main>
    );
}
