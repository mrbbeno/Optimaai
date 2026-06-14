import Link from "next/link";

const footerLinks = [
  { name: "Főoldal", href: "/" },
  { name: "Optima Lab", href: "https://lab.optimaai.eu" },
  { name: "Kapcsolat", href: "/kapcsolat" },
];

const legalLinks = [
  { name: "ÁSZF", href: "/aszf" },
  { name: "Adatvédelem", href: "/adatvedelem" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-black/5 bg-[#FBFBFD] pt-16 flex flex-col mt-auto relative z-10">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 w-full">
        <div className="flex flex-col gap-2">
          <span className="font-inter font-medium text-[15px] tracking-tight text-neutral-900">
            OPTIMAAI
          </span>
          <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
            © {currentYear} — all rights reserved
          </span>
        </div>
        <div className="flex flex-wrap gap-x-10 gap-y-4">
          <a
            href="mailto:info@optimaai.eu"
            className="font-inter text-[13px] text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            info@optimaai.eu
          </a>
          {footerLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-inter text-[13px] text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          {legalLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-inter text-[13px] text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="w-full max-w-[1200px] mx-auto mt-24 px-6 pb-8 opacity-[0.03] pointer-events-none select-none">
        <svg
          className="w-full h-auto"
          viewBox="0 0 1000 180"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <text
            x="50%"
            y="55%"
            dominantBaseline="middle"
            textAnchor="middle"
            className="font-inter font-bold"
            fontSize="190"
            letterSpacing="0.02em"
            fill="#1D1D1F"
          >
            OPTIMAAI
          </text>
        </svg>
      </div>
    </footer>
  );
}
