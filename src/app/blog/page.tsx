import DynamicBlogList from "@/components/DynamicBlogList";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog",
    description: "Read the latest writings, insights, and thoughts on software engineering by Hareram Kushwaha.",
    openGraph: {
        title: "Blog | Hareram Kushwaha",
        description: "Read the latest writings and insights by Hareram Kushwaha.",
    },
};

export default function Blog() {
    return (
        <main className="min-h-screen p-10 max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-black mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
                Writings & Insights
            </h1>
            <DynamicBlogList />
        </main>
    );
}
