import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About",
    description: "Learn more about Hareram Kushwaha, a final-year Computer Science Engineering student (Semester VII) at KPRIET, Full Stack Developer, and Systems Architect.",
    alternates: {
        canonical: "/about",
    },
    openGraph: {
        title: "About | Hareram Kushwaha",
        description: "Learn more about Hareram Kushwaha, a final-year Computer Science Engineering student (Semester VII) at KPRIET, Full Stack Developer, and Problem Solver.",
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
