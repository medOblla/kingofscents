import { Locale, getDict } from "@/lib/i18n";

export default function HowItWorks({ locale }: { locale: Locale }) {
  const d = getDict(locale).how;
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow={locale === "fr" ? "Comment ça marche" : "How it works"}
          title={d.title}
          sub={d.sub}
        />

        <div className="reveal-stagger mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-px bg-[color:var(--color-line-soft)] rounded-3xl overflow-hidden border border-[color:var(--color-line-soft)]" style={{ ["--stagger" as string]: "120ms" }}>
          {d.steps.map((step, i) => (
            <div
              key={i}
              className="relative bg-[color:var(--color-bg)] p-8 sm:p-10 group transition-colors duration-500 hover:bg-[color:var(--color-bg-elev)]"
            >
              <div className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-[color:var(--color-gold)] to-transparent transition-transform duration-700 ease-[var(--ease-luxe)] group-hover:scale-x-100" />
              <div className="flex items-baseline gap-4">
                <span className="font-display text-5xl sm:text-6xl text-[color:var(--color-gold)] tabular-nums transition-transform duration-500 ease-[var(--ease-luxe)] group-hover:-translate-y-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-px flex-1 bg-[color:var(--color-line)] mt-6" />
              </div>
              <h3 className="mt-6 font-display text-2xl text-[color:var(--color-ink)] transition-colors duration-500 group-hover:text-[color:var(--color-gold-hi)]">{step.title}</h3>
              <p className="mt-3 text-sm sm:text-base text-[color:var(--color-ink-muted)] leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  sub,
  centered = true,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  centered?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <div className="reveal inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-[color:var(--color-gold)]">
          <span className="divider-dot" />
          {eyebrow}
        </div>
      )}
      <h2 className="reveal mt-4 font-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight text-[color:var(--color-ink)]">
        {title}
      </h2>
      {sub && <p className="reveal mt-5 text-[color:var(--color-ink-muted)] text-base sm:text-lg leading-relaxed">{sub}</p>}
    </div>
  );
}
