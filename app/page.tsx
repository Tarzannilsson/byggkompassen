import Link from "next/link";
import { stages } from "@/data/seed-data";

const stageIcons: Record<string, string> = {
  nystartat: "🌱",
  etablerat: "⚙️",
  valetablerat: "🏗️",
};

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section
        className="py-20 md:py-32 px-4 text-center"
        style={{ backgroundColor: "var(--navy-950)" }}
      >
        <div className="max-w-3xl mx-auto">
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-4"
            style={{ color: "var(--copper-400)" }}
          >
            Oberoende guide för byggföretag
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight mb-6">
            Slipp säljtjatet.
          </h1>
          <p
            className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10"
            style={{ color: "var(--navy-200)" }}
          >
            Vi hjälper dig hitta rätt program och tjänster för ditt byggföretag
            — i lugn och ro, utan att bli jagad av säljare.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#stages"
              className="px-8 py-4 rounded-xl text-white font-semibold text-lg transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--copper-500)" }}
            >
              Kom igång
            </Link>
            <Link
              href="/bibliotek"
              className="px-8 py-4 rounded-xl font-semibold text-lg border border-white/20 text-white hover:border-white/40 transition-colors"
            >
              Bläddra i tjänster
            </Link>
          </div>
        </div>
      </section>

      {/* Stage picker */}
      <section id="stages" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">
              Var står ditt företag?
            </h2>
            <p style={{ color: "var(--navy-300)" }}>
              Välj den fas som stämmer bäst — vi visar direkt vad som passar
              dig.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {stages.map((stage) => (
              <Link
                key={stage.id}
                href={`/fas/${stage.id}`}
                className="group rounded-2xl border border-white/10 p-8 flex flex-col gap-4 transition-all hover:border-white/30 hover:scale-[1.02]"
                style={{ backgroundColor: "var(--navy-800)" }}
              >
                <div className="text-4xl">{stageIcons[stage.id]}</div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {stage.name}
                  </h3>
                  <p style={{ color: "var(--navy-300)" }}>{stage.pitch}</p>
                </div>
                <div
                  className="mt-auto flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all"
                  style={{ color: "var(--copper-400)" }}
                >
                  Se rekommendationer
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section
        className="py-16 px-4 border-t border-white/10"
        style={{ backgroundColor: "var(--navy-950)" }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-10">
            Vad vi lovar
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: "🔒",
                title: "Ingen säljjakt",
                text: "Vi lämnar aldrig ut dina uppgifter. Inga säljare ringer dig för att du besökt sajten.",
              },
              {
                icon: "⚖️",
                title: "Oberoende",
                text: "Vi listar tjänsters begränsningar lika tydligt som styrkorna. Ingen betalar för sin placering.",
              },
              {
                icon: "🆓",
                title: "Helt gratis",
                text: "Tjänsten är kostnadsfri att använda. Vi finansieras inte av provisioner eller döljda avtal.",
              },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center gap-3">
                <div className="text-3xl">{item.icon}</div>
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--navy-300)" }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA to library */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-3">
            Vill du bläddra fritt?
          </h2>
          <p className="mb-6" style={{ color: "var(--navy-300)" }}>
            Se alla ~28 tjänster i produktbiblioteket, filtrera på kategori,
            bransch och prismodell.
          </p>
          <Link
            href="/bibliotek"
            className="inline-block px-8 py-3 rounded-xl border border-white/20 text-white hover:border-white/40 transition-colors font-medium"
          >
            Öppna produktbiblioteket
          </Link>
        </div>
      </section>
    </div>
  );
}
