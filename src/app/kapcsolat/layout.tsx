import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Kapcsolat – Kérj Ingyenes Ajánlatot Weboldal Készítésre",
  description:
    "Weboldalt szeretnél, ami valóban hoz ügyfeleket? Töltsd ki az űrlapot és kérj ingyenes ajánlatot. Válaszolunk 3-5 munkanapon belül.",
  openGraph: {
    title: "Kapcsolat | Optimaai",
    description:
      "Kérj ingyenes ajánlatot weboldal készítésre, AI automatizációra vagy ingatlan marketingre.",
    url: "https://optimaai.eu/kapcsolat",
  },
  alternates: {
    canonical: "https://optimaai.eu/kapcsolat",
  },
};

export default function KapcsolatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Főoldal", url: "https://optimaai.eu" },
          { name: "Kapcsolat", url: "https://optimaai.eu/kapcsolat" },
        ]}
      />
      {children}
    </>
  );
}
