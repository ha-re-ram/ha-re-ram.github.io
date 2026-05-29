import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Article",
    description: "Read detailed deep-dives and software engineering articles by Hareram Kushwaha.",
    alternates: {
        canonical: "/article",
    },
    openGraph: {
        title: "Article | Hareram Kushwaha",
        description: "Read detailed deep-dives and software engineering articles by Hareram Kushwaha.",
        url: "https://hareramkushwaha.name.np/article",
        type: "article",
    },
};

export default function ArticleLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
