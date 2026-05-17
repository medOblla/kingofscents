import { Locale, getDict } from "@/lib/i18n";
import { SectionHeader } from "./HowItWorks";

export default function Reviews({ locale }: { locale: Locale }) {
  const r = getDict(locale).reviews;
  return (
    <section className="relative isolate overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.22]"
        style={{
          backgroundImage: "url(/img/backdrop.png)",
          backgroundSize: "cover",
          backgroundPosition: "20% 30%",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
        }}
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeader
          eyebrow={locale === "fr" ? "Témoignages" : "Customer love"}
          title={r.title}
          sub={r.sub}
        />
        <div className="reveal-stagger mt-16 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6" style={{ ["--stagger" as string]: "110ms" }}>
          {r.items.map((item, i) => (
            <figure
              key={i}
              className="hover-lift relative rounded-3xl p-7 sm:p-8 bg-[color:var(--color-bg-elev)] border border-[color:var(--color-line)] hover:border-[color:var(--color-gold)]/40 hover:shadow-[0_30px_60px_-20px_rgba(200,160,82,0.18)]"
            >
              <span className="absolute top-5 right-6 font-display text-[5rem] text-[color:var(--color-gold)]/15 leading-none select-none">"</span>
              <Stars />
              <blockquote className="mt-4 text-[color:var(--color-ink)] text-base sm:text-lg leading-relaxed font-display italic">
                {item.quote}
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-gradient-to-br from-[color:var(--color-gold)] to-[color:var(--color-gold-lo)] text-[color:var(--color-bg)] inline-flex items-center justify-center font-medium">
                  {item.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm text-[color:var(--color-ink)]">{item.name}</span>
                  <span className="block text-xs text-[color:var(--color-ink-muted)]">{item.city}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stars() {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" width="14" height="14" fill="#C8A052">
          <path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18 22l-6-3.6L6 22l1.5-7.2L2 10l7.1-1.1z" />
        </svg>
      ))}
    </span>
  );
}
