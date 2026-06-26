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

export const metadata: Metadata = {
  title: "Cue by OptimaAI | Async Dev Subscription",
  description: "Dev work. Delivered in 48h.",
  robots: {
    index: false,
    follow: false,
  }
};

export default function CueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div 
      className={`${geist.variable} ${geistMono.variable} cue-theme font-[family-name:var(--font-geist)] relative w-full z-50`}
    >
      <div className="relative z-10 w-full flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
}
