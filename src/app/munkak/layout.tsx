import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Referenciák – Korábbi Webfejlesztési Projektjeink",
  description:
    "Nézd meg korábbi projektjeinket: egyedi weboldalak, ingatlan marketing platformok és foglalási rendszerek. Valós eredmények, valós ügyfelek.",
  openGraph: {
    title: "Referenciáink | Optimaai",
    description:
      "Egyedi weboldalak, ingatlan marketing platformok és foglalási rendszerek — valós eredmények.",
    url: "https://optimaai.eu/munkak",
  },
  alternates: {
    canonical: "https://optimaai.eu/munkak",
  },
};

export default function MunkakLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Főoldal", url: "https://optimaai.eu" },
          { name: "Munkáink", url: "https://optimaai.eu/munkak" },
        ]}
      />
      {children}
    </>
  );
}
