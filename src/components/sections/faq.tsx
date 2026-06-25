import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const faqData = [
  {
    question: "Mennyi egy egyedi weboldal ára Budapesten?",
    answer:
      "Az egyedi weboldal ára a komplexitástól függ. Egy alap bemutatkozó oldal 150–300 ezer forinttól indul, egy összetettebb, rendszerintegrációkkal ellátott platform 400 ezer forint felett kezdődik. Minden projekt egyedi árajánlattal indul, amit ingyenes konzultáció előz meg.",
  },
  {
    question: "Miben különbözik egy Next.js weboldal a WordPresstől?",
    answer:
      "A Next.js alapú weboldal szerver-oldali rendereléssel és statikus generálással dolgozik — ez 2–5x gyorsabb betöltést, jobb Google-helyezést és magasabb biztonságot jelent a WordPresshez képest. Nincs szükség pluginekre, frissítésekre, vagy biztonsági foltozásra.",
  },
  {
    question: "Mikor éri meg AI automatizációt bevezetni egy KKV-nak?",
    answer:
      "Ha a csapat heti 5+ órát tölt ismétlődő feladatokkal — ügyfélkommunikáció, foglaláskezelés, számlázás, emlékeztetők küldése — akkor az AI automatizáció jellemzően 2–4 hónapon belül megtérül. Olyan vállalkozásoknak ajánljuk, ahol a folyamatok már léteznek, csak épp emberek végzik őket.",
  },
  {
    question: "Mennyit tart egy weboldal elkészítése?",
    answer:
      "Egy alap projekt 2–3 hét alatt élesedik. Összetettebb rendszereknél (pl. foglalási rendszer, CRM integráció, többnyelvű oldal) 4–6 héttel számolunk. Az első héten már látod a működő prototípust.",
  },
  {
    question: "Kell-e meglévő weboldal az együttműködéshez?",
    answer:
      "Nem. Új projektet és meglévő oldal teljes újraépítését egyaránt vállaljuk. Ingyenes audittal kezdünk, ahol feltérképezzük a jelenlegi helyzetet és megmutatjuk, mit érdemes megtartani.",
  },
];

export default function FAQ() {
  return (
    <section className="px-6 md:px-12 py-32 bg-surface z-10 relative border-t border-border/40" id="gyik">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24 items-start">
          
          {/* Cím és leírás rész - "Sticky" marad görgetéskor asztali nézetben */}
          <div className="sticky top-32">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-black font-display mb-6">
              FAQ<span className="text-blue-600">.</span>
            </h2>
            <p className="text-lg text-black/70 font-ui max-w-[320px] leading-relaxed">
              Minden, amit a közös munkáról és a megoldásainkról tudnod kell. Ha nem találod a választ, keress minket bátran!
            </p>
          </div>

          {/* Harmonika rész */}
          <div className="w-full">
            <Accordion type="single" collapsible defaultValue="item-0" className="space-y-4">
              {faqData.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="relative border border-border/60 bg-white overflow-hidden rounded-[4px] px-6 md:px-8 transition-all duration-500 ease-out hover:border-border data-[state=open]:border-blue-500/10 data-[state=open]:shadow-[0_0_30px_rgba(37,99,235,0.06)] data-[state=open]:z-10 group"
                >
                  <AccordionTrigger className="text-[1.1rem] md:text-xl font-medium text-black font-display hover:no-underline py-6 md:py-8 text-left transition-colors duration-500">
                    {faq.question}
                  </AccordionTrigger>
                  
                  <AccordionContent className="text-black/80 font-ui leading-relaxed pb-8 pt-2 border-t border-border/10 text-base md:text-lg transition-opacity duration-500 delay-100 data-[state=closed]:opacity-0 data-[state=open]:opacity-100">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

        </div>
      </div>
    </section>
  );
}
