"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Aszf() {
  return (
    <>
      <Navbar />
      
      <main className="relative">
        <div className="grid-texture fixed inset-0 pointer-events-none z-0" />

        {/* HEADER */}
        <section className="relative px-6 md:px-12 pt-[160px] pb-[80px] z-10">
          <div className="mx-auto max-w-[1440px]">
            <span className="font-mono text-[11px] text-tertiary tracking-[0.15em] uppercase">JOGI DOKUMENTUM</span>
            <h1 className="mt-4 font-syne text-[56px] md:text-[72px] font-extrabold text-primary leading-[1.0]">
              Általános Szerződési Feltételek
            </h1>
            <div className="mt-8 flex gap-8">
              <span className="font-mono text-[12px] text-tertiary">Hatályos: 2025. január 1-től</span>
              <span className="font-mono text-[12px] text-tertiary">Optimaai Stúdió</span>
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="relative px-6 md:px-12 pb-[160px] z-10">
          <div className="mx-auto max-w-[1440px]">
            <div className="max-w-[720px] border-t border-border pt-12">
              
              <h2 className="font-syne text-[22px] font-bold text-primary mt-16 mb-5 uppercase tracking-wide">1. Az ÁSZF hatálya és tárgya</h2>
              <p className="font-ui text-[16px] font-light text-secondary leading-[1.8] mb-4">
                Jelen Általános Szerződési Feltételek az Optimaai (székhely: Budapest, Magyarország; továbbiakban: „Szolgáltató") által nyújtott digitális fejlesztési és tanácsadási szolgáltatásokra vonatkoznak.
              </p>
              <p className="font-ui text-[16px] font-light text-secondary leading-[1.8] mb-4">
                Az ÁSZF elfogadása a megrendelési folyamat részeként történik. A megrendelés leadásával a Megrendelő kijelenti, hogy az ÁSZF tartalmát megismerte és elfogadja.
              </p>

              <h2 className="font-syne text-[22px] font-bold text-primary mt-16 mb-5 uppercase tracking-wide">2. A Szolgáltató adatai</h2>
              <ul className="space-y-2">
                <li className="font-ui text-[16px] font-light text-secondary flex items-start">
                  <span className="text-accent mr-2">—</span> Név: Optimaai
                </li>
                <li className="font-ui text-[16px] font-light text-secondary flex items-start">
                  <span className="text-accent mr-2">—</span> Székhely: Budapest, Magyarország
                </li>
                <li className="font-ui text-[16px] font-light text-secondary flex items-start">
                  <span className="text-accent mr-2">—</span> Kapcsolat: info@optimaai.eu
                </li>
                <li className="font-ui text-[16px] font-light text-secondary flex items-start">
                  <span className="text-accent mr-2">—</span> Tevékenység: webfejlesztés, digitális rendszertervezés, AI automatizáció
                </li>
              </ul>

              <h2 className="font-syne text-[22px] font-bold text-primary mt-16 mb-5 uppercase tracking-wide">3. A szolgáltatások köre</h2>
              <p className="font-ui text-[16px] font-light text-secondary leading-[1.8] mb-4">
                A Szolgáltató az alábbi tevékenységeket végzi:
              </p>
              <ul className="space-y-2 mb-4">
                <li className="font-ui text-[16px] font-light text-secondary flex items-start">
                  <span className="text-accent mr-2">—</span> Egyedi weboldalak és webrendszerek tervezése és fejlesztése
                </li>
                <li className="font-ui text-[16px] font-light text-secondary flex items-start">
                  <span className="text-accent mr-2">—</span> AI alapú automatizációs rendszerek tervezése és implementációja
                </li>
                <li className="font-ui text-[16px] font-light text-secondary flex items-start">
                  <span className="text-accent mr-2">—</span> Ingatlan marketing platformok és foglalási rendszerek fejlesztése
                </li>
                <li className="font-ui text-[16px] font-light text-secondary flex items-start">
                  <span className="text-accent mr-2">—</span> Digitális stratégiai tanácsadás
                </li>
              </ul>
              <p className="font-ui text-[16px] font-light text-secondary leading-[1.8] mb-4">
                Minden projekt egyedi megrendelés alapján, írásos megállapodással kerül elvégzésre.
              </p>

              <h2 className="font-syne text-[22px] font-bold text-primary mt-16 mb-5 uppercase tracking-wide">4. A szerződés létrejötte</h2>
              <p className="font-ui text-[16px] font-light text-secondary leading-[1.8] mb-4">
                A szerződés a Megrendelő által benyújtott projektűrlap vagy emailes megkeresés, valamint a Szolgáltató által küldött írásos ajánlat Megrendelő általi elfogadásával jön létre. A szóbeli megállapodások csak írásban megerősítve érvényesek.
              </p>

              <h2 className="font-syne text-[22px] font-bold text-primary mt-16 mb-5 uppercase tracking-wide">5. Árak és fizetési feltételek</h2>
              <p className="font-ui text-[16px] font-light text-secondary leading-[1.8] mb-4">
                Az árak minden esetben egyedi ajánlatban kerülnek meghatározásra, forintban (HUF) kifejezve. Az ajánlat 30 napig érvényes, kivéve ha az ajánlatban más szerepel.
              </p>
              <p className="font-ui text-[16px] font-light text-secondary leading-[1.8] mb-4">
                A fizetés általános menete:
              </p>
              <ul className="space-y-2 mb-4">
                <li className="font-ui text-[16px] font-light text-secondary flex items-start">
                  <span className="text-accent mr-2">—</span> 30% előleg a projekt indításakor
                </li>
                <li className="font-ui text-[16px] font-light text-secondary flex items-start">
                  <span className="text-accent mr-2">—</span> 70% a projekt átadásakor
                </li>
              </ul>
              <p className="font-ui text-[16px] font-light text-secondary leading-[1.8] mb-4">
                Késedelmes fizetés esetén a Szolgáltató jogosult a projekt munkálatait felfüggeszteni.
              </p>

              <h2 className="font-syne text-[22px] font-bold text-primary mt-16 mb-5 uppercase tracking-wide">6. Teljesítési határidők</h2>
              <p className="font-ui text-[16px] font-light text-secondary leading-[1.8] mb-4">
                A vállalt határidők az írásos megállapodásban szerepelnek. A Megrendelő általi késedelmes tartalom- vagy visszajelzés-szolgáltatás a határidőt arányosan meghosszabbítja.
              </p>

              <h2 className="font-syne text-[22px] font-bold text-primary mt-16 mb-5 uppercase tracking-wide">7. Megrendelő kötelezettségei</h2>
              <p className="font-ui text-[16px] font-light text-secondary leading-[1.8] mb-4">
                A Megrendelő köteles:
              </p>
              <ul className="space-y-2 mb-4">
                <li className="font-ui text-[16px] font-light text-secondary flex items-start">
                  <span className="text-accent mr-2">—</span> Az elvégzéshez szükséges anyagokat, hozzáféréseket időben biztosítani
                </li>
                <li className="font-ui text-[16px] font-light text-secondary flex items-start">
                  <span className="text-accent mr-2">—</span> A visszajelzéseket az egyeztetett ütemterv szerint megadni
                </li>
                <li className="font-ui text-[16px] font-light text-secondary flex items-start">
                  <span className="text-accent mr-2">—</span> A fejlesztési környezethez szükséges hozzáféréseket (hosting, domain stb.) biztosítani
                </li>
              </ul>

              <h2 className="font-syne text-[22px] font-bold text-primary mt-16 mb-5 uppercase tracking-wide">8. Szellemi tulajdon</h2>
              <p className="font-ui text-[16px] font-light text-secondary leading-[1.8] mb-4">
                A projekt átadásával és a teljes ellenérték megfizetésével az elkészített egyedi kód és design a Megrendelő tulajdonába kerül. A fejlesztés során felhasznált, harmadik féltől származó komponensek, könyvtárak és eszközök saját licenszük alatt maradnak.
              </p>
              <p className="font-ui text-[16px] font-light text-secondary leading-[1.8] mb-4">
                A Szolgáltató fenntartja a jogot, hogy a projektet (a Megrendelő hozzájárulásával) referencia célból megjelenítse.
              </p>

              <h2 className="font-syne text-[22px] font-bold text-primary mt-16 mb-5 uppercase tracking-wide">9. Titoktartás</h2>
              <p className="font-ui text-[16px] font-light text-secondary leading-[1.8] mb-4">
                Mindkét fél kötelezettséget vállal arra, hogy a másik fél üzleti titkait, belső folyamatait és a projekt során megismert bizalmas információkat harmadik félnek nem adja át.
              </p>

              <h2 className="font-syne text-[22px] font-bold text-primary mt-16 mb-5 uppercase tracking-wide">10. Felelősségkorlátozás</h2>
              <p className="font-ui text-[16px] font-light text-secondary leading-[1.8] mb-4">
                A Szolgáltató felelőssége a megrendelés értékének 100%-ára korlátozódik. A Szolgáltató nem felelős a Megrendelő oldalán felmerülő közvetett károkért (elmaradt bevétel, üzleti veszteség stb.).
              </p>

              <h2 className="font-syne text-[22px] font-bold text-primary mt-16 mb-5 uppercase tracking-wide">11. Elállás és felmondás</h2>
              <p className="font-ui text-[16px] font-light text-secondary leading-[1.8] mb-4">
                A Megrendelő a projekt indítása előtt bármikor elállhat, az előleg visszafizetési kötelezettség nélkül. A projekt megkezdése után a Megrendelő az elvégzett munkák arányos díjának megfizetésével mondhat fel.
              </p>
              <p className="font-ui text-[16px] font-light text-secondary leading-[1.8] mb-4">
                A Szolgáltató szerződésszegés esetén (pl. tartós fizetési késedelem) jogosult a szerződést azonnali hatállyal felmondani.
              </p>

              <h2 className="font-syne text-[22px] font-bold text-primary mt-16 mb-5 uppercase tracking-wide">12. Vitarendezés</h2>
              <p className="font-ui text-[16px] font-light text-secondary leading-[1.8] mb-4">
                A felek jogvita esetén elsősorban tárgyalásos úton kísérlik meg a megoldást. Ennek sikertelensége esetén a hatáskörrel és illetékességgel rendelkező magyar bíróság jár el. Irányadó jog: magyar jog.
              </p>

              <h2 className="font-syne text-[22px] font-bold text-primary mt-16 mb-5 uppercase tracking-wide">13. Az ÁSZF módosítása</h2>
              <p className="font-ui text-[16px] font-light text-secondary leading-[1.8] mb-4">
                A Szolgáltató fenntartja a jogot az ÁSZF módosítására. A módosított ÁSZF az oldalon való közzétételkor lép hatályba, és csak az azt követő új megrendelésekre vonatkozik.
              </p>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
