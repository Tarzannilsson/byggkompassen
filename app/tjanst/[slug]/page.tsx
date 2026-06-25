import { notFound } from "next/navigation";
import Link from "next/link";
import { services, categories } from "@/data/seed-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function TjanstPage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const cat = categories.find((c) => c.id === service.category);
  const alternatives = service.alternativeTo
    ?.map((altSlug) => services.find((s) => s.slug === altSlug))
    .filter(Boolean) ?? [];

  const initials = service.name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const pricingLabels: Record<string, string> = {
    abonnemang: "Abonnemang",
    "per-lead": "Per lead",
    freemium: "Freemium",
    offert: "Kontakta för pris",
    okand: "Okänt",
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm mb-8" style={{ color: "var(--navy-400)" }}>
        <Link href="/" className="hover:text-white transition-colors">
          Hem
        </Link>{" "}
        /{" "}
        <Link href="/bibliotek" className="hover:text-white transition-colors">
          Bibliotek
        </Link>{" "}
        / <span style={{ color: "var(--navy-200)" }}>{service.name}</span>
      </nav>

      {/* Header */}
      <div className="flex items-start gap-5 mb-8">
        <div
          className="w-16 h-16 rounded-xl flex items-center justify-center text-xl font-bold flex-shrink-0 text-white"
          style={{ backgroundColor: "var(--navy-600)" }}
        >
          {initials}
        </div>
        <div>
          <div className="flex items-center gap-3 flex-wrap mb-1">
            <h1 className="text-3xl font-bold text-white">{service.name}</h1>
            {cat && (
              <span
                className="text-sm px-3 py-1 rounded-full font-medium"
                style={{
                  backgroundColor: "var(--navy-700)",
                  color: "var(--navy-200)",
                }}
              >
                {cat.name}
              </span>
            )}
          </div>
          <p className="text-lg" style={{ color: "var(--navy-300)" }}>
            {service.tagline}
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <div
        className="rounded-lg px-4 py-3 text-sm mb-8 border border-white/10"
        style={{ backgroundColor: "var(--navy-800)", color: "var(--navy-300)" }}
      >
        Byggkompassen tar inte betalt för den här listningen. Vi har ingen
        affärsrelation med {service.name}. Verifiera alltid uppgifter direkt hos
        leverantören — priser och funktioner ändras.
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 flex flex-col gap-8">
          {/* Description */}
          <section>
            <h2 className="text-lg font-bold text-white mb-3">Om tjänsten</h2>
            <p
              className="leading-relaxed"
              style={{ color: "var(--navy-200)" }}
            >
              {service.description}
            </p>
          </section>

          {/* Solves */}
          <section>
            <h2 className="text-lg font-bold text-white mb-3">
              Löser bland annat
            </h2>
            <ul className="flex flex-col gap-2">
              {service.solves.map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm" style={{ color: "var(--navy-200)" }}>
                  <span style={{ color: "var(--copper-400)" }}>✓</span>
                  {s}
                </li>
              ))}
            </ul>
          </section>

          {/* Strengths */}
          <section>
            <h2 className="text-lg font-bold text-white mb-3">Styrkor</h2>
            <ul className="flex flex-col gap-2">
              {service.strengths.map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm" style={{ color: "var(--navy-200)" }}>
                  <span style={{ color: "var(--copper-400)" }}>+</span>
                  {s}
                </li>
              ))}
            </ul>
          </section>

          {/* Limitations */}
          <section>
            <h2 className="text-lg font-bold text-white mb-3">Begränsningar</h2>
            <ul className="flex flex-col gap-2">
              {service.limitations.map((l) => (
                <li key={l} className="flex items-start gap-2 text-sm" style={{ color: "var(--navy-200)" }}>
                  <span style={{ color: "var(--navy-400)" }}>–</span>
                  {l}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-4">
          {/* Pricing */}
          <div
            className="rounded-xl p-5 border border-white/10"
            style={{ backgroundColor: "var(--navy-800)" }}
          >
            <h3 className="font-semibold text-white mb-3">Pris</h3>
            <p
              className="text-sm font-medium mb-1"
              style={{ color: "var(--copper-300)" }}
            >
              {pricingLabels[service.pricingModel]}
            </p>
            {service.priceNote && (
              <p className="text-sm" style={{ color: "var(--navy-300)" }}>
                {service.priceNote}
              </p>
            )}
          </div>

          {/* Fits */}
          <div
            className="rounded-xl p-5 border border-white/10"
            style={{ backgroundColor: "var(--navy-800)" }}
          >
            <h3 className="font-semibold text-white mb-3">Passar</h3>
            <div className="flex flex-col gap-2 text-sm" style={{ color: "var(--navy-200)" }}>
              <div>
                <span className="text-xs uppercase tracking-wide" style={{ color: "var(--navy-400)" }}>
                  Fas
                </span>
                <p>
                  {service.bestFor.stages
                    .map((s) =>
                      s === "nystartat"
                        ? "Nystartat"
                        : s === "etablerat"
                        ? "Etablerat"
                        : "Väletablerat"
                    )
                    .join(", ")}
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <a
            href={service.website}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center px-6 py-3 rounded-xl text-white font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--copper-500)" }}
          >
            Besök {service.name} →
          </a>

          {/* Alternatives */}
          {alternatives.length > 0 && (
            <div
              className="rounded-xl p-5 border border-white/10"
              style={{ backgroundColor: "var(--navy-800)" }}
            >
              <h3 className="font-semibold text-white mb-3">Alternativ</h3>
              <ul className="flex flex-col gap-2">
                {alternatives.map(
                  (alt) =>
                    alt && (
                      <li key={alt.id}>
                        <Link
                          href={`/tjanst/${alt.slug}`}
                          className="text-sm hover:text-white transition-colors"
                          style={{ color: "var(--copper-300)" }}
                        >
                          {alt.name}
                        </Link>
                      </li>
                    )
                )}
              </ul>
            </div>
          )}

          {/* Compare link */}
          {alternatives.length > 0 && (
            <Link
              href={`/jamfor?a=${service.slug}&b=${alternatives[0]?.slug}`}
              className="block text-center px-6 py-3 rounded-xl border border-white/20 text-white hover:border-white/40 transition-colors text-sm font-medium"
            >
              Jämför med alternativ
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
