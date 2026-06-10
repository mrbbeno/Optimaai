export interface ResearchArticle {
  slug: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  hypothesis: string[];
  achievements: string[];
  limitations: string[];
  nextSteps: string[];
}

export const researchArticles: ResearchArticle[] = [
  {
    slug: "ai-agent-architecture",
    title: "Hogyan épül egy modern AI Agent?",
    date: "2026.06.01",
    category: "Architecture",
    summary: "Részletes áttekintés a modern autonóm ágensek architektúrájáról és a mögöttük álló technológiákról.",
    hypothesis: [
      "Egy központi orchestrátor ágens képes hatékonyan delegálni a részfeladatokat specializált al-ágenseknek (sub-agents).",
      "Az eszközök (tools) natív integrációja a rendszerbe megbízhatóbb kimenetet eredményez, mint a puszta prompt-mérnökség."
    ],
    achievements: [
      "Sikeresen implementáltunk egy stabil orchestrátor réteget, ami dinamikusan választja ki a megfelelő eszközt (pl. web scraping, fájl írás).",
      "Az al-ágensek (sub-agents) képesek önállóan lefuttatni a feladataikat és visszajelentést adni a fő ágensnek anélkül, hogy megszakítanák a fő folyamatot.",
      "Az átlagos válaszadási és feladatmegoldási idő 40%-kal csökkent a párhuzamosításnak köszönhetően."
    ],
    limitations: [
      "Túl hosszú kontextus (100k+ token) esetén a LLM hajlamos volt elfelejteni a kezdeti instrukiókat (lost in the middle jelenség).",
      "A komplex matematikai vagy nagyon kötött formátumú logikai feladatoknál még mindig gyakori a hallucináció, ami emberi validációt igényel.",
      "Az API hívások sebességkorlátozásai (rate limits) többször megakasztották az autonóm folyamatot."
    ],
    nextSteps: [
      "A memóriakezelés optimalizálása vektor adatbázisok (Pinecone/Qdrant) használatával a hosszú távú emlékezet (long-term memory) kialakításához.",
      "Fejlett hiba-helyreállítási (error recovery) mechanizmusok beépítése az ágensek közé."
    ]
  },
  {
    slug: "rag-vs-finetuning",
    title: "RAG vs Fine-Tuning: Melyiket válasszuk?",
    date: "2026.05.24",
    category: "Machine Learning",
    summary: "Összehasonlítás: mikor melyik technológiát érdemes használni vállalati környezetben.",
    hypothesis: [
      "A vállalati belső tudásbázisok kezelésére a RAG (Retrieval-Augmented Generation) költséghatékonyabb és skálázhatóbb, mint a folyamatos Fine-Tuning.",
      "A RAG képes a napi szinten frissülő adatokat is azonnal hasznosítani, ellentétben a betanított modellekkel."
    ],
    achievements: [
      "A RAG rendszerünkkel elértük a 95%-os pontosságú tudáskeresést komplex, több ezer oldalas jogi és technikai dokumentumokból.",
      "Az üzemeltetési költségek a töredékére csökkentek a Fine-Tuning folyamatok elhagyásával.",
      "Sikerült implementálni egy hibrid keresést (szemantikus + kulcsszavas), ami drasztikusan javította a találati arányt specifikus iparági kifejezéseknél."
    ],
    limitations: [
      "A RAG nagyon érzékeny az adat-előkészítésre (chunking stratégiák). A rosszul tördelt szövegek értelmetlen válaszokat generáltak.",
      "Nagy adatmennyiségnél a szemantikus keresés késleltetése (latency) megnőtt, ami rontotta a valós idejű chat-élményt.",
      "A Fine-Tuninghoz képest a RAG nem képes a modell 'stílusát' vagy alapvető viselkedését megváltoztatni, csak információt ad hozzá."
    ],
    nextSteps: [
      "Graph RAG (Knowledge Graphs) technológiák tesztelése a bonyolult, több entitást érintő összefüggések jobb megértéséhez.",
      "A chunking stratégiák automatizálása LLM segítségével (semantic chunking)."
    ]
  },
  {
    slug: "ai-automation-smb",
    title: "AI automatizáció kisvállalkozásoknak",
    date: "2026.05.10",
    category: "Case Study",
    summary: "Esettanulmányok és gyakorlati lépések az AI bevezetéséhez kkv-k számára.",
    hypothesis: [
      "A kisvállalkozások napi adminisztratív feladatainak (ügyfélszolgálat, lead minősítés, ajánlatkészítés) legalább 60%-a teljesen automatizálható AI eszközökkel.",
      "Nincs szükség drága, egyedi fejlesztésekre; no-code eszközök (n8n, Make) és AI API-k kombinációjával is robusztus rendszerek építhetők."
    ],
    achievements: [
      "Több ügyfelünknél napi átlagosan 2 óra adminisztrációs időt spóroltunk meg automatizált e-mail feldolgozó és lead-minősítő rendszerekkel.",
      "Sikeresen integráltuk a meglévő elavult CRM rendszereket (webhookok és API-k segítségével) modern LLM motorokkal.",
      "Az automatizált rendszerek hibátlanul generáltak személyre szabott árajánlatokat az előre megadott árlisták és paraméterek alapján."
    ],
    limitations: [
      "A teljesen ember nélküli (100% autonóm) működés illúzió. A bonyolult, kivételeket tartalmazó ügyfélkéréseknél az AI gyakran rosszul döntött.",
      "A Human-in-the-loop (emberi felügyelet) megkerülhetetlen az e-mailek kiküldése előtt, különben a reputáció sérülhet.",
      "Az ügyfelek jelentős részénél hiányoztak az alapvető strukturált adatok (pl. normális adatbázisok), ami nélkül az AI nem tudott miből dolgozni."
    ],
    nextSteps: [
      "Szabványosított 'AI-ready' adat-audit csomagok kidolgozása KKV-k számára az automatizáció nulladik lépéseként.",
      "Olyan felhasználói felületek (dashboardok) fejlesztése, ahol az ügyfél egy kattintással hagyhatja jóvá vagy módosíthatja az AI által előkészített válaszokat."
    ]
  },
  {
    slug: "future-of-ai-business",
    title: "Az AI-alapú vállalkozások jövője",
    date: "2026.04.28",
    category: "Vision",
    summary: "Trendek, víziók és stratégiai irányok a következő 5 évre.",
    hypothesis: [
      "A jövő tech cégeiben a fejlesztői munka nagy részét kódgeneráló ágensek végzik majd, az emberek feladata az architektúra tervezése és az irányítás (prompting) marad.",
      "Az egyetlen masszív AI modell helyett a szoftverek egy hálózatnyi apró, specializált ágensből fognak állni (Multi-Agent Systems)."
    ],
    achievements: [
      "Kísérleti jelleggel elindítottunk több projektet, ahol a kódolás 80%-át autonóm ágensekre bíztuk (vázlat, tesztek, alap logikák).",
      "Bizonyítottuk, hogy több apró prompt és kisebb, specializált modell együttműködése sokkal stabilabb és gyorsabb kimenetet ad, mint egyetlen hatalmas prompt használata."
    ],
    limitations: [
      "A jelenlegi technológia még nem elég stabil ahhoz, hogy a termékfejlesztést teljesen rábízzuk. A 'hallucinált' kódok debugolása néha több időt vett igénybe, mint maga a kódolás lett volna.",
      "A több ágens közötti kommunikáció (state management és szinkronizáció) jelenleg még rendkívül bonyolult és nehezen skálázható."
    ],
    nextSteps: [
      "Saját, belső használatú orchestrációs framework fejlesztése, ami megkönnyíti a specializált ágensek közötti biztonságos adatcserét.",
      "Folyamatos kísérletezés a nyílt forráskódú (open-source) helyi modellekkel az adatbiztonság és a költségcsökkentés érdekében."
    ]
  }
];
