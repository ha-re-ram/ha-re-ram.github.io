import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Syne } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TerminalEasterEgg from "@/components/TerminalEasterEgg";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ['normal', 'italic'],
  variable: "--font-cormorant"
});
const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne"
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: [
    "Hareram Kushwaha",
    "Computer Science Engineering",
    "Full-Stack Developer",
    "Systems Architect",
    "Problem Solver",
    "Software Engineer",
    "Next.js 15 Portfolio",
    "React 19 Developer",
    "TypeScript Architect",
    "Scalable Web Systems",
    "High-Performance Frontend",
    "Firebase Realtime CMS",
    "Interactive UI/UX Design",
    "Creative Tech Portfolio",
    "Nepalese Software Engineer",
    "Modern Bento Grid WebApp",
    "Framer Motion Animations",
    "Algorithms & Data Structures",
    "Computer Science Student KPRIET"
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
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Hareram Kushwaha - Personal Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: "@" + siteConfig.social.twitter,
    images: ["/opengraph-image"],
  },
  facebook: {
    appId: "966882222222222",
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
    jobTitle: "Full Stack Developer",
    description: "Computer Science Engineering student, Full stack developer, and Problem Solver specializing in scalable backend systems and high-performance digital solutions.",
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "KPRIET"
    },
    knowsAbout: [
      "Computer Science Engineering",
      "Full Stack Development",
      "Software Engineering",
      "System Architecture",
      "Problem Solving"
    ],
    sameAs: [
      `https://github.com/${siteConfig.social.github}`,
      `https://linkedin.com/in/${siteConfig.social.linkedin}`,
      `https://twitter.com/${siteConfig.social.twitter}`,
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${cormorant.variable} ${syne.variable} font-sans bg-[#E5D5D0] text-[#1a1a1a] antialiased min-h-screen relative`} suppressHydrationWarning>
        <div className="noise"></div>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-RGPNNZDK7Z"
        />
        <script
          id="google-analytics"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-RGPNNZDK7Z');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <div className="pt-16 md:pt-0">{children}</div>
        <Footer />
        <TerminalEasterEgg />
      </body>
    </html>
  );
}
