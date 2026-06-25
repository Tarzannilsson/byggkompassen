// ============================================================================
// Byggkompassen — seed-data
// ----------------------------------------------------------------------------
// Droppa in i /data. Innehåller typer, kategorier, faser och tjänster.
// Beskrivningarna är neutrala och faktabaserade. Priser ändras ofta — där det
// inte står tydligt anges "Kontakta leverantör för pris". Verifiera alltid mot
// leverantörens sida innan publicering.
// ============================================================================

export type CategoryId =
  | "anbud-upphandling"
  | "leads-kunder"
  | "marknadsdata"
  | "projekt-tid"
  | "affarssystem"
  | "kalkyl";

export type Stage = "nystartat" | "etablerat" | "valetablerat";

export type CompanySize = "solo" | "small" | "medium" | "large";

export type Segment =
  | "rot"
  | "nybyggnation"
  | "anlaggning"
  | "installation"
  | "el"
  | "vvs";

export type Region = "hela-sverige" | "storstad" | "regional";

export type PricingModel =
  | "abonnemang"
  | "per-lead"
  | "freemium"
  | "offert"
  | "okand";

export type Service = {
  id: string;
  slug: string;
  name: string;
  logoUrl?: string;
  category: CategoryId;
  tagline: string;
  description: string;
  solves: string[];
  bestFor: {
    stages: Stage[];
    companySize: CompanySize[];
    segments: Segment[];
    regions: Region[];
  };
  pricingModel: PricingModel;
  priceNote?: string;
  strengths: string[];
  limitations: string[];
  alternativeTo?: string[];
  website: string;
  independent?: boolean;
};

// ----------------------------------------------------------------------------
// Kategorier
// ----------------------------------------------------------------------------

export const categories: { id: CategoryId; name: string; blurb: string }[] = [
  {
    id: "anbud-upphandling",
    name: "Anbud & Upphandling",
    blurb:
      "Bevaka och vinn offentliga och privata upphandlingar — hitta rätt affärer och slipp missa relevanta förfrågningar.",
  },
  {
    id: "leads-kunder",
    name: "Leads & Kundförfrågningar",
    blurb:
      "Få in jobb och kunder. Marknadsplatser där privatpersoner och företag söker hantverkare.",
  },
  {
    id: "marknadsdata",
    name: "Marknads- & Projektdata",
    blurb:
      "Insikt om byggprojekt, aktörer och marknadsläge — vem bygger vad, var och när.",
  },
  {
    id: "projekt-tid",
    name: "Projekt- & Tidshantering",
    blurb:
      "Dagbok, planering, tidrapportering och dokumentation ute på bygget.",
  },
  {
    id: "affarssystem",
    name: "Affärssystem & Administration",
    blurb:
      "Ekonomi, fakturering och ERP — håll ordning på siffror, projekt och ROT/RUT.",
  },
  {
    id: "kalkyl",
    name: "Kalkyl & Anbudsräkning",
    blurb:
      "Räkna anbud och kalkylera projekt med material- och tidsdata.",
  },
];

// ----------------------------------------------------------------------------
// Faser (den primära ingången) — vilka kategorier som prioriteras per fas
// ----------------------------------------------------------------------------

export const stages: {
  id: Stage;
  name: string;
  pitch: string;
  priorityCategories: CategoryId[];
}[] = [
  {
    id: "nystartat",
    name: "Nystartat byggföretag",
    pitch: "Precis börjat — vill få in första jobben och hålla ordning.",
    priorityCategories: ["leads-kunder", "affarssystem", "projekt-tid"],
  },
  {
    id: "etablerat",
    name: "Etablerat företag (1–5 anställda)",
    pitch:
      "Har jobb och anställda — vill jobba smartare och börja vinna upphandlingar.",
    priorityCategories: [
      "anbud-upphandling",
      "kalkyl",
      "projekt-tid",
      "affarssystem",
    ],
  },
  {
    id: "valetablerat",
    name: "Väletablerat företag",
    pitch:
      "Större organisation — vill ha försprång på marknad och upphandlingar.",
    priorityCategories: [
      "marknadsdata",
      "anbud-upphandling",
      "affarssystem",
      "projekt-tid",
    ],
  },
];

// ----------------------------------------------------------------------------
// Tjänster
// ----------------------------------------------------------------------------

export const services: Service[] = [
  // ===================== Anbud & Upphandling =====================
  {
    id: "tendium",
    slug: "tendium",
    name: "Tendium",
    category: "anbud-upphandling",
    tagline: "AI-driven bevakning och anbudsarbete mot offentlig sektor.",
    description:
      "Plattform som bevakar alla offentliga upphandlingar i Sverige (och delar av EU) och använder AI för att läsa dokument, sammanfatta krav och hjälpa team att skriva anbud i ett gemensamt arbetsflöde.",
    solves: [
      "Missar relevanta upphandlingar",
      "Tidskrävande genomläsning av långa upphandlingsdokument",
      "Spretigt anbudsarbete mellan kollegor",
    ],
    bestFor: {
      stages: ["etablerat", "valetablerat"],
      companySize: ["small", "medium", "large"],
      segments: ["nybyggnation", "anlaggning", "installation", "el", "vvs"],
      regions: ["hela-sverige"],
    },
    pricingModel: "abonnemang",
    priceNote: "Testperiod utan bindningstid finns — kontakta för pris.",
    strengths: [
      "Stark AI-funktion för att sammanfatta krav och kvalificera upphandlingar",
      "Delade bevakningsprofiler så hela teamet ser vad som granskats",
    ],
    limitations: [
      "Fokus på offentlig sektor — mindre nytta för rent privata affärer",
      "Mer värde ju mer regelbundet man lämnar anbud",
    ],
    alternativeTo: ["pabliq", "mercell", "byggfakta-tender"],
    website: "https://tendium.ai/se/",
  },
  {
    id: "pabliq",
    slug: "pabliq",
    name: "Pabliq",
    category: "anbud-upphandling",
    tagline: "Heltäckande upphandlingsbevakning till attraktivt pris.",
    description:
      "Bevakningstjänst från e-Avrop-gruppen som samlar upphandlingar från alla offentliga annonsplattformar med tillhörande dokumentation. Skräddarsydda bevakningsprofiler och stöd från profilexperter.",
    solves: [
      "Manuell bevakning av flera olika upphandlingskällor",
      "Svårt att veta vilka sökord/CPV-koder som ger rätt träffar",
      "Missar förfrågningar i sin bransch",
    ],
    bestFor: {
      stages: ["nystartat", "etablerat", "valetablerat"],
      companySize: ["solo", "small", "medium", "large"],
      segments: ["nybyggnation", "anlaggning", "installation", "el", "vvs"],
      regions: ["hela-sverige"],
    },
    pricingModel: "abonnemang",
    priceNote: "14 dagars kostnadsfri test. Marknadsför sig som prisvärt.",
    strengths: [
      "Prisvärt även för mindre leverantörer",
      "Hjälp att sätta upp bevakningsprofil ingår; tilldelningsbeslut och historik",
    ],
    limitations: [
      "Mindre AI-stöd för själva anbudsskrivandet jämfört med vissa konkurrenter",
      "Fokus på offentlig sektor",
    ],
    alternativeTo: ["tendium", "mercell"],
    website: "https://www.pabliq.se/",
  },
  {
    id: "e-avrop",
    slug: "e-avrop",
    name: "e-Avrop",
    category: "anbud-upphandling",
    tagline: "Annonsdatabas där du gratis kan söka och lämna anbud.",
    description:
      "Upphandlingsverktyg och annonsdatabas som kopplar samman offentliga inköpare och leverantörer. Att söka upphandlingar och lämna anbud är kostnadsfritt; hela processen sker digitalt.",
    solves: [
      "Komma igång med offentliga affärer utan abonnemang",
      "Lämna anbud digitalt och föra dialog med inköpare",
    ],
    bestFor: {
      stages: ["nystartat", "etablerat", "valetablerat"],
      companySize: ["solo", "small", "medium", "large"],
      segments: ["nybyggnation", "anlaggning", "installation", "el", "vvs"],
      regions: ["hela-sverige"],
    },
    pricingModel: "freemium",
    priceNote: "Gratis att söka och lämna anbud. Bevakning säljs separat (Pabliq).",
    strengths: [
      "Gratis grundfunktion — låg tröskel",
      "Kunnig support inom upphandlingsjuridik",
    ],
    limitations: [
      "Täcker främst upphandlingar i e-Avrops egen databas — för heltäckande bevakning behövs Pabliq",
    ],
    alternativeTo: ["pabliq", "tendium"],
    website: "https://info.e-avrop.com/",
  },
  {
    id: "mercell",
    slug: "mercell",
    name: "Mercell",
    category: "anbud-upphandling",
    tagline: "Nordisk plattform för upphandling och anbud.",
    description:
      "En av Nordens större aktörer för e-upphandling och anbudsbevakning, med upphandlingar från hela Norden och delar av Europa.",
    solves: [
      "Bevakning av upphandlingar i flera nordiska länder",
      "Strukturerat anbudsarbete",
    ],
    bestFor: {
      stages: ["etablerat", "valetablerat"],
      companySize: ["small", "medium", "large"],
      segments: ["nybyggnation", "anlaggning", "installation"],
      regions: ["hela-sverige"],
    },
    pricingModel: "offert",
    priceNote: "Kontakta leverantör för pris.",
    strengths: [
      "Bred nordisk täckning",
      "Etablerad aktör med stort utbud av upphandlingar",
    ],
    limitations: [
      "Kan upplevas som omfattande för ett litet företag med enbart lokala affärer",
    ],
    alternativeTo: ["tendium", "pabliq"],
    website: "https://www.mercell.com/sv-se/",
  },
  {
    id: "byggfakta-tender",
    slug: "byggfakta-tender",
    name: "Byggfakta Tender (Hubexo)",
    category: "anbud-upphandling",
    tagline: "Bevakning av offentliga byggupphandlingar.",
    description:
      "Del av Byggfakta/Hubexo med fokus på offentliga upphandlingar inom bygg. Kombinerar branschkunskap med upphandlingsbevakning.",
    solves: [
      "Bevaka offentliga byggupphandlingar specifikt",
      "Koppla upphandlingar till bredare byggmarknadsdata",
    ],
    bestFor: {
      stages: ["etablerat", "valetablerat"],
      companySize: ["small", "medium", "large"],
      segments: ["nybyggnation", "anlaggning"],
      regions: ["hela-sverige"],
    },
    pricingModel: "offert",
    priceNote: "Kontakta leverantör för pris.",
    strengths: [
      "Branschfokus på bygg",
      "Del av ett större ekosystem av byggdata",
    ],
    limitations: [
      "Smalare än rena upphandlingsplattformar om man vill täcka alla branscher",
    ],
    alternativeTo: ["tendium", "pabliq", "mercell"],
    website: "https://www.byggfaktatender.se/",
  },

  // ===================== Leads & Kundförfrågningar =====================
  {
    id: "offerta",
    slug: "offerta",
    name: "Offerta",
    category: "leads-kunder",
    tagline: "Stor svensk marknadsplats för att hitta nya kunder.",
    description:
      "Marknadsplats där privatpersoner beskriver jobb och anslutna företag kan bevaka sin bransch, kontakta kunder och lämna offerter. Du väljer själv vilka förfrågningar du svarar på.",
    solves: [
      "Hitta nya privatkundsuppdrag",
      "Fylla luckor i kalendern",
    ],
    bestFor: {
      stages: ["nystartat", "etablerat"],
      companySize: ["solo", "small", "medium"],
      segments: ["rot", "installation", "el", "vvs"],
      regions: ["hela-sverige"],
    },
    pricingModel: "per-lead",
    priceNote: "Företag betalar för att svara på förfrågningar — kontrollera aktuell modell.",
    strengths: [
      "Stort inflöde av förfrågningar",
      "Du väljer själv vilka uppdrag du nappar på",
    ],
    limitations: [
      "Samma kund jämför ofta flera företag — hög konkurrens per lead",
      "Snabb respons och tydlig profil krävs för att vinna",
    ],
    alternativeTo: ["servicefinder", "brabyggare"],
    website: "https://offerta.se/anslut-ditt-foretag/",
  },
  {
    id: "servicefinder",
    slug: "servicefinder",
    name: "Servicefinder",
    category: "leads-kunder",
    tagline: "Bred tjänstemarknad med många omdömen.",
    description:
      "Marknadsplats där kunder beskriver projekt och jämför offerter inom bygg, renovering och hantverk. Stor omdömesdatabas som hjälper kunder välja.",
    solves: [
      "Nå många typer av privatkundsprojekt",
      "Bygga upp omdömen och profil",
    ],
    bestFor: {
      stages: ["nystartat", "etablerat"],
      companySize: ["solo", "small", "medium"],
      segments: ["rot", "installation"],
      regions: ["hela-sverige"],
    },
    pricingModel: "per-lead",
    priceNote: "Företag betalar för leads — kontrollera aktuell modell.",
    strengths: [
      "Brett kategoriutbud passar företag med flera tjänster",
      "Många kundomdömen stärker förtroende",
    ],
    limitations: [
      "Breda plattformar ger mer blandade förfrågningar — kvalificering viktig",
      "Flera företag får ofta samma uppdrag",
    ],
    alternativeTo: ["offerta", "brabyggare"],
    website: "https://servicefinder.se/",
  },
  {
    id: "brabyggare",
    slug: "brabyggare",
    name: "BraByggare",
    category: "leads-kunder",
    tagline: "Offertplattform med fokus på verifierade hantverkare.",
    description:
      "Marknadsplats där kunder samlar in och jämför offerter från byggföretag, med betoning på granskade och verifierade företag, omdömen och trygghet.",
    solves: [
      "Nå kunder som värderar trygghet och kontroll",
      "Associeras med en seriös, verifierad miljö",
    ],
    bestFor: {
      stages: ["nystartat", "etablerat"],
      companySize: ["solo", "small", "medium"],
      segments: ["rot", "nybyggnation"],
      regions: ["hela-sverige"],
    },
    pricingModel: "per-lead",
    priceNote: "Kontrollera aktuell leads-/anslutningsmodell.",
    strengths: [
      "Trygghetsprofil med verifiering och omdömen",
      "Kunder kan jämföra flera företag enkelt",
    ],
    limitations: [
      "Du konkurrerar fortfarande med flera om samma kund",
      "Kräver referenser och snabb återkoppling för att sticka ut",
    ],
    alternativeTo: ["offerta", "servicefinder"],
    website: "https://www.brabyggare.se/",
  },

  // ===================== Marknads- & Projektdata =====================
  {
    id: "byggfakta-smart",
    slug: "byggfakta-smart",
    name: "Byggfakta SMART (Hubexo)",
    category: "marknadsdata",
    tagline: "Nordens största databas över byggprojekt.",
    description:
      "Projektdatabas och marknadsplattform med tiotusentals aktiva byggprojekt. Bevaka, bearbeta och analysera vem som bygger vad, var och när — filtrerbart på kategori, region och projektskede.",
    solves: [
      "Hitta byggprojekt tidigt i rätt skede",
      "Rikta sälj och marknadsföring mot rätt aktörer",
    ],
    bestFor: {
      stages: ["etablerat", "valetablerat"],
      companySize: ["small", "medium", "large"],
      segments: ["nybyggnation", "anlaggning", "installation", "el", "vvs"],
      regions: ["hela-sverige"],
    },
    pricingModel: "offert",
    priceNote: "Kontakta leverantör för pris.",
    strengths: [
      "Mycket stor täckning av projektmarknaden",
      "Kraftfulla filter och marknadsanalyser",
    ],
    limitations: [
      "Investering som lönar sig mest för företag som aktivt prospekterar projekt",
    ],
    alternativeTo: ["sverige-bygger"],
    website: "https://www.byggfakta.se/",
  },
  {
    id: "prognoscentret",
    slug: "prognoscentret",
    name: "Prognoscentret (Hubexo)",
    category: "marknadsdata",
    tagline: "Oberoende marknadsanalys och byggprognoser för Norden.",
    description:
      "Marknadsanalysföretag specialiserat på operativa och strategiska beslutsunderlag för den nordiska byggmarknaden. Prognoser 2–3 år framåt, makroanalys och datamaterial för egen analys.",
    solves: [
      "Förstå marknadsläge och konjunktur framåt",
      "Underlag för strategiska beslut och investeringar",
    ],
    bestFor: {
      stages: ["valetablerat"],
      companySize: ["medium", "large"],
      segments: ["nybyggnation", "anlaggning"],
      regions: ["hela-sverige"],
    },
    pricingModel: "offert",
    priceNote: "Kontakta leverantör för pris.",
    strengths: [
      "Oberoende och neutral marknadsbild med enhetlig metod",
      "Detaljerade prognoser per byggtyp och sektor",
    ],
    limitations: [
      "Strategiskt beslutsunderlag snarare än operativt säljverktyg",
      "Främst relevant för större aktörer och leverantörsled",
    ],
    website: "https://prognoscentret.se/",
    independent: true,
  },
  {
    id: "sverige-bygger",
    slug: "sverige-bygger",
    name: "Sverige Bygger (Hubexo)",
    category: "marknadsdata",
    tagline: "Projektdatabas och bevakning av byggmarknaden.",
    description:
      "Tjänst inom Byggfakta/Hubexo-koncernen för att bevaka och hitta byggprojekt och affärsmöjligheter på den svenska marknaden.",
    solves: [
      "Bevaka byggprojekt och aktörer",
      "Hitta nya affärsmöjligheter i projektmarknaden",
    ],
    bestFor: {
      stages: ["etablerat", "valetablerat"],
      companySize: ["small", "medium", "large"],
      segments: ["nybyggnation", "anlaggning", "installation"],
      regions: ["hela-sverige"],
    },
    pricingModel: "offert",
    priceNote: "Kontakta leverantör för pris.",
    strengths: [
      "Etablerat varumärke inom projektbevakning",
      "Del av ett stort byggdataekosystem",
    ],
    limitations: [
      "Överlappar delvis med Byggfakta SMART — jämför vad som passar behovet",
    ],
    alternativeTo: ["byggfakta-smart"],
    website: "https://www.sverigebygger.se/",
  },

  // ===================== Projekt- & Tidshantering =====================
  {
    id: "bygglet",
    slug: "bygglet",
    name: "Bygglet",
    category: "projekt-tid",
    tagline: "Branschspecifik projektledning från offert till faktura.",
    description:
      "Molnplattform byggd för hantverkare och byggföretag. Resursplanering, mobil tidrapportering, KMA-dokumentation och konvertering av offert till projekt. Del av Smartcraft-gruppen.",
    solves: [
      "Pappersrutiner och spridd projektinformation",
      "Tidrapportering ute på bygget",
      "KMA-dokumentation (kvalitet, miljö, arbetsmiljö)",
    ],
    bestFor: {
      stages: ["nystartat", "etablerat", "valetablerat"],
      companySize: ["solo", "small", "medium", "large"],
      segments: ["rot", "nybyggnation", "installation", "el", "vvs"],
      regions: ["hela-sverige"],
    },
    pricingModel: "offert",
    priceNote: "Kontakta leverantör för pris.",
    strengths: [
      "Tydligt branschfokus och hela flödet offert→faktura",
      "Bra mobilt stöd för tidrapport och dokumentation",
    ],
    limitations: [
      "Vissa funktioner kan vara överdimensionerade för enkla, repetitiva småjobb",
      "Prisnivåer kommuniceras inte alltid öppet",
    ],
    alternativeTo: ["fieldly", "byggdagboken", "smartdok"],
    website: "https://www.bygglet.com/",
  },
  {
    id: "fieldly",
    slug: "fieldly",
    name: "Fieldly",
    category: "projekt-tid",
    tagline: "Helhetslösning för fältarbete: projekt, tid och fakturaunderlag.",
    description:
      "Plattform för bygg- och installationsföretag som samlar projektstyrning, arbetsorder, tidrapportering, egenkontroller och fakturering, med integrationer mot ekonomisystem.",
    solves: [
      "Spridd information mellan arbetsplats och kontor",
      "Manuell överföring mellan system",
    ],
    bestFor: {
      stages: ["etablerat", "valetablerat"],
      companySize: ["small", "medium", "large"],
      segments: ["nybyggnation", "installation", "el", "vvs"],
      regions: ["hela-sverige"],
    },
    pricingModel: "offert",
    priceNote: "Kontakta leverantör för pris.",
    strengths: [
      "Allt-i-ett från arbetsorder till fakturaunderlag",
      "Snabb fältrapportering av tid och material",
    ],
    limitations: [
      "Mest värde för företag med personal ute i fält och flera samtidiga arbetsordrar",
    ],
    alternativeTo: ["bygglet", "smartdok"],
    website: "https://www.fieldly.com/se/",
  },
  {
    id: "byggdagboken",
    slug: "byggdagboken",
    name: "Byggdagboken",
    category: "projekt-tid",
    tagline: "Digital byggdagbok, projekt och kalkyl i ett.",
    description:
      "Verktyg för att dokumentera och planera byggprojekt med digital dagbok, samt ett kalkyl-/offertstöd för att räkna på jobb och skicka prisförslag.",
    solves: [
      "Dokumentation och dagbok ute på bygget",
      "Snabba kalkyler och offerter",
    ],
    bestFor: {
      stages: ["nystartat", "etablerat"],
      companySize: ["solo", "small", "medium"],
      segments: ["rot", "nybyggnation", "installation"],
      regions: ["hela-sverige"],
    },
    pricingModel: "abonnemang",
    priceNote: "Kontrollera aktuellt pris och paket.",
    strengths: [
      "Enkel ingång för dagbok och dokumentation",
      "Inbyggt kalkyl- och offertstöd",
    ],
    limitations: [
      "Mindre heltäckande som fullt affärssystem än renodlade ERP",
    ],
    alternativeTo: ["bygglet", "fieldly"],
    website: "https://www.byggdagboken.se/",
  },
  {
    id: "smartdok",
    slug: "smartdok",
    name: "SmartDok",
    category: "projekt-tid",
    tagline: "Molnlösning för projektstyrning och tidrapportering.",
    description:
      "Molnbaserat system för bygg- och anläggningsbranschen med projektstyrning, tidrapportering och resursallokering.",
    solves: [
      "Tidrapportering per projekt och moment",
      "Översikt över framsteg, kostnader och resurser",
    ],
    bestFor: {
      stages: ["etablerat", "valetablerat"],
      companySize: ["small", "medium", "large"],
      segments: ["nybyggnation", "anlaggning", "installation"],
      regions: ["hela-sverige"],
    },
    pricingModel: "offert",
    priceNote: "Kontakta leverantör för pris.",
    strengths: [
      "Anpassat för bygg och anläggning",
      "Bra koll på arbetad tid per projekt",
    ],
    limitations: [
      "Behöver ofta kompletteras/integreras med ekonomisystem",
    ],
    alternativeTo: ["bygglet", "fieldly"],
    website: "https://www.smartdok.com/sv/",
  },
  {
    id: "infobric",
    slug: "infobric",
    name: "Infobric",
    category: "projekt-tid",
    tagline: "Elektronisk personalliggare, ID06 och passersystem.",
    description:
      "Lösningar för elektronisk personalliggare, närvaroregistrering och åtkomstkontroll på byggarbetsplatsen — bland annat kopplat till lagkrav om personalliggare.",
    solves: [
      "Lagkrav på personalliggare",
      "Koll på vilka som är på plats och passerkontroll",
    ],
    bestFor: {
      stages: ["etablerat", "valetablerat"],
      companySize: ["small", "medium", "large"],
      segments: ["nybyggnation", "anlaggning"],
      regions: ["hela-sverige"],
    },
    pricingModel: "offert",
    priceNote: "Kontakta leverantör för pris.",
    strengths: [
      "Hjälper uppfylla lagkrav på personalliggare",
      "Kombinerar närvaro och fysisk åtkomstkontroll",
    ],
    limitations: [
      "Smalare fokus — inte ett komplett projekt- eller ekonomisystem",
    ],
    website: "https://www.infobric.com/sv/",
  },

  // ===================== Affärssystem & Administration =====================
  {
    id: "fortnox",
    slug: "fortnox",
    name: "Fortnox",
    category: "affarssystem",
    tagline: "Sveriges största ekonomisystem med många integrationer.",
    description:
      "Molnbaserat ekonomi- och faktureringssystem med stor spridning. Hundratals integrationer, inklusive flera branschverktyg för bygg som kopplar tidrapport och projekt mot fakturering och bokföring.",
    solves: [
      "Bokföring och fakturering på ett ställe",
      "Koppla projektverktyg mot ekonomin",
    ],
    bestFor: {
      stages: ["nystartat", "etablerat", "valetablerat"],
      companySize: ["solo", "small", "medium", "large"],
      segments: ["rot", "nybyggnation", "installation", "el", "vvs"],
      regions: ["hela-sverige"],
    },
    pricingModel: "abonnemang",
    priceNote: "Modulbaserat abonnemang — kontrollera aktuellt pris.",
    strengths: [
      "Mycket stort ekosystem av integrationer",
      "Skalar från enmansföretag till större bolag",
    ],
    limitations: [
      "Inte branschspecifikt för bygg i sig — kräver ofta tilläggsverktyg",
    ],
    alternativeTo: ["visma", "hantverksdata", "next", "bygglog"],
    website: "https://www.fortnox.se/",
  },
  {
    id: "visma",
    slug: "visma",
    name: "Visma",
    category: "affarssystem",
    tagline: "Brett utbud av ekonomi- och affärssystem.",
    description:
      "Stor systemleverantör med molnbaserade ekonomi- och affärssystem (t.ex. eEkonomi, Business NXT, Visma Net) som skalar från små företag till större verksamheter och integrerar mot projektsystem.",
    solves: [
      "Ekonomi och redovisning i en plattform",
      "Skala upp systemstöd när företaget växer",
    ],
    bestFor: {
      stages: ["etablerat", "valetablerat"],
      companySize: ["small", "medium", "large"],
      segments: ["nybyggnation", "anlaggning", "installation", "el", "vvs"],
      regions: ["hela-sverige"],
    },
    pricingModel: "offert",
    priceNote: "Beror på produkt och omfattning — kontakta leverantör/partner.",
    strengths: [
      "Brett produktutbud för olika storlekar",
      "Integrationer mot projekt- och tidsystem",
    ],
    limitations: [
      "Större uppsättningar kan kräva partner och implementeringsinsats",
    ],
    alternativeTo: ["fortnox", "hantverksdata", "next"],
    website: "https://www.visma.se/",
  },
  {
    id: "hantverksdata",
    slug: "hantverksdata",
    name: "Hantverksdata (Entré)",
    category: "affarssystem",
    tagline: "Affärssystem särskilt inriktat på hantverk och bygg.",
    description:
      "Leverantör av affärssystem (bl.a. Entré) anpassade för hantverks- och byggbranschen, som integrerar projektstyrning, tidrapportering och ekonomi.",
    solves: [
      "Samla projekt, tid och ekonomi i ett branschsystem",
      "Minska manuell hantering mellan delar",
    ],
    bestFor: {
      stages: ["etablerat", "valetablerat"],
      companySize: ["small", "medium", "large"],
      segments: ["installation", "el", "vvs", "nybyggnation"],
      regions: ["hela-sverige"],
    },
    pricingModel: "offert",
    priceNote: "Kontakta leverantör för pris.",
    strengths: [
      "Branschanpassat för hantverk och installation",
      "Integrerade flöden projekt → tid → ekonomi",
    ],
    limitations: [
      "Större system kräver implementering och upplärning",
    ],
    alternativeTo: ["next", "easoft", "visma"],
    website: "https://www.hantverksdata.se/",
  },
  {
    id: "next",
    slug: "next",
    name: "Next",
    category: "affarssystem",
    tagline: "ERP för projekt, order, ekonomi och lön.",
    description:
      "Affärssystem för bygg- och installationsföretag som hanterar allt från order och projektredovisning till ekonomi och lön.",
    solves: [
      "Projektredovisning och ekonomi i ett system",
      "Order- och löneflöden för projektföretag",
    ],
    bestFor: {
      stages: ["etablerat", "valetablerat"],
      companySize: ["medium", "large"],
      segments: ["nybyggnation", "anlaggning", "installation", "el", "vvs"],
      regions: ["hela-sverige"],
    },
    pricingModel: "offert",
    priceNote: "Kontakta leverantör för pris.",
    strengths: [
      "Heltäckande för projektbaserad verksamhet",
      "Order, projekt, ekonomi och lön samlat",
    ],
    limitations: [
      "Mer omfattande — passar bäst när enklare verktyg blivit för små",
    ],
    alternativeTo: ["hantverksdata", "easoft", "visma"],
    website: "https://www.next.se/",
  },
  {
    id: "easoft",
    slug: "easoft",
    name: "Easoft",
    category: "affarssystem",
    tagline: "Molnbaserat ERP utformat för byggbranschen.",
    description:
      "Affärssystem särskilt utformat för bygg- och installationsföretag, med kalkyl/offert, tidrapportering, dokumentation och fakturering som kan kopplas mot vanliga ekonomisystem.",
    solves: [
      "Samlad verksamhetsstyrning för byggföretag",
      "Kalkyl, offert och rapportering i ett system",
    ],
    bestFor: {
      stages: ["etablerat", "valetablerat"],
      companySize: ["small", "medium", "large"],
      segments: ["nybyggnation", "installation", "el", "vvs"],
      regions: ["hela-sverige"],
    },
    pricingModel: "offert",
    priceNote: "Kontakta leverantör för pris.",
    strengths: [
      "Branschfokus med mobilt arbetssätt",
      "Anpassningsbara rapport- och kalkylmallar",
    ],
    limitations: [
      "Bredd kan innebära upplärning för att utnyttja allt",
    ],
    alternativeTo: ["hantverksdata", "next", "bygglet"],
    website: "https://easoft.se/",
  },
  {
    id: "bygglog",
    slug: "bygglog",
    name: "ByggLog",
    category: "affarssystem",
    tagline: "Allt-i-ett för mindre service- och byggföretag, med ROT/RUT.",
    description:
      "Affärssystem för svenska serviceföretag inom bygg, VVS, el och måleri som kombinerar fakturering, projekthantering, tidrapportering, CRM och ROT/RUT-hantering i en plattform.",
    solves: [
      "Slippa kombinera flera separata verktyg",
      "Korrekt ROT/RUT-hantering",
    ],
    bestFor: {
      stages: ["nystartat", "etablerat"],
      companySize: ["solo", "small"],
      segments: ["rot", "installation", "el", "vvs"],
      regions: ["hela-sverige"],
    },
    pricingModel: "abonnemang",
    priceNote: "Abonnemang per användare — kontrollera aktuellt pris och testperiod.",
    strengths: [
      "Allt samlat för mindre serviceföretag",
      "Stark ROT/RUT- och faktureringshantering",
    ],
    limitations: [
      "Mindre lämpligt för stora entreprenörer med komplexa behov",
    ],
    alternativeTo: ["fortnox", "bygglet", "hantverksdata"],
    website: "https://bygglog.se/",
  },
  {
    id: "speedledger",
    slug: "speedledger",
    name: "SpeedLedger",
    category: "affarssystem",
    tagline: "Enkel bokföring och fakturering för småföretag.",
    description:
      "Molntjänst för småföretag som vill ha bokföring och fakturering på ett enkelt sätt, ofta uppskattad för användarvänlighet och support.",
    solves: [
      "Komma igång billigt med bokföring och fakturor",
      "Enkel ekonomi för enmans- och småföretag",
    ],
    bestFor: {
      stages: ["nystartat"],
      companySize: ["solo", "small"],
      segments: ["rot", "installation"],
      regions: ["hela-sverige"],
    },
    pricingModel: "abonnemang",
    priceNote: "Kontrollera aktuellt pris och paket.",
    strengths: [
      "Låg tröskel och enkel att komma igång med",
      "Bra för den som mest behöver bokföring och fakturor",
    ],
    limitations: [
      "Saknar branschspecifik projekt- och tidshantering för bygg",
    ],
    alternativeTo: ["fortnox", "bygglog"],
    website: "https://www.speedledger.se/",
  },

  // ===================== Kalkyl & Anbudsräkning =====================
  {
    id: "bidcon",
    slug: "bidcon",
    name: "Bidcon (Elecosoft)",
    category: "kalkyl",
    tagline: "Kalkylprogram för bygg och installation.",
    description:
      "Kalkylprogram som gör det enkelt att räkna på jobb och lämna anbud, med omfattande databaser för material, tider och priser. Stöd för mängdimport, BIM och en klimatberäkningsmodul.",
    solves: [
      "Snabba och korrekta anbudskalkyler",
      "Återanvända kalkyldata genom projektet",
    ],
    bestFor: {
      stages: ["etablerat", "valetablerat"],
      companySize: ["small", "medium", "large"],
      segments: ["nybyggnation", "anlaggning", "installation", "el", "vvs"],
      regions: ["hela-sverige"],
    },
    pricingModel: "offert",
    priceNote: "Modulbaserat — kontakta leverantör för pris och demo.",
    strengths: [
      "Stora pris- och tidsdatabaser",
      "Ofta beskrivet som relativt enkelt att komma igång med",
      "Stöd för BIM-mängdavtagning och klimatberäkning",
    ],
    limitations: [
      "Mest värde för den som kalkylerar ofta",
      "Modulpriser gör att kostnaden varierar med behov",
    ],
    alternativeTo: ["wikells", "map"],
    website: "https://elecosoft.com/se/programvaror/bidcon/",
  },
  {
    id: "wikells",
    slug: "wikells",
    name: "Wikells Sektionsdata",
    category: "kalkyl",
    tagline: "Kalkylverktyg byggt på sektionsdata för bygg, el och VVS.",
    description:
      "Kalkylprogram med lång historik som hjälper till med prissättning och sammanställning av byggdelar via sektionsdata. Onlineböcker finns för den som mest vill jämföra priser.",
    solves: [
      "Prissätta byggdelar och ta fram kalkyler",
      "Snabbt skapa offert från kalkyl med mallar",
    ],
    bestFor: {
      stages: ["etablerat", "valetablerat"],
      companySize: ["small", "medium", "large"],
      segments: ["nybyggnation", "installation", "el", "vvs"],
      regions: ["hela-sverige"],
    },
    pricingModel: "offert",
    priceNote: "Licensbaserat — kontakta för offert och demo.",
    strengths: [
      "Väletablerat med branschens sektionsdata",
      "Mallar som snabbt ger kalkyl och offert",
    ],
    limitations: [
      "Vissa användare upplever färre integrationer mot planeringsprogram",
      "Lönar sig mest vid frekvent kalkylering",
    ],
    alternativeTo: ["bidcon", "map"],
    website: "https://wikells.se/",
  },
  {
    id: "map",
    slug: "map",
    name: "MAP",
    category: "kalkyl",
    tagline: "Kalkyl och kostnadsstyrning för mer avancerade behov.",
    description:
      "Kalkylprogram som ofta används av kalkylavdelningar för noggrann kalkylering med uppdaterade prislistor, och som kan kopplas till kostnadsstyrning och slutlägesprognoser.",
    solves: [
      "Noggrann kalkylering med leverantörsprislistor",
      "Kostnadsstyrning och prognoser i större projekt",
    ],
    bestFor: {
      stages: ["valetablerat"],
      companySize: ["medium", "large"],
      segments: ["nybyggnation", "anlaggning"],
      regions: ["hela-sverige"],
    },
    pricingModel: "offert",
    priceNote: "Kontakta leverantör för pris.",
    strengths: [
      "Hög noggrannhet med uppdaterade prislistor",
      "Bra för stora projekt och dedikerade kalkylatorer",
    ],
    limitations: [
      "Kräver mer upplärning än enklare kalkylverktyg",
    ],
    alternativeTo: ["bidcon", "wikells"],
    website: "https://www.consultec.se/",
  },
];
