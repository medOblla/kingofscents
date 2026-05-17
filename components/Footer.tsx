import { Locale, getDict } from "@/lib/i18n";
import Link from "next/link";

export default function Footer({ locale }: { locale: Locale }) {
  const f = getDict(locale).footer;
  return (
    <footer className="relative border-t border-[color:var(--color-line-soft)] mt-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-12 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2">
            <Crown />
            <span className="font-display text-xl tracking-wider">
              <span className="text-[color:var(--color-gold)]">king</span>ofscents
            </span>
          </div>
          <p className="mt-3 text-sm text-[color:var(--color-ink-muted)] max-w-sm">{f.tagline}</p>
        </div>
        <div className="md:col-span-3">
          <h4 className="text-xs tracking-[0.18em] uppercase text-[color:var(--color-ink-muted)] mb-3">Navigation</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#packs" className="text-[color:var(--color-ink)] hover:text-[color:var(--color-gold)]">{getDict(locale).nav.packs}</a></li>
            <li><a href="#fragrances" className="text-[color:var(--color-ink)] hover:text-[color:var(--color-gold)]">{getDict(locale).nav.perfumes}</a></li>
            <li><a href="#story" className="text-[color:var(--color-ink)] hover:text-[color:var(--color-gold)]">{getDict(locale).nav.story}</a></li>
            <li><a href="#faq" className="text-[color:var(--color-ink)] hover:text-[color:var(--color-gold)]">{getDict(locale).nav.faq}</a></li>
          </ul>
        </div>
        <div className="md:col-span-4">
          <h4 className="text-xs tracking-[0.18em] uppercase text-[color:var(--color-ink-muted)] mb-3">{f.follow}</h4>
          <ul className="flex gap-3">
            {[
              { l: "Instagram", h: "https://instagram.com/kingofscents" },
              { l: "TikTok", h: "https://tiktok.com/@kingofscents" },
              { l: "WhatsApp", h: "https://wa.me/212600000000" },
            ].map((x) => (
              <li key={x.l}>
                <a
                  href={x.h}
                  className="inline-flex items-center px-3 py-2 rounded-full border border-[color:var(--color-line)] text-xs text-[color:var(--color-ink-muted)] hover:text-[color:var(--color-gold)] hover:border-[color:var(--color-gold)]/40 transition"
                >
                  {x.l}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center gap-3 text-xs text-[color:var(--color-ink-muted)]">
            <Link href={`/${locale === "fr" ? "en" : "fr"}`} className="hover:text-[color:var(--color-gold)]">
              {locale === "fr" ? "English" : "Français"}
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-[color:var(--color-line-soft)]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[color:var(--color-ink-dim)]">
          <span>© {new Date().getFullYear()} kingofscents. {f.rights}</span>
          <span>{locale === "fr" ? "Fait avec attention à Casablanca." : "Made with care in Casablanca."}</span>
        </div>
      </div>
    </footer>
  );
}

function Crown() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#C8A052" strokeWidth="1.6">
      <path d="M3 8l4 5 5-8 5 8 4-5v9.5A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5V8z" />
      <circle cx="3" cy="8" r="1" fill="#C8A052" />
      <circle cx="21" cy="8" r="1" fill="#C8A052" />
      <circle cx="12" cy="5" r="1" fill="#C8A052" />
    </svg>
  );
}
