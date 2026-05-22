"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { cn } from "@/lib/utils";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5 + i * 0.15,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as any,
    },
  }),
};

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="relative">
        <div className="grid-texture fixed inset-0 pointer-events-none z-0" />

        {/* HERO SECTION - REVERTED */}
        <section className="relative min-h-[100svh] w-full px-6 md:px-12 z-10 overflow-hidden flex flex-col">
          <div className="mx-auto max-w-[1440px] w-full h-full flex flex-col pt-[20vh] md:pt-[24vh]">

            <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center w-full">
              {/* Main Headline */}
              <h1 className="mt-0">
                {["Rendszerek,", "amelyek", "teljesítenek."].map((text, i) => (
                  <motion.span
                    key={text}
                    custom={i}
                    initial="initial"
                    animate="animate"
                    variants={fadeInUp}
                    className={cn(
                      "block font-display text-[72px] sm:text-[84px] md:text-[108px] leading-[0.95] tracking-[-0.02em] text-primary",
                      i === 1 && "italic"
                    )}
                  >
                    {text}
                  </motion.span>
                ))}
              </h1>

              {/* Floating text - Desktop right */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                className="mt-12 md:mt-2 max-w-[320px]"
              >
                <p className="font-ui text-[14px] md:text-[15px] leading-[1.7] text-secondary">
                  Prémium weboldalakat, AI automatizációs rendszereket és ingatlan marketing platformokat fejlesztünk — sablon nélkül.
                </p>
                <Link href="/kapcsolat" className="btn-cta mt-6 md:mt-8 inline-block">
                  Projekt indítása →
                </Link>
              </motion.div>
            </div>

            {/* Hero Bottom Bar */}
            <div className="mt-24 md:mt-auto pb-0 md:pb-0 md:absolute md:bottom-12 left-0 right-0 flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center w-full max-w-[1440px] mx-0 md:mx-auto gap-8 md:gap-0">
              <div className="flex w-full justify-start md:w-auto gap-8 md:gap-16 items-center">
                {[
                  { value: "34+", label: "Leszállított rendszer" },
                  { value: "3×", label: "Átlagos ügyfél-ROI" },
                  { value: "2024", label: "Alapítva" },
                ].map((item, i) => (
                  <div
                    key={item.label}
                    className={cn(
                      "flex items-center gap-8 md:gap-16",
                      i === 2 && "hidden md:flex"
                    )}
                  >
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-[24px] md:text-[28px] text-primary">{item.value}</span>
                      <span className="label-mono !text-[12px] text-secondary uppercase">{item.label}</span>
                    </div>
                    {i < 1 && <span className="text-border h-8 w-[1px] hidden md:block" />}
                  </div>
                ))}
              </div>

            </div>

          </div>
        </section>

        {/* ABOUT SECTION (00) - KEPT FROM PREVIOUS REQUEST */}
        <section className="relative w-full border-t border-border py-[40px] md:py-[160px] px-6 md:px-12 z-10 bg-bg">
          <div className="mx-auto max-w-[1440px] grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-[80px] items-start">

            {/* Left Column */}
            <div className="lg:sticky lg:top-[120px] flex flex-col">
              <div className="flex flex-col">
                <span className="font-mono text-[11px] text-tertiary tracking-[0.15em]">— 00 —</span>
                <span className="font-mono text-[11px] text-tertiary tracking-[0.15em] uppercase mt-1">RÓLUNK</span>
              </div>
              <h2 className="mt-[40px] font-display text-[48px] text-primary leading-[1.0]">
                Optimaai
              </h2>
              <p className="mt-[16px] font-mono text-[13px] text-accent">
                Budapest, 2024 óta.
              </p>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-[40px]">
              <p className="font-ui text-[18px] font-[300] leading-[1.8] text-primary">
                Az Optimaai egy prémium digitális rendszereket fejlesztő stúdió. Nem ügynökség, nem szabadúszó csapat — egy célzott műhely, amely komplex digitális rendszereket épít az első naptól az utolsóig.
              </p>
              <p className="font-ui text-[16px] font-[300] leading-[1.8] text-secondary">
                Minden projektet az üzleti eredményből tervezünk visszafelé. A technológia eszköz, nem cél. A dizájn kommunikáció, nem dekoráció. A kód infrastruktúra, nem termék.
              </p>
              <p className="font-ui text-[16px] font-[300] leading-[1.8] text-secondary">
                Nem csak ügyfélprojekteket fejlesztünk. A GoStayDirect — a saját direkt foglalási platformunk Balaton-parti nyaralóknak — bizonyítja, hogy a rendszereinket mi magunk is használjuk és hiszünk bennük.
              </p>

              {/* Short facts table */}
              <div className="mt-2 border-t border-border">
                {[
                  { label: "Alapítva", value: "2024" },
                  { label: "Helyszín", value: "Budapest, Magyarország" },
                  { label: "Csapatméret", value: "Kis, célzott műhely" },
                  { label: "Specializáció", value: "Web · AI · Ingatlan platformok" },
                ].map((item) => (
                  <div key={item.label} className="grid grid-cols-[1fr_1fr] py-[20px] border-b border-border items-center">
                    <span className="font-mono text-[11px] text-tertiary tracking-[0.1em] uppercase">{item.label}</span>
                    <span className="font-ui text-[14px] text-primary">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* SERVICES TABLE SECTION (01) */}
        <section className="relative w-full border-t border-border py-[100px] md:py-[160px] px-6 md:px-12 z-10">
          <div className="mx-auto max-w-[1440px]">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-0 mb-20 border-b border-border pb-8">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[11px] text-tertiary tracking-[0.15em]">— 01 —</span>
                <span className="font-mono text-[11px] text-tertiary tracking-[0.15em] uppercase">AMIT ÉPÍTÜNK</span>
              </div>
              <Link href="/szolgaltatasok" className="font-ui text-[13px] text-secondary hover:text-accent transition-colors flex items-center gap-2">
                Részletekért látogasd meg a Szolgáltatások oldalt →
              </Link>
            </div>

            {/* Table Rows */}
            <div className="flex flex-col">
              {[
                {
                  id: "01",
                  title: "Prémium Webrendszerek",
                  desc: "Egyedi kódbázisú weboldalak, amelyek rangsorolnak, konvertálnak és az üzleti infrastruktúra részei.",
                  tech: "Next.js · TypeScript · Figma"
                },
                {
                  id: "02",
                  title: "AI Automatizációs Rendszerek",
                  desc: "Üzleti folyamatok automatizálása — lead-kezeléstől az ajánlatgeneráláson át az ügyfélkommunikációig.",
                  tech: "Make · OpenAI · n8n"
                },
                {
                  id: "03",
                  title: "Ingatlan Marketing Platformok",
                  desc: "Foglalási rendszereket, fejlesztői funnelokat és property landing oldalak, amelyek az érdeklődőt vásárlóvá konvertálják.",
                  tech: "CRM · Booking API · SEO"
                }
              ].map((service) => (
                <div
                  key={service.id}
                  className="group grid grid-cols-1 md:grid-cols-[80px_1fr_2fr_1.5fr] items-center gap-6 md:gap-12 py-10 border-b border-border transition-colors duration-200 hover:bg-surface px-4 -mx-4"
                >
                  <span className="font-mono text-[12px] text-tertiary">{service.id}</span>
                  <h3 className="font-display text-[32px] text-primary group-hover:text-accent transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="font-ui text-[14px] text-secondary leading-relaxed">
                    {service.desc}
                  </p>
                  <span className="font-mono text-[11px] text-tertiary text-right md:text-left">
                    {service.tech}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED PROJECTS SECTION (02) */}
        <section className="relative w-full py-[100px] md:py-[160px] px-6 md:px-12 z-10 border-t border-border bg-bg">
          <div className="mx-auto max-w-[1440px]">
            {/* Header */}
            <div className="flex items-center gap-4 mb-24">
              <span className="font-mono text-[11px] text-tertiary tracking-[0.15em]">— 02 —</span>
              <span className="font-mono text-[11px] text-tertiary tracking-[0.15em] uppercase">KIEMELT PROJEKTEK</span>
            </div>

            {/* Project 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-20 items-center mb-40">
              <div className="flex flex-col gap-8">
                <span className="label-mono !text-[10px] text-secondary tracking-[0.12em]">INGATLANFEJLESZTÉS · MARKETING RENDSZER</span>
                <h3 className="font-display text-[48px] md:text-[52px] leading-[1.0] text-primary">Sárhegyi Panoráma Lakópark</h3>
                <p className="font-ui text-[16px] md:text-[18px] font-[300] text-secondary leading-[1.8] max-w-[540px]">
                  Teljeskörű digitális arculat és értékesítési platform. Egyedi webdizájnt, integrált analytics rendszert és automatizált lead-kezelő folyamatokat építettünk fel, amelyek segítik a lakópark hatékony értékesítését.
                </p>
                <Link href="/munkak" className="font-mono text-[12px] text-accent hover:underline underline-offset-8">
                  Projekt részletei →
                </Link>
              </div>
              <div className="flex flex-col gap-10 lg:pl-20">
                {[
                  { value: "Full", label: "Weboldal, Design & Analytics" },
                  { value: "3 hét", label: "Teljes rendszer leszállítása" },
                  { value: "Auto", label: "Lead kvalifikáció" },
                ].map((m) => (
                  <div key={m.label} className="flex flex-col border-b border-border pb-4 last:border-0">
                    <span className="font-mono text-[48px] md:text-[56px] text-primary leading-tight">{m.value}</span>
                    <span className="font-ui text-[12px] text-secondary">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Project 2 - Inverted (GoStayDirect) */}
            <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-20 items-center mb-40">
              <div className="flex flex-col gap-10 lg:pr-20 order-2 lg:order-1">
                {[
                  { value: "0%", label: "OTA jutalék" },
                  { value: "2×", label: "Profitmarzs növekedés" },
                  { value: "Saját", label: "CRM és ügyfélbázis" },
                ].map((m) => (
                  <div key={m.label} className="flex flex-col border-b border-border pb-4 last:border-0">
                    <span className="font-mono text-[48px] md:text-[56px] text-primary leading-tight">{m.value}</span>
                    <span className="font-ui text-[12px] text-secondary">{m.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-8 order-1 lg:order-2">
                <span className="label-mono !text-[10px] text-secondary tracking-[0.12em]">SAJÁT TERMÉK · FOGLALÁSI PLATFORM</span>
                <h3 className="font-display text-[48px] md:text-[52px] leading-[1.0] text-primary">GoStayDirect</h3>
                <p className="font-ui text-[16px] md:text-[18px] font-[300] text-secondary leading-[1.8] max-w-[540px]">
                  A GoStayDirect az Optimaai saját terméke — egy direkt foglalási platform, amelyet mi magunk fejlesztettünk és üzemeltetünk Balaton-parti nyaralók tulajdonosainak. Az OTA-platformok (Airbnb, Booking.com) kihagyásával a tulajdonosok magasabb profitmarzzsal, saját ügyfélbázissal és teljes adatfelügyelettel működhetnek.
                </p>
                <Link href="/munkak" className="font-mono text-[12px] text-accent hover:underline underline-offset-8">
                  Projekt részletei →
                </Link>
              </div>
            </div>

            {/* Project 3 */}
            <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-20 items-center">
              <div className="flex flex-col gap-8">
                <span className="label-mono !text-[10px] text-secondary tracking-[0.12em]">EGÉSZSÉGÜGY · WEBOLDAL + ARCULAT</span>
                <h3 className="font-display text-[48px] md:text-[52px] leading-[1.0] text-primary">Aranykereszt.hu</h3>
                <p className="font-ui text-[16px] md:text-[18px] font-[300] text-secondary leading-[1.8] max-w-[540px]">
                  Prémium digitális arculatfrissítés és egyedi fejlesztésű, páciensfókuszú weboldal. A projekt célja a szolgáltatások letisztult bemutatása és a digitális bizalomépítés modernizálása volt.
                </p>
                <Link href="/munkak" className="font-mono text-[12px] text-accent hover:underline underline-offset-8">
                  Projekt részletei →
                </Link>
              </div>
              <div className="flex flex-col gap-10 lg:pl-20">
                {[
                  { value: "100%", label: "Egyedi tervezés" },
                  { value: "Saját", label: "Arculati rendszer" },
                  { value: "Gyors", label: "Betöltési sebesség" },
                ].map((m) => (
                  <div key={m.label} className="flex flex-col border-b border-border pb-4 last:border-0">
                    <span className="font-mono text-[48px] md:text-[56px] text-primary leading-tight">{m.value}</span>
                    <span className="font-ui text-[12px] text-secondary">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="relative w-full h-[100vh] flex flex-col items-center justify-center text-center px-6 z-10 bg-bg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
            className="flex flex-col items-center"
          >
            <h2 className="font-display text-[64px] md:text-[80px] font-[800] text-primary leading-[1.0] max-w-[800px]">
              Van egy projekted? <br /> Írj nekünk.
            </h2>
            <p className="mt-10 font-ui text-[17px] font-[300] text-secondary max-w-[420px] mx-auto leading-relaxed">
              Nem telefonálunk, nem sürgetünk. <br />
              Töltsd ki az űrlapot — mi elvégezzük a többit.
            </p>
            <div className="mt-12 flex flex-col items-center gap-8">
              <Link href="/kapcsolat" className="bg-accent text-bg font-ui text-[15px] font-[500] px-[40px] py-[16px] rounded-[4px] hover:brightness-[1.12] transition-all">
                Kapcsolatfelvétel →
              </Link>
              <Link href="/munkak" className="text-secondary font-ui text-[14px] hover:text-primary underline underline-offset-4 transition-colors">
                Munkáink megtekintése
              </Link>
            </div>
            <p className="mt-12 font-mono text-[11px] text-tertiary uppercase tracking-[0.1em]">
              Válasz 3–5 munkanapon belül. Emailben.
            </p>
          </motion.div>
        </section>

      </main>

      <Footer />
    </>
  );
}
