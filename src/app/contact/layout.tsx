import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact",
    description: "Get in touch with Hareram Kushwaha for collaborations, full stack project opportunities, or technical engineering queries.",
    alternates: {
        canonical: "/contact",
    },
    openGraph: {
        title: "Contact | Hareram Kushwaha",
        description: "Get in touch with Hareram Kushwaha.",
        url: "https://hareramkushwaha.name.np/contact",
        type: "website",
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
