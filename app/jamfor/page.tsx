"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { services, categories } from "@/data/seed-data";

const pricingLabels: Record<string, string> = {
  abonnemang: "Abonnemang",
  "per-lead": "Per lead",
  freemium: "Freemium",
  offert: "Kontakta för pris",
  okand: "Okänt",
};

function JamforContent() {
  const params = useSearchParams();
  const slugA = params.get("a") ?? "";
  const slugB = params.get("b") ?? "";

  const a = services.find((s) => s.slug === slugA);
  const b = services.find((s) => s.slug === slugB);

  if (!a || !b) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">
          Välj tjänster att jämföra
        </h1>
        <p className="mb-8" style={{ color: "var(--navy-300)" }}>
          Gå till en tjänstesida och klicka &quot;Jämför med alternativ&quot;.
        </p>
        <Link
          href="/bibliotek"
          className="inline-block px-6 py-3 rounded-xl border border-white/20 text-white hover:border-white/40 transition-colors"
        >
          Öppna biblioteket
        </Link>
      </div>
    );
  }

  const catA = categories.find((c) => c.id === a.category);
  const catB = categories.find((c) => c.id === b.category);

  const rows: { label: string; a: React.ReactNode; b: React.ReactNode }[] = [
    {
      label: "Kategori",
      a: catA?.name ?? a.category,
      b: catB?.name ?? b.category,
    },
    { label: "Prissättning", a: pricingLabels[a.pricingModel], b: pricingLabels[b.pricingModel] },
    {
      label: "Prisnotering",
      a: a.priceNote ?? "—",
      b: b.priceNote ?? "—",
    },
    {
      label: "Styrkor",
      a: (
        <ul className="list-disc list-inside text-sm space-y-1">
          {a.strengths.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      ),
      b: (
        <ul className="list-disc list-inside text-sm space-y-1">
          {b.strengths.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      ),
    },
    {
      label: "Begränsningar",
      a: (
        <ul className="list-disc list-inside text-sm space-y-1">
          {a.limitations.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      ),
      b: (
        <ul className="list-disc list-inside text-sm space-y-1">
          {b.limitations.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
      ),
    },
    {
      label: "Passar fas",
      a: a.bestFor.stages
        .map((s) =>
          s === "nystartat"
            ? "Nystartat"
            : s === "etablerat"
            ? "Etablerat"
            : "Väletablerat"
        )
        .join(", "),
      b: b.bestFor.stages
        .map((s) =>
          s === "nystartat"
            ? "Nystartat"
            : s === "etablerat"
            ? "Etablerat"
            : "Väletablerat"
        )
        .join(", "),
    },
  ];

  const initials = (name: string) =>
    name
      .split(/\s+/)
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <nav className="text-sm mb-8" style={{ color: "var(--navy-400)" }}>
        <Link href="/" className="hover:text-white transition-colors">
          Hem
        </Link>{" "}
        / Jämför
      </nav>

      <h1 className="text-3xl font-bold text-white mb-8">Jämförelse</h1>

      {/* Header row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div />
        {[a, b].map((svc) => (
          <div
            key={svc.id}
            className="rounded-xl border border-white/10 p-5 flex flex-col items-center gap-3 text-center"
            style={{ backgroundColor: "var(--navy-800)" }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-white"
              style={{ backgroundColor: "var(--navy-600)" }}
            >
              {initials(svc.name)}
            </div>
            <div>
              <p className="font-bold text-white">{svc.name}</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--navy-300)" }}>
                {svc.tagline}
              </p>
            </div>
            <a
              href={svc.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto text-xs px-4 py-1.5 rounded-lg text-white font-medium transition-opacity hover:opacity-80"
              style={{ backgroundColor: "var(--copper-600)" }}
            >
              Besök →
            </a>
          </div>
        ))}
      </div>

      {/* Comparison rows */}
      <div className="flex flex-col gap-2">
        {rows.map((row) => (
          <div key={row.label} className="grid grid-cols-3 gap-4">
            <div
              className="rounded-lg px-4 py-3 flex items-center text-sm font-medium"
              style={{
                backgroundColor: "var(--navy-900)",
                color: "var(--navy-300)",
              }}
            >
              {row.label}
            </div>
            {[row.a, row.b].map((val, i) => (
              <div
                key={i}
                className="rounded-lg px-4 py-3 text-sm"
                style={{
                  backgroundColor: "var(--navy-800)",
                  color: "var(--navy-200)",
                }}
              >
                {val}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/matcha"
          className="inline-block px-8 py-3 rounded-xl text-white font-semibold transition-opacity hover:opacity-90"
          style={{ backgroundColor: "var(--copper-500)" }}
        >
          Guidad matchning — hitta rätt för dig →
        </Link>
      </div>
    </div>
  );
}

export default function JamforPage() {
  return (
    <Suspense>
      <JamforContent />
    </Suspense>
  );
}
