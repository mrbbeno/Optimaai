import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Hogyan Dolgozunk – Webfejlesztési Folyamat 4 Lépésben",
  description:
    "Átlátható webfejlesztési folyamat 4 fázisban: feltárás, tervezés, fejlesztés, leszállítás. Tudd meg, mire számíthatsz, ha velünk dolgozol.",
  openGraph: {
    title: "Folyamatunk | Optimaai",
    description:
      "Átlátható webfejlesztési folyamat 4 fázisban — tudd meg, mire számíthatsz.",
    url: "https://optimaai.eu/folyamat",
  },
  alternates: {
    canonical: "https://optimaai.eu/folyamat",
  },
};

export default function FolyamatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Főoldal", url: "https://optimaai.eu" },
          { name: "Folyamat", url: "https://optimaai.eu/folyamat" },
        ]}
      />
      {children}
    </>
  );
}
