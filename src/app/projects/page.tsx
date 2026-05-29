import Link from 'next/link';
import DynamicProjectList from "@/components/DynamicProjectList";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projects",
    description: "Explore the technical projects built by Hareram Kushwaha, including full stack applications, web architectures, and system engineering experiments.",
    alternates: {
        canonical: "/projects",
    },
    openGraph: {
        title: "Projects | Hareram Kushwaha",
        description: "Explore the technical projects built by Hareram Kushwaha.",
        url: "https://hareramkushwaha.name.np/projects",
        type: "website",
    },
};

export default async function Projects() {
    return (
        <main className="min-h-screen py-20 md:py-32 px-6 sm:px-10 max-w-7xl mx-auto relative z-20 text-[#1a1a1a]">
            <header className="mb-20">
                <h1 className="text-[clamp(2.5rem,10vw,5rem)] md:text-8xl lg:text-9xl font-syne font-black uppercase tracking-tighter mb-8 text-[#1a1a1a] leading-tight md:leading-none">
                    Selected <span className="font-cormorant italic font-light tracking-tight normal-case text-[clamp(2.5rem,12vw,6rem)] md:text-8xl lg:text-9xl">Projects</span>
                </h1>
                <p className="text-xl md:text-3xl font-cormorant italic text-[#4a4a4a] max-w-3xl leading-relaxed font-light">
                    A collection of systems and applications I've built, ranging from scalable web architectures to low-level OS experiments.
                </p>
            </header>

            <DynamicProjectList />

            <footer className="mt-32 pt-20 border-t border-[#1a1a1a]/10 text-center">
                <p className="text-[#4a4a4a] text-lg font-light">
                    More projects can be found on my <Link href={`https://github.com/ha-re-ram`} target="_blank" className="text-[#1a1a1a] font-syne font-bold uppercase tracking-tight hover:opacity-60 transition-opacity underline underline-offset-8 decoration-[#1a1a1a]/20 hover:decoration-[#1a1a1a]">GitHub profile</Link>.
                </p>
            </footer>
        </main>
    );
}
