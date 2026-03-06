import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Font optimization (using Geist Sans/Mono if user prefers, or system fonts)
// For now, let's keep it simple with system fonts as declared in globals.css,
// but adding metadata is key.

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,

  keywords: [
    "Hareram Kushwaha",
    "Software Engineer",
    "Computer Science",
    "Next.js",
    "React",
    "Portfolio",
    "Full-Stack Developer",
    "Web Development",
    "MERN Stack",
  ],
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: "@" + siteConfig.social.twitter,
  },
  icons: {
    icon: "/icon.svg",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author,
    image: `${siteConfig.url}/opengraph-image`,
    url: siteConfig.url,
    jobTitle: "Software Engineer",
    description: siteConfig.description,
    sameAs: [
      `https://github.com/${siteConfig.social.github}`,
      `https://linkedin.com/in/${siteConfig.social.linkedin}`,
      `https://twitter.com/${siteConfig.social.twitter}`,
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-black text-white antialiased" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/50 backdrop-blur-xl">
          <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <img src="/logo.png" alt="HA-RE-RAM Logo" className="w-12 h-12 rounded-full object-cover border border-white/10" />
            </Link>

            <div className="flex gap-8 text-sm font-medium text-gray-400">
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400 transition-colors flex items-center gap-1"
              >
                Resume
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7" /><path d="M7 7h10v10" /></svg>
              </a>
            </div>
          </nav>
        </header>

        <main>{children}</main>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
