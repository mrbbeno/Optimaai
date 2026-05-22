import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Adatkezelési Tájékoztató",
  description:
    "Az Optimaai adatkezelési tájékoztatója — GDPR-kompatibilis adatvédelmi szabályzat.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdatvedelemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
