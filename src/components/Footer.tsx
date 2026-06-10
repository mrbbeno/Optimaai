import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const footerLinks = [
  { name: "Főoldal", href: "/" },
  { name: "Szolgáltatások", href: "/szolgaltatasok" },
  { name: "Munkáink", href: "/munkak" },
  { name: "Optima Lab", href: "/lab" },
  { name: "Kapcsolat", href: "/kapcsolat" },
];

const legalLinks = [
  { name: "ÁSZF", href: "/aszf" },
  { name: "Adatvédelem", href: "/adatvedelem" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border px-6 md:px-12 py-12">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {/* Left: Brand */}
          <div className="flex flex-col space-y-4">
            <Link 
              href="/" 
              className="font-mono text-[13px] font-medium tracking-[0.2em] text-white"
            >
              OPTIMAAI
            </Link>
            <p className="text-[12px] text-tertiary">
              © {currentYear} Optimaai. Minden jog fenntartva.
            </p>
          </div>

          {/* Center: Navigation Table */}
          <div className="flex flex-col space-y-6 md:items-center">
            <div className="flex flex-wrap gap-x-8 gap-y-4 md:justify-center">
              {footerLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="font-ui text-[13px] text-secondary hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 md:justify-center">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="font-mono text-[10px] text-tertiary hover:text-secondary transition-colors uppercase tracking-widest"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Contact */}
          <div className="flex flex-col md:items-end space-y-4">
            <a 
              href="mailto:info@optimaai.eu" 
              className="font-mono text-[13px] text-accent hover:underline underline-offset-4"
            >
              info@optimaai.eu
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
