import DynamicBlogList from "@/components/DynamicBlogList";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog",
    description: "Read the latest tech articles, tutorials, and computer science engineering insights by Hareram Kushwaha.",
    alternates: {
        canonical: "/blog",
    },
    openGraph: {
        title: "Blog | Hareram Kushwaha",
        description: "Read the latest tech articles and computer science insights by Hareram Kushwaha.",
        url: "https://hareramkushwaha.name.np/blog",
        type: "website",
    },
};

export default function Blog() {
    return (
        <main className="min-h-screen pt-32 p-10 max-w-5xl mx-auto relative z-20 text-[#1a1a1a]">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-syne font-black mb-12 uppercase tracking-tighter text-[#1a1a1a]">
                Writings & <span className="font-cormorant italic font-light lowercase">Insights</span>
            </h1>
            <DynamicBlogList />
        </main>
    );
}
