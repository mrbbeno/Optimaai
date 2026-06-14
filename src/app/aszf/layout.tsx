import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Általános Szerződési Feltételek",
  description:
    "Az Optimaai Általános Szerződési Feltételei.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AszfLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
