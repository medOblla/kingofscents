import { Locale, getDict } from "@/lib/i18n";

export default function Marquee({ locale }: { locale: Locale }) {
  const items = getDict(locale).marquee;
  const doubled = [...items, ...items];
  return (
    <section aria-hidden className="relative py-8 sm:py-10 border-y border-[color:var(--color-line-soft)] overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[color:var(--color-bg)] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[color:var(--color-bg)] to-transparent z-10 pointer-events-none" />
      <div className="flex overflow-hidden">
        <div className="flex animate-[marquee_40s_linear_infinite] gap-12 sm:gap-16 whitespace-nowrap">
          {doubled.map((label, i) => (
            <span key={i} className="font-display text-2xl sm:text-3xl text-[color:var(--color-ink-muted)]/70 italic">
              {label}
              <span className="ml-12 sm:ml-16 text-[color:var(--color-gold)]">·</span>
            </span>
          ))}
        </div>
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </section>
  );
}
