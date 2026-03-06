import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About",
    description: "Learn more about Hareram Kushwaha, a passionate software engineer and lifelong learner focusing on scalable systems and continuous improvement.",
    openGraph: {
        title: "About | Hareram Kushwaha",
        description: "Learn more about Hareram Kushwaha, a passionate software engineer.",
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
