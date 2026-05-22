import type { Metadata } from "next";
import { BreadcrumbJsonLd, ServicesJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Weboldal Készítés, AI Automatizáció & Ingatlan Marketing Szolgáltatások",
  description:
    "Weboldal készítés, AI alapú üzleti automatizáció és ingatlan marketing platformok. Kérj ajánlatot és indítsd el a projekted még ma.",
  openGraph: {
    title: "Szolgáltatásaink | Optimaai",
    description:
      "Weboldal készítés, AI alapú üzleti automatizáció és ingatlan marketing platformok.",
    url: "https://optimaai.eu/szolgaltatasok",
  },
  alternates: {
    canonical: "https://optimaai.eu/szolgaltatasok",
  },
};

export default function SzolgaltatasokLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Főoldal", url: "https://optimaai.eu" },
          { name: "Szolgáltatások", url: "https://optimaai.eu/szolgaltatasok" },
        ]}
      />
      <ServicesJsonLd />
      {children}
    </>
  );
}
