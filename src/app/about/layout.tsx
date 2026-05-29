import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About",
    description: "Learn more about Hareram Kushwaha, a passionate Computer Science student, Full Stack Developer, and Problem Solver dedicated to building high-performance systems.",
    alternates: {
        canonical: "/about",
    },
    openGraph: {
        title: "About | Hareram Kushwaha",
        description: "Learn more about Hareram Kushwaha, a passionate Computer Science student, Full Stack Developer, and Problem Solver.",
        url: "https://hareramkushwaha.com.np/about",
        type: "profile",
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
