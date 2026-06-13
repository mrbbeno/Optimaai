import React from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, XCircle, Target, ArrowRight } from "lucide-react";
import { researchArticles } from "@/lib/researchData";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// SEO: Dinamikus metadata generálás minden research cikkhez
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = researchArticles.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: "Cikk nem található",
    };
  }

  return {
    title: article.title,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      url: `https://lab.optimaai.eu/research/${article.slug}`,
      siteName: "OPTIMA LAB",
      type: "article",
      locale: "hu_HU",
      images: [
        {
          url: "/Optimaai_logo.png",
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.summary,
      images: ["/Optimaai_logo.png"],
    },
    alternates: {
      canonical: `https://lab.optimaai.eu/research/${article.slug}`,
    },
  };
}

// SEO: Pre-render minden research cikk URL-jét build time-ban — kritikus az indexeléshez
export async function generateStaticParams() {
  return researchArticles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ResearchArticlePage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const article = researchArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const renderContent = (items: string[]) => (
    <div className="flex flex-col gap-4">
      {items.map((item, i) => {
        const isBullet = item.startsWith('- ');
        const text = isBullet ? item.substring(2) : item;
        return (
          <div key={i} className={`font-sans text-[16px] text-neutral-700 font-light leading-relaxed ${isBullet ? 'flex items-start gap-3 pl-2 md:pl-4' : ''}`}>
            {isBullet && <span className="shrink-0 w-1 h-1 rounded-full bg-neutral-300 mt-2.5" />}
            <span>{text}</span>
          </div>
        );
      })}
    </div>
  );

  return (
    <main className="w-full min-h-screen bg-[#FBFBFD] flex flex-col relative pb-32">
      {/* Navbar / Top bar */}
      <div className="w-full max-w-[800px] mx-auto px-6 py-8 md:py-12 flex items-center justify-between">
        <Link 
          href="/lab#research" 
          className="group flex items-center gap-2 font-mono text-[11px] text-neutral-500 hover:text-neutral-900 uppercase tracking-widest transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Lab
        </Link>
        <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest border border-neutral-200 px-3 py-1 rounded-full bg-white">
          {article.category}
        </span>
      </div>

      {/* Article Container */}
      <article className="w-full max-w-[800px] mx-auto px-6 flex flex-col gap-16 mt-8">
        
        {/* Header */}
        <header className="flex flex-col gap-6 border-b border-neutral-200/60 pb-12">
          <h1 className="font-sans text-[36px] md:text-[48px] leading-[1.1] font-medium text-neutral-950 tracking-tight">
            {article.title}
          </h1>
          <div className="flex flex-col gap-4">
            <p className="font-sans text-[18px] text-neutral-500 font-light leading-relaxed">
              {article.summary}
            </p>
            <span className="font-mono text-[11px] text-neutral-400">
              Published on {article.date}
            </span>
          </div>
        </header>

        {/* Content Blocks */}
        <div className="flex flex-col gap-16">
          
          {/* Hypothesis */}
          <section className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-neutral-400" />
              <h2 className="font-sans text-[14px] font-medium text-neutral-900 uppercase tracking-widest">A kihívás & Hipotézis</h2>
            </div>
            {renderContent(article.hypothesis)}
          </section>

          {/* Achievements */}
          <section className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-neutral-400" />
              <h2 className="font-sans text-[14px] font-medium text-neutral-900 uppercase tracking-widest">Mit értünk el? (Sikerek)</h2>
            </div>
            {renderContent(article.achievements)}
          </section>

          {/* Limitations / What didn't work */}
          <section className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-neutral-400" />
              <h2 className="font-sans text-[14px] font-medium text-neutral-900 uppercase tracking-widest">Mi nem működött? (Kudarcok & Korlátok)</h2>
            </div>
            {renderContent(article.limitations)}
          </section>

          {/* Next Steps */}
          <section className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-neutral-400" />
              <h2 className="font-sans text-[14px] font-medium text-neutral-900 uppercase tracking-widest">Hogyan tovább?</h2>
            </div>
            {renderContent(article.nextSteps)}
          </section>

        </div>
      </article>
    </main>
  );
}
