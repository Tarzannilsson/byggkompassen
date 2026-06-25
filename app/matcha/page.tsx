"use client";
import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { stages, categories, type Stage, type CategoryId } from "@/data/seed-data";
import type { Segment, Region } from "@/data/seed-data";
import { getRecommendations } from "@/lib/match";
import ServiceCard from "@/components/ServiceCard";
import Link from "next/link";

const segmentOptions: { value: Segment; label: string }[] = [
  { value: "rot", label: "ROT (renovering)" },
  { value: "nybyggnation", label: "Nybyggnation" },
  { value: "anlaggning", label: "Anläggning" },
  { value: "installation", label: "Installation" },
  { value: "el", label: "El" },
  { value: "vvs", label: "VVS" },
];

const goalOptions: { value: CategoryId; label: string }[] = [
  { value: "anbud-upphandling", label: "Vinna upphandlingar" },
  { value: "leads-kunder", label: "Fler kunder och leads" },
  { value: "projekt-tid", label: "Bättre projekt- och tidskoll" },
  { value: "marknadsdata", label: "Marknadsinsikt" },
  { value: "affarssystem", label: "Effektivare administration" },
  { value: "kalkyl", label: "Bättre kalkylering" },
];

function WizardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialStage = (searchParams.get("stage") as Stage) || "nystartat";

  const [step, setStep] = useState(0);
  const [selectedStage, setSelectedStage] = useState<Stage>(initialStage);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [regions, setRegions] = useState<Region[]>(["hela-sverige"]);
  const [goals, setGoals] = useState<CategoryId[]>([]);
  const [showResults, setShowResults] = useState(false);

  function toggleSegment(s: Segment) {
    setSegments((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  }

  function toggleGoal(g: CategoryId) {
    setGoals((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    );
  }

  function finish() {
    setShowResults(true);
  }

  if (showResults) {
    const recs = getRecommendations({
      stage: selectedStage,
      segments,
      regions,
      goals,
    });

    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">
            Dina rekommendationer
          </h1>
          <p style={{ color: "var(--navy-300)" }}>
            Baserat på dina svar — de bäst matchande tjänsterna per kategori.
          </p>
          <button
            onClick={() => setShowResults(false)}
            className="mt-3 text-sm hover:text-white transition-colors"
            style={{ color: "var(--copper-400)" }}
          >
            ← Ändra svar
          </button>
        </div>

        <div className="flex flex-col gap-12">
          {recs.map((cat) => (
            <section key={cat.categoryId}>
              <h2 className="text-xl font-bold text-white mb-4">
                {cat.categoryName}
              </h2>
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
              {cat.services.length >= 2 && (
                <div className="mt-3">
                  <Link
                    href={`/jamfor?a=${cat.services[0].service.slug}&b=${cat.services[1].service.slug}`}
                    className="text-sm hover:text-white transition-colors"
                    style={{ color: "var(--copper-400)" }}
                  >
                    Jämför topp-2 →
                  </Link>
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    );
  }

  const steps = [
    // Step 0: Stage
    <div key="stage" className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-white">Var står ditt företag?</h2>
      <div className="grid sm:grid-cols-3 gap-4 mt-2">
        {stages.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelectedStage(s.id as Stage)}
            className="rounded-xl border p-5 text-left transition-all"
            style={{
              backgroundColor:
                selectedStage === s.id
                  ? "var(--navy-600)"
                  : "var(--navy-800)",
              borderColor:
                selectedStage === s.id
                  ? "var(--copper-500)"
                  : "rgba(255,255,255,0.1)",
              color: "white",
            }}
          >
            <div className="font-semibold mb-1">{s.name}</div>
            <div
              className="text-sm"
              style={{ color: "var(--navy-300)" }}
            >
              {s.pitch}
            </div>
          </button>
        ))}
      </div>
    </div>,

    // Step 1: Segments
    <div key="segments" className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-white">Vilken typ av jobb?</h2>
      <p style={{ color: "var(--navy-300)" }}>Välj en eller flera.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
        {segmentOptions.map((s) => (
          <button
            key={s.value}
            onClick={() => toggleSegment(s.value)}
            className="rounded-xl border px-4 py-3 text-sm font-medium transition-all"
            style={{
              backgroundColor: segments.includes(s.value)
                ? "var(--navy-600)"
                : "var(--navy-800)",
              borderColor: segments.includes(s.value)
                ? "var(--copper-500)"
                : "rgba(255,255,255,0.1)",
              color: "white",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>,

    // Step 2: Goals
    <div key="goals" className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-white">Vad vill du uppnå?</h2>
      <p style={{ color: "var(--navy-300)" }}>Välj ett eller flera mål.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
        {goalOptions.map((g) => (
          <button
            key={g.value}
            onClick={() => toggleGoal(g.value)}
            className="rounded-xl border px-5 py-3 text-sm font-medium text-left transition-all"
            style={{
              backgroundColor: goals.includes(g.value)
                ? "var(--navy-600)"
                : "var(--navy-800)",
              borderColor: goals.includes(g.value)
                ? "var(--copper-500)"
                : "rgba(255,255,255,0.1)",
              color: "white",
            }}
          >
            {g.label}
          </button>
        ))}
      </div>
    </div>,
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Guidad matchning</h1>
        <p style={{ color: "var(--navy-300)" }}>
          3 snabba frågor — vi hittar de tjänster som passar dig bäst.
        </p>
      </div>

      {/* Progress */}
      <div className="flex gap-2 mb-10">
        {steps.map((_, i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full transition-all"
            style={{
              backgroundColor:
                i <= step ? "var(--copper-500)" : "var(--navy-700)",
            }}
          />
        ))}
      </div>

      {steps[step]}

      {/* Navigation */}
      <div className="flex justify-between mt-10">
        <button
          onClick={() => (step === 0 ? router.push("/") : setStep(step - 1))}
          className="px-6 py-2.5 rounded-lg border border-white/20 text-sm text-white hover:border-white/40 transition-colors"
        >
          ← Tillbaka
        </button>
        <div className="flex gap-3">
          {step < steps.length - 1 ? (
            <>
              <button
                onClick={finish}
                className="px-5 py-2.5 rounded-lg text-sm border border-white/20 text-white/60 hover:text-white transition-colors"
              >
                Hoppa till resultat
              </button>
              <button
                onClick={() => setStep(step + 1)}
                className="px-6 py-2.5 rounded-lg text-white font-medium text-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: "var(--copper-500)" }}
              >
                Nästa →
              </button>
            </>
          ) : (
            <button
              onClick={finish}
              className="px-8 py-2.5 rounded-lg text-white font-medium text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--copper-500)" }}
            >
              Visa rekommendationer →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MatchaPage() {
  return (
    <Suspense>
      <WizardContent />
    </Suspense>
  );
}
