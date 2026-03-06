import Link from 'next/link';
import DynamicProjectList from "@/components/DynamicProjectList";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projects",
    description: "A collection of systems and applications built by Hareram Kushwaha, ranging from web architectures to low-level OS experiments.",
    openGraph: {
        title: "Projects | Hareram Kushwaha",
        description: "A collection of systems and applications built by Hareram Kushwaha.",
    },
};

export default async function Projects() {
    return (
        <main className="min-h-screen bg-black text-white py-20 px-6 sm:px-10 max-w-7xl mx-auto">
            <header className="mb-8">
                <h1 className="text-5xl md:text-8xl font-black mb-8 bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
                    Projects
                </h1>
                <p className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed font-light">
                    A collection of systems and applications I&apos;ve built, ranging from web architectures to low-level OS experiments.
                </p>
            </header>

            <DynamicProjectList />

            <footer className="mt-32 pt-20 border-t border-gray-900 text-center">
                <p className="text-gray-500 text-lg">
                    More projects can be found on my <Link href={`https://github.com/ha-re-ram`} target="_blank" className="text-gray-300 hover:text-white transition-colors underline underline-offset-8 decoration-gray-800 hover:decoration-blue-500">GitHub profile</Link>.
                </p>
            </footer>
        </main>
    );
}
