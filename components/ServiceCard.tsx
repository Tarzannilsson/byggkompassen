import Link from "next/link";
import type { Service } from "@/data/seed-data";
import { categories } from "@/data/seed-data";

const pricingLabels: Record<string, string> = {
  abonnemang: "Abonnemang",
  "per-lead": "Per lead",
  freemium: "Freemium",
  offert: "Kontakta för pris",
  okand: "Okänt",
};

type Props = {
  service: Service;
  explanation?: string;
  compact?: boolean;
};

export default function ServiceCard({ service, explanation, compact }: Props) {
  const cat = categories.find((c) => c.id === service.category);
  const initials = service.name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="rounded-xl border border-white/10 p-5 flex flex-col gap-3 transition-colors hover:border-white/20"
      style={{ backgroundColor: "var(--navy-800)" }}
    >
      <div className="flex items-start gap-3">
        {/* Logo placeholder */}
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 text-white"
          style={{ backgroundColor: "var(--navy-600)" }}
        >
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-white text-sm">{service.name}</h3>
            {cat && (
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{
                  backgroundColor: "var(--navy-700)",
                  color: "var(--navy-200)",
                }}
              >
                {cat.name}
              </span>
            )}
          </div>
          <p className="text-xs mt-0.5" style={{ color: "var(--navy-300)" }}>
            {service.tagline}
          </p>
        </div>
      </div>

      {!compact && (
        <p className="text-sm leading-relaxed" style={{ color: "var(--navy-200)" }}>
          {service.description}
        </p>
      )}

      {explanation && (
        <p
          className="text-xs italic"
          style={{ color: "var(--copper-300)" }}
        >
          {explanation}
        </p>
      )}

      <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/10">
        <span
          className="text-xs px-2 py-1 rounded font-medium"
          style={{
            backgroundColor: "var(--navy-700)",
            color: "var(--copper-300)",
          }}
        >
          {pricingLabels[service.pricingModel]}
        </span>
        <div className="flex gap-2">
          <Link
            href={`/tjanst/${service.slug}`}
            className="text-xs text-white/60 hover:text-white transition-colors"
          >
            Läs mer
          </Link>
          <a
            href={service.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-3 py-1 rounded font-medium transition-opacity hover:opacity-80"
            style={{
              backgroundColor: "var(--copper-600)",
              color: "white",
            }}
          >
            Besök →
          </a>
        </div>
      </div>
    </div>
  );
}
