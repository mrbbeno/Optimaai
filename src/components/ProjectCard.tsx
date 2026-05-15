"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  category: string;
  image: string;
  href: string;
  description: string;
}

export default function ProjectCard({ title, category, image, href, description }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <Link href={href} className="block space-y-5">
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-muted border border-border/40">
          <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-900 transition-transform duration-700 group-hover:scale-[1.02]" />
          
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 font-semibold tracking-tight text-xl uppercase">
            {title}
          </div>
          
          <div className="absolute top-5 right-5 bg-background/50 backdrop-blur-md p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <ArrowUpRight size={18} />
          </div>
        </div>
        
        <div className="space-y-2 px-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-accent/80 px-2 py-0.5 rounded-full bg-accent/5 border border-accent/10">
              {category}
            </span>
          </div>
          <h3 className="text-xl font-bold tracking-tight text-foreground/90">{title}</h3>
          <p className="text-[15px] text-muted-foreground leading-relaxed line-clamp-2 font-medium">
            {description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
