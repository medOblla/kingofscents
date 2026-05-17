import Image from "next/image";
import { Locale, getDict } from "@/lib/i18n";
import atelierImage from "@/public/img/atelier.png";

export default function Story({ locale }: { locale: Locale }) {
  const s = getDict(locale).story;
  const alt =
    locale === "fr"
      ? "Atelier kingofscents : transvasement délicat d'un parfum dans un décant, zellige marocain en arrière-plan."
      : "kingofscents atelier: a fragrance being transferred into a decant, Moroccan zellige tile in the background.";
  return (
    <section id="story" className="relative py-24 sm:py-32 scroll-mt-24 overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] aspect-square">
          <div
            className="absolute inset-0 rounded-full blur-3xl animate-drift opacity-60"
            style={{ background: "radial-gradient(circle at center, rgba(200,160,82,0.2), transparent 60%)" }}
          />
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 reveal">
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 elev-card aspect-[4/3] group">
            <div className="absolute inset-0 animate-ken-burns">
              <Image
                src={atelierImage}
                alt={alt}
                placeholder="blur"
                sizes="(max-width: 1024px) 90vw, 560px"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[color:var(--color-bg)]/50 via-transparent to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-gold)]/50 to-transparent" />
          </div>
        </div>
        <div className="lg:col-span-6">
          <div className="reveal inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-[color:var(--color-gold)]">
            <span className="divider-dot" />
            {s.eyebrow}
          </div>
          <h2 className="reveal mt-4 font-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight">
            {s.title}
          </h2>
          <p className="reveal mt-6 text-[color:var(--color-ink-muted)] text-base sm:text-lg leading-relaxed max-w-xl">
            {s.body}
          </p>
          <dl className="reveal-stagger mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4" style={{ ["--stagger" as string]: "90ms" }}>
            {[
              { l: s.line1Label, v: s.line1Value },
              { l: s.line2Label, v: s.line2Value },
              { l: s.line3Label, v: s.line3Value },
            ].map((row, i) => (
              <div
                key={i}
                className="glass hover-lift rounded-2xl px-5 py-4 flex flex-col gap-1 hover:border-[color:var(--color-gold)]/40"
              >
                <dt className="text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-ink-muted)]">{row.l}</dt>
                <dd className="font-display text-3xl text-[color:var(--color-gold)]">{row.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
