"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Adatvedelem() {
  return (
    <>
      <Navbar />
      
      <main className="relative">
        <div className="grid-texture fixed inset-0 pointer-events-none z-0" />

        {/* HEADER */}
        <section className="relative px-6 md:px-12 pt-[120px] md:pt-[160px] pb-[60px] md:pb-[80px] z-10">
          <div className="mx-auto max-w-[1440px]">
            <span className="font-mono text-[10px] md:text-[11px] text-muted-foreground tracking-[0.15em] uppercase">JOGI DOKUMENTUM</span>
            <h1 className="mt-4 font-bold text-[32px] md:text-[72px] font-extrabold text-foreground leading-[1.1] md:leading-[1.0] break-words [hyphens:auto]">
              Adatkezelési tájékoztató
            </h1>
            <div className="mt-8 flex flex-col md:flex-row gap-4 md:gap-8">
              <span className="font-mono text-[11px] md:text-[12px] text-muted-foreground">Hatályos: 2025. január 1-től</span>
              <span className="font-mono text-[11px] md:text-[12px] text-muted-foreground">Optimaai Stúdió</span>
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="relative px-6 md:px-12 pb-[100px] md:pb-[160px] z-10">
          <div className="mx-auto max-w-[1440px]">
            <div className="max-w-[720px] border-t border-border pt-10 md:pt-12">
              
              <h2 className="font-bold text-[18px] md:text-[22px] font-bold text-foreground mt-12 md:mt-16 mb-5 uppercase tracking-wide">1. Az adatkezelő adatai</h2>
              <ul className="space-y-2 mb-4">
                <li className=" text-[16px] font-light text-muted-foreground flex items-start">
                  <span className="text-accent mr-2">—</span> Név: Optimaai
                </li>
                <li className=" text-[16px] font-light text-muted-foreground flex items-start">
                  <span className="text-accent mr-2">—</span> Székhely: Budapest, Magyarország
                </li>
                <li className=" text-[16px] font-light text-muted-foreground flex items-start">
                  <span className="text-accent mr-2">—</span> Kapcsolat: info@optimaai.eu
                </li>
              </ul>

              <h2 className="font-bold text-[18px] md:text-[22px] font-bold text-foreground mt-12 md:mt-16 mb-5 uppercase tracking-wide">2. Az adatkezelés alapelvei</h2>
              <p className=" text-[16px] font-light text-muted-foreground leading-[1.8] mb-4">
                Az Optimaai személyes adatokat kizárólag az alábbi elvek szerint kezel:
              </p>
              <ul className="space-y-2 mb-4">
                <li className=" text-[16px] font-light text-muted-foreground flex items-start">
                  <span className="text-accent mr-2">—</span> Jogszerűség: adatokat csak jogalap megléte esetén kezelünk
                </li>
                <li className=" text-[16px] font-light text-muted-foreground flex items-start">
                  <span className="text-accent mr-2">—</span> Célhoz kötöttség: az adatokat csak a megjelölt célra használjuk
                </li>
                <li className=" text-[16px] font-light text-muted-foreground flex items-start">
                  <span className="text-accent mr-2">—</span> Adattakarékosság: csak a szükséges minimumot kezeljük
                </li>
                <li className=" text-[16px] font-light text-muted-foreground flex items-start">
                  <span className="text-accent mr-2">—</span> Pontosság: az elavult adatokat töröljük vagy helyesbítjük
                </li>
                <li className=" text-[16px] font-light text-muted-foreground flex items-start">
                  <span className="text-accent mr-2">—</span> Korlátozott tárolás: az adatokat csak szükséges ideig tartjuk
                </li>
              </ul>

              <h2 className="font-bold text-[18px] md:text-[22px] font-bold text-foreground mt-12 md:mt-16 mb-5 uppercase tracking-wide">3. Kezelt adatok és céljuk</h2>
              
              <h3 className=" text-[16px] md:text-[18px] font-medium text-foreground mt-8 mb-4">3.1 Kapcsolatfelvételi űrlap</h3>
              <p className=" text-[16px] font-light text-muted-foreground leading-[1.8] mb-2">
                <strong>Kezelt adatok:</strong> név, email cím, cégnév (opcionális), projekt leírás
              </p>
              <p className=" text-[16px] font-light text-muted-foreground leading-[1.8] mb-2">
                <strong>Cél:</strong> az érdeklődő megkeresésének megválaszolása, projektegyeztetés
              </p>
              <p className=" text-[16px] font-light text-muted-foreground leading-[1.8] mb-2">
                <strong>Jogalap:</strong> az érintett hozzájárulása (GDPR 6. cikk (1) bekezdés a) pont)
              </p>
              <p className=" text-[16px] font-light text-muted-foreground leading-[1.8] mb-6">
                <strong>Tárolás időtartama:</strong> az érdeklődéstől számított 2 év, illetve az üzleti kapcsolat megszűnéséig
              </p>

              <h3 className=" text-[16px] md:text-[18px] font-medium text-foreground mt-8 mb-4">3.2 Google Analytics (statisztikai sütik)</h3>
              <p className=" text-[16px] font-light text-muted-foreground leading-[1.8] mb-2">
                <strong>Kezelt adatok:</strong> anonimizált látogatói adatok (oldalmegtekintések, tartózkodási idő, forgalmi forrás)
              </p>
              <p className=" text-[16px] font-light text-muted-foreground leading-[1.8] mb-2">
                <strong>Cél:</strong> a weboldal látogatottságának és teljesítményének mérése
              </p>
              <p className=" text-[16px] font-light text-muted-foreground leading-[1.8] mb-2">
                <strong>Jogalap:</strong> az érintett hozzájárulása (GDPR 6. cikk (1) bekezdés a) pont)
              </p>
              <p className=" text-[16px] font-light text-muted-foreground leading-[1.8] mb-2">
                <strong>Adatkezelő:</strong> Google Ireland Limited — adatvédelmi tájékoztató: <a href="https://policies.google.com/privacy" className="text-accent hover:underline">policies.google.com/privacy</a>
              </p>
              <p className=" text-[16px] font-light text-muted-foreground leading-[1.8] mb-2">
                <strong>Tárolás időtartama:</strong> 26 hónap (Google Analytics alapértelmezett)
              </p>
              <p className=" text-[16px] font-light text-muted-foreground leading-[1.8] mb-6 italic">
                Megjegyzés: a Google Analytics csak akkor aktiválódik, ha a felhasználó a cookie bannerben ehhez hozzájárult. Az IP-cím anonimizálva kerül rögzítésre.
              </p>

              <h3 className=" text-[16px] md:text-[18px] font-medium text-foreground mt-8 mb-4">3.3 Technikai (szükséges) sütik</h3>
              <p className=" text-[16px] font-light text-muted-foreground leading-[1.8] mb-2">
                <strong>Kezelt adatok:</strong> cookie hozzájárulás állapota (localStorage)
              </p>
              <p className=" text-[16px] font-light text-muted-foreground leading-[1.8] mb-2">
                <strong>Cél:</strong> a felhasználó cookie döntésének megjegyzése
              </p>
              <p className=" text-[16px] font-light text-muted-foreground leading-[1.8] mb-2">
                <strong>Jogalap:</strong> jogos érdek — az oldal GDPR-megfelelőségéhez szükséges
              </p>
              <p className=" text-[16px] font-light text-muted-foreground leading-[1.8] mb-6">
                <strong>Tárolás időtartama:</strong> 12 hónap
              </p>

              <h2 className="font-bold text-[18px] md:text-[22px] font-bold text-foreground mt-12 md:mt-16 mb-5 uppercase tracking-wide">4. Adattovábbítás</h2>
              <p className=" text-[16px] font-light text-muted-foreground leading-[1.8] mb-4">
                Az Optimaai személyes adatokat harmadik félnek nem ad el és nem ad át, kivéve:
              </p>
              <ul className="space-y-2 mb-4">
                <li className=" text-[16px] font-light text-muted-foreground flex items-start">
                  <span className="text-accent mr-2">—</span> Google LLC: Google Analytics statisztikai adatok (csak hozzájárulás esetén)
                </li>
                <li className=" text-[16px] font-light text-muted-foreground flex items-start">
                  <span className="text-accent mr-2">—</span> Hosting szolgáltató: a weboldal üzemeltetéséhez szükséges mértékben
                </li>
              </ul>
              <p className=" text-[16px] font-light text-muted-foreground leading-[1.8] mb-4">
                Minden adattovábbítás az EU adatvédelmi szabályainak megfelelően történik.
              </p>

              <h2 className="font-bold text-[18px] md:text-[22px] font-bold text-foreground mt-12 md:mt-16 mb-5 uppercase tracking-wide">5. Az érintett jogai</h2>
              <p className=" text-[16px] font-light text-muted-foreground leading-[1.8] mb-4">
                GDPR alapján az érintett jogosult:
              </p>
              <ul className="space-y-2 mb-4">
                <li className=" text-[16px] font-light text-muted-foreground flex items-start">
                  <span className="text-accent mr-2">—</span> Hozzáférési jog: tájékoztatást kérhet a kezelt adatokról
                </li>
                <li className=" text-[16px] font-light text-muted-foreground flex items-start">
                  <span className="text-accent mr-2">—</span> Helyesbítési jog: pontatlan adatai kijavítását kérheti
                </li>
                <li className=" text-[16px] font-light text-muted-foreground flex items-start">
                  <span className="text-accent mr-2">—</span> Törlési jog: kérheti adatai törlését („elfelejtéshez való jog")
                </li>
                <li className=" text-[16px] font-light text-muted-foreground flex items-start">
                  <span className="text-accent mr-2">—</span> Korlátozási jog: kérheti az adatkezelés korlátozását
                </li>
                <li className=" text-[16px] font-light text-muted-foreground flex items-start">
                  <span className="text-accent mr-2">—</span> Tiltakozási jog: tiltakozhat az adatkezelés ellen
                </li>
                <li className=" text-[16px] font-light text-muted-foreground flex items-start">
                  <span className="text-accent mr-2">—</span> Hordozhatósági jog: géppel olvasható formátumban kérheti adatait
                </li>
              </ul>
              <p className=" text-[16px] font-light text-muted-foreground leading-[1.8] mb-4">
                Jogai gyakorlásához írjon a <strong>info@optimaai.eu</strong> email címre. A kérésre 30 napon belül válaszolunk.
              </p>

              <h2 className="font-bold text-[18px] md:text-[22px] font-bold text-foreground mt-12 md:mt-16 mb-5 uppercase tracking-wide">6. Sütik kezelése</h2>
              <p className=" text-[16px] font-light text-muted-foreground leading-[1.8] mb-4">
                Az oldalon kétféle süti működik:
              </p>
              <p className=" text-[16px] font-light text-muted-foreground leading-[1.8] mb-4">
                <strong>Szükséges sütik</strong> — ezek mindig aktívak, beleegyezés nélkül is, mert az oldal működéséhez elengedhetetlenek. Ide tartozik a cookie hozzájárulás tárolása.
              </p>
              <p className=" text-[16px] font-light text-muted-foreground leading-[1.8] mb-4">
                <strong>Statisztikai sütik (Google Analytics)</strong> — csak akkor aktiválódnak, ha a cookie bannerben a „Elfogadom" gombra kattintasz. Ezek segítenek megérteni, hogyan használják az oldalt a látogatók. Döntésedet bármikor visszavonhatod: töröld a böngésződ sütiket, és az oldal következő látogatásakor újra megkérdezzük.
              </p>

              <h2 className="font-bold text-[22px] font-bold text-foreground mt-16 mb-5 uppercase tracking-wide">7. Adatbiztonság</h2>
              <p className=" text-[16px] font-light text-muted-foreground leading-[1.8] mb-4">
                Az Optimaai megfelelő technikai és szervezési intézkedésekkel gondoskodik az adatok védelméről. Az adatokat biztonságos, titkosított kapcsolaton (HTTPS) továbbítjuk.
              </p>

              <h2 className="font-bold text-[22px] font-bold text-foreground mt-16 mb-5 uppercase tracking-wide">8. A tájékoztató módosítása</h2>
              <p className=" text-[16px] font-light text-muted-foreground leading-[1.8] mb-4">
                Az Optimaai fenntartja a jogot a tájékoztató módosítására. A módosított verzió az oldalon való közzétételkor lép hatályba. Lényeges változás esetén a cookie banneren keresztül értesítjük a látogatókat.
              </p>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
