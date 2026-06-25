import Link from "next/link";

export default function OmPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
        Så funkar Byggkompassen
      </h1>

      <div className="flex flex-col gap-10 leading-relaxed" style={{ color: "var(--navy-200)" }}>
        <section>
          <h2 className="text-xl font-bold text-white mb-3">Varför finns vi?</h2>
          <p>
            Byggbranschen är full av program och tjänster — men det är svårt att
            veta vad som faktiskt passar just ditt företag. Marknadsföringen från
            leverantörerna lovar det mesta. Och ofta slutar det med att du skriver
            på ett avtal och sen upptäcker att det finns något som hade passat
            bättre.
          </p>
          <p className="mt-3">
            Byggkompassen är oberoende. Vi har ingen affärsrelation med någon av
            de tjänster vi listar. Målet är att du ska kunna jämföra i lugn och
            ro — och slippa bli jagad av säljare för att du klickade på fel länk.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Hur vi listar tjänster</h2>
          <p>
            Vi listar tjänster som vi bedömer är relevanta för svenska
            byggföretag. Listningen är gratis och vi tar inte betalt för
            placeringar. Vi skriver neutrala beskrivningar och lyfter aktivt
            begränsningar — inte bara styrkor.
          </p>
          <p className="mt-3">
            Priser och funktioner ändras. Vi försöker hålla informationen
            uppdaterad men uppmanar alltid till att verifiera direkt hos
            leverantören innan du bestämmer dig.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">Affärsmodell</h2>
          <p>
            I dag är Byggkompassen gratis att använda. Vi samlar inte in
            personuppgifter för att sälja vidare, och vi lämnar inte ut dina
            uppgifter till leverantörer.
          </p>
          <p className="mt-3">
            Längre fram kan vi komma att erbjuda möjlighet för tjänster att
            komplettera sin listning med mer information eller kontaktformulär mot
            en avgift — men det kommer att framgå tydligt, och det påverkar inte
            rangordningen av rekommendationerna.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">
            Hittar du fel eller saknar en tjänst?
          </h2>
          <p>
            Skicka ett mejl så kollar vi på det. Vi vill att sajten ska vara
            faktabaserad och hjälpsam — inte sälja en bild.
          </p>
        </section>
      </div>

      <div className="mt-12">
        <Link
          href="/"
          className="inline-block px-6 py-3 rounded-xl border border-white/20 text-white hover:border-white/40 transition-colors text-sm font-medium"
        >
          ← Tillbaka till startsidan
        </Link>
      </div>
    </div>
  );
}
