"use client";
import { useState } from "react";
import { services, categories, type CategoryId } from "@/data/seed-data";
import ServiceCard from "@/components/ServiceCard";

const pricingOptions = [
  { value: "", label: "Alla prismodeller" },
  { value: "abonnemang", label: "Abonnemang" },
  { value: "per-lead", label: "Per lead" },
  { value: "freemium", label: "Freemium" },
  { value: "offert", label: "Kontakta för pris" },
];

export default function BibliotekPage() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState<CategoryId | "">("");
  const [pricing, setPricing] = useState("");

  const filtered = services.filter((s) => {
    if (cat && s.category !== cat) return false;
    if (pricing && s.pricingModel !== pricing) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.tagline.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Produktbibliotek
        </h1>
        <p style={{ color: "var(--navy-300)" }}>
          {services.length} tjänster — filtrera och sök fritt.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          placeholder="Sök tjänst..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-lg border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-white/30 text-sm"
          style={{ backgroundColor: "var(--navy-800)" }}
        />
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value as CategoryId | "")}
          className="px-4 py-2.5 rounded-lg border border-white/10 text-sm focus:outline-none focus:border-white/30"
          style={{ backgroundColor: "var(--navy-800)", color: "var(--navy-100)" }}
        >
          <option value="">Alla kategorier</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          value={pricing}
          onChange={(e) => setPricing(e.target.value)}
          className="px-4 py-2.5 rounded-lg border border-white/10 text-sm focus:outline-none focus:border-white/30"
          style={{ backgroundColor: "var(--navy-800)", color: "var(--navy-100)" }}
        >
          {pricingOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {/* Results by category */}
      {cat ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-12">
          {categories.map((category) => {
            const catServices = filtered.filter(
              (s) => s.category === category.id
            );
            if (catServices.length === 0) return null;
            return (
              <section key={category.id}>
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-white">
                    {category.name}
                  </h2>
                  <p
                    className="text-sm mt-1"
                    style={{ color: "var(--navy-400)" }}
                  >
                    {category.blurb}
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catServices.map((s) => (
                    <ServiceCard key={s.id} service={s} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {filtered.length === 0 && (
        <p className="text-center py-20" style={{ color: "var(--navy-400)" }}>
          Inga tjänster matchar sökningen.
        </p>
      )}
    </div>
  );
}
