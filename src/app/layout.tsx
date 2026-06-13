import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono, Caveat, EB_Garamond, Dancing_Script } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const scriptFont = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-script",
});

const serifFont = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-serif",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dancing",
});

import { CookieConsentProvider } from "@/context/CookieConsentContext";
import CookieBanner from "@/components/CookieBanner";
import GoogleAnalyticsWrapper from "@/components/GoogleAnalyticsWrapper";
import {
  OrganizationJsonLd,
  WebSiteJsonLd,
  LocalBusinessJsonLd,
} from "@/components/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL("https://optimaai.eu"),
  title: {
    default: "Optimaai | Weboldal Készítés & AI Automatizáció Budapest",
    template: "%s | Optimaai",
  },
  description:
    "Egyedi weboldal készítés és AI automatizáció vállalkozásoknak Budapesten. Nem sablonból dolgozunk — minden projektet az üzleti céljaidhoz tervezünk.",
  keywords: [
    "weboldal készítés",
    "webfejlesztés",
    "weboldal készítés Budapest",
    "egyedi weboldal",
    "céges weboldal",
    "webdesign",
    "AI automatizáció",
    "weboldal árak",
    "landing oldal készítés",
    "weboldal fejlesztés",
    "ingatlan marketing",
    "prémium weboldal",
  ],
  authors: [{ name: "Optimaai" }],
  creator: "Optimaai",
  publisher: "Optimaai",
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
    locale: "hu_HU",
    url: "https://optimaai.eu",
    siteName: "Optimaai",
    title: "Optimaai | Weboldal Készítés & AI Automatizáció Budapest",
    description:
      "Egyedi weboldal készítés és AI automatizáció vállalkozásoknak Budapesten. Nem sablonból dolgozunk — minden projektet az üzleti céljaidhoz tervezünk.",
    images: [
      {
        url: "/Optimaai_logo.png",
        width: 1200,
        height: 630,
        alt: "Optimaai — Weboldal Készítés & AI Automatizáció",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Optimaai | Weboldal Készítés & AI Automatizáció Budapest",
    description:
      "Egyedi weboldal készítés és AI automatizáció vállalkozásoknak Budapesten.",
    images: ["/Optimaai_logo.png"],
  },
  alternates: {
    canonical: "https://optimaai.eu",
  },
  icons: {
    icon: "/Optimaai_logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hu" suppressHydrationWarning className={`scroll-smooth ${inter.variable} ${plexMono.variable} ${scriptFont.variable} ${serifFont.variable} ${dancingScript.variable}`}>
      <body className="min-h-screen relative font-ui text-primary bg-bg antialiased">
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <LocalBusinessJsonLd />
        <CookieConsentProvider>
          <GoogleAnalyticsWrapper />
          <CookieBanner />
          {children}
        </CookieConsentProvider>
      </body>
    </html>
  );
}
