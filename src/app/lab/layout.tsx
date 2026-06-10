import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "OPTIMA LAB | Experimental UI & Motion Playground",
  description: "A digital playground for interfaces, motion, and experiments by OPTIMA. Apple-level minimalism meets playful motion design.",
  openGraph: {
    title: "OPTIMA LAB | Experimental UI & Motion Playground",
    description: "A digital playground for interfaces, motion, and experiments by OPTIMA.",
    url: "https://lab.optimaai.eu",
    siteName: "OPTIMA LAB",
    images: [
      {
        url: "/Optimaai_logo.png",
        width: 1200,
        height: 630,
        alt: "OPTIMA LAB",
      },
    ],
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
