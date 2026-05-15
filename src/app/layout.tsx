import type { Metadata } from "next";
import { Instrument_Serif, IBM_Plex_Sans, IBM_Plex_Mono, Syne } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-ui",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

import { CookieConsentProvider } from "@/context/CookieConsentContext";
import CookieBanner from "@/components/CookieBanner";
import GoogleAnalyticsWrapper from "@/components/GoogleAnalyticsWrapper";

export const metadata: Metadata = {
  title: "Optimaai | Prémium Webfejlesztés, AI Automatizáció & Ingatlan Marketing",
  description: "Az Optimaai prémium weboldalakat, AI automatizációs rendszereket és ingatlan marketing platformokat fejleszt Budapesten. Egyedi fejlesztés, mérhető eredmények.",
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
    <html lang="hu" className={`${instrumentSerif.variable} ${syne.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <body className="min-h-screen">
        <CookieConsentProvider>
          <GoogleAnalyticsWrapper />
          <CookieBanner />
          {children}
        </CookieConsentProvider>
      </body>
    </html>
  );
}
