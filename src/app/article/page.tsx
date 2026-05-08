"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ArticleClient from "./ArticleClient";

function ArticleContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id") || "";
    const type = searchParams.get("type") || "blogs";

    return <ArticleClient id={id} type={type} />;
}

export default function ArticlePage() {
    return (
        <main className="min-h-screen py-32 px-6 sm:px-10 max-w-7xl mx-auto relative z-20">
            <Suspense fallback={<div className="text-center py-32 text-[#1a1a1a]/40 font-syne font-bold uppercase tracking-widest text-sm animate-pulse">Loading...</div>}>
                <ArticleContent />
            </Suspense>
        </main>
    );
}
