import { notFound } from "next/navigation";
import Link from "next/link";
import { stages, categories, type Stage } from "@/data/seed-data";
import { getStageRecommendations } from "@/lib/match";
import ServiceCard from "@/components/ServiceCard";

type Props = { params: Promise<{ stage: string }> };

export function generateStaticParams() {
  return stages.map((s) => ({ stage: s.id }));
}

export default async function StagePage({ params }: Props) {
  const { stage: stageId } = await params;
  const stage = stages.find((s) => s.id === stageId);
  if (!stage) notFound();

  const recommendations = getStageRecommendations(stage.id as Stage);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm mb-8" style={{ color: "var(--navy-400)" }}>
        <Link href="/" className="hover:text-white transition-colors">
          Hem
        </Link>{" "}
        / <span style={{ color: "var(--navy-200)" }}>{stage.name}</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          {stage.name}
        </h1>
        <p className="text-lg" style={{ color: "var(--navy-300)" }}>
          {stage.pitch}
        </p>
      </div>

      {/* Category recommendations */}
      <div className="flex flex-col gap-12">
        {recommendations.map((cat) => (
          <section key={cat.categoryId}>
            <div className="mb-4">
              <h2 className="text-xl font-bold text-white">{cat.categoryName}</h2>
              <p className="text-sm mt-1" style={{ color: "var(--navy-400)" }}>
                {categories.find((c) => c.id === cat.categoryId)?.blurb}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cat.services.map(({ service, explanation }) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  explanation={explanation}
                  compact
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Next step CTA */}
      <div
        className="mt-16 rounded-2xl p-8 text-center border border-white/10"
        style={{ backgroundColor: "var(--navy-800)" }}
      >
        <h3 className="text-xl font-bold text-white mb-2">
          Vill du finputsa rekommendationen?
        </h3>
        <p className="mb-6" style={{ color: "var(--navy-300)" }}>
          Svara på 3 snabba frågor om din inriktning och dina mål — vi anpassar
          listan direkt.
        </p>
        <Link
          href={`/matcha?stage=${stage.id}`}
          className="inline-block px-8 py-3 rounded-xl text-white font-semibold transition-opacity hover:opacity-90"
          style={{ backgroundColor: "var(--copper-500)" }}
        >
          Guidad matchning →
        </Link>
      </div>
    </div>
  );
}
