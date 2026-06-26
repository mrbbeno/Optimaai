import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./cue.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

import CueStructuredData from "@/components/CueStructuredData";

export const metadata: Metadata = {
  title: "Cue by OptimaAI — Async Dev Subscription | $2,495/mo",
  description: "Get async web development delivered in 48 hours. One request at a time, no meetings, no estimates. Next.js, React, Supabase, APIs. Pause or cancel anytime.",
  keywords: "async dev subscription, productized development, web development subscription, async web development, no-meeting developer, Next.js developer subscription, React developer retainer, Supabase developer, API integration service, dev subscription service, Designjoy for developers, async studio, remote developer subscription",
  authors: [{ name: "OptimaAI" }],
  creator: "OptimaAI",
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  alternates: {
    canonical: "https://cue.optimaai.eu",
    languages: {
      'en': 'https://cue.optimaai.eu',
      'x-default': 'https://cue.optimaai.eu',
    },
  },
  openGraph: {
    type: "website",
    url: "https://cue.optimaai.eu",
    siteName: "Cue by OptimaAI",
    title: "Cue — Async Dev Subscription. Delivered in 48h.",
    description: "Subscribe to Cue and get focused web development delivered in 48 hours. No meetings, no estimates. Next.js, React, Supabase, APIs. $2,495/month.",
    locale: "en_US",
    images: [
      {
        url: "/og-image",
        width: 1200,
        height: 630,
        alt: "Cue by OptimaAI — Async Dev Subscription",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cue — Dev work. Delivered in 48h.",
    description: "Async dev subscription. One request at a time. No meetings. $2,495/mo.",
    images: ["/og-image"],
  },
  category: "technology",
  verification: {
    google: "gC-Zi4jcb8WOJBjnxSgvR8uO02ZmwZKd3bD2js0IpaU"
  }
};

export const viewport = {
  themeColor: "#0c0c0e",
  width: "device-width",
  initialScale: 1,
};

import CueBackgroundProvider from "@/components/CueBackgroundProvider";

export default function CueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div 
      className={`${geist.variable} ${geistMono.variable} cue-theme font-[family-name:var(--font-geist)] relative w-full z-50 bg-[#030303]`}
    >
      <CueBackgroundProvider />
      <link rel="me" href="mailto:hello@optimaai.eu" />
      <CueStructuredData />
      <div className="relative z-10 w-full flex flex-col min-h-screen bg-[#030303]">
        {children}
      </div>
    </div>
  );
}
