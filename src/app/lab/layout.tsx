import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { LabPerformanceProvider } from "@/context/LabPerformanceContext";
import { ThemeProvider } from "next-themes";
import ThemeSync from "@/components/lab/ThemeSync";
import SoftAurora from "@/components/lab/SoftAurora";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: '#FBFBFD',
  colorScheme: 'light',
};

export const metadata: Metadata = {
  title: {
    default: "OPTIMAAI LAB | Experimental UI & Motion Playground",
    template: "%s | OPTIMAAI LAB",
  },
  description: "A digital playground for interfaces, motion, and experiments by Optimaai. Apple-level minimalism meets playful motion design.",
  keywords: ["optimaai", "optima ai", "optimaai lab", "optima lab", "experimental UI", "motion playground", "react animations", "web development"],
  openGraph: {
    title: "OPTIMAAI LAB | Experimental UI & Motion Playground",
    description: "A digital playground for interfaces, motion, and experiments by Optimaai.",
    url: "https://lab.optimaai.eu",
    siteName: "OPTIMAAI LAB",
    locale: "hu_HU",
    type: "website",
    images: [
      {
        url: "/Optimaai_logo.png",
        width: 1200,
        height: 630,
        alt: "OPTIMAAI LAB — Experimental UI & Motion Playground",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OPTIMAAI LAB | Experimental UI & Motion Playground",
    description: "A digital playground for interfaces, motion, and experiments by Optimaai.",
    images: ["/Optimaai_logo.png"],
  },
  alternates: {
    canonical: "https://lab.optimaai.eu",
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
};

export default function LabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <LabPerformanceProvider>
        <ThemeSync />
        <div 
          className={`${inter.variable} min-h-screen bg-[#FBFBFD] text-[#1D1D1F] dark:text-[#F5F5F7] selection:bg-neutral-200 selection:text-black relative w-full`}
          style={{
            fontFamily: 'var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
          }}
        >
          {/* Subtle grid texture overlay scoped to the lab */}
          <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03] mix-blend-difference" 
               style={{
                 backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                 backgroundSize: '80px 80px'
               }} 
          />
          
          {/* Global slow-moving gradient blobs (decorative, light theme) clipped to bounds */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Animated Soft Aurora at the top of the page */}
            <div className="absolute top-0 left-0 w-full h-[90vh] opacity-35 pointer-events-none">
              <SoftAurora
                speed={0.6}
                scale={1.5}
                brightness={1.0}
                color1="#f7f7f7"
                color2="#e100ff"
                noiseFrequency={2.5}
                noiseAmplitude={1.0}
                bandHeight={0.5}
                bandSpread={1.0}
                octaveDecay={0.1}
                layerOffset={0}
                colorSpeed={1.0}
                enableMouseInteraction={true}
                mouseInfluence={0.25}
              />
            </div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] aspect-square rounded-full bg-radial from-amber-50/40 via-rose-50/20 to-transparent blur-3xl" />
          </div>

          <div className="relative z-10 w-full flex flex-col min-h-screen">
            {children}
          </div>
        </div>
      </LabPerformanceProvider>
    </ThemeProvider>
  );
}
