"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Locale, getDict } from "@/lib/i18n";
import {
  bundlePrice,
  bundlesByTier,
  getFragrance,
  tiers,
  type Bundle,
  type Fragrance,
  type TierId,
} from "@/lib/catalog";
import { cn } from "@/lib/cn";

const easeLuxe = [0.22, 1, 0.36, 1] as const;

export default function BundleDetail({
  locale,
  tierId,
}: {
  locale: Locale;
  tierId: TierId;
}) {
  const d = getDict(locale);
  const p = d.packs;
  const t = tiers[tierId];
  const tierCopy = p.perks[tierId];
  const tierBundles = bundlesByTier(tierId);

  const [activeId, setActiveId] = useState<string>(tierBundles[0].id);
  const active =
    tierBundles.find((b) => b.id === activeId) ?? tierBundles[0];
  const fragrances = active.fragrances.map(getFragrance);
  const price = bundlePrice(active);

  const reduce = useReducedMotion();
  const isSignature = tierId === "signature";
  const isRoyal = tierId === "royal";

  return (
    <article className="relative pt-28 sm:pt-36 pb-20 sm:pb-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Breadcrumb / back */}
        <nav className="mb-6 text-xs sm:text-sm">
          <Link
            href={`/${locale}#packs`}
            className="inline-flex items-center gap-2 text-[color:var(--color-ink-muted)] hover:text-[color:var(--color-gold)] transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {p.backToBundles}
          </Link>
        </nav>

        {/* Top: hero + summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Hero carousel — key forces a fresh component (resets slide) on variant change */}
          <div className="lg:col-span-7 relative">
            <BundleCarousel
              key={active.id}
              bundle={active}
              fragrances={fragrances}
              tierLabel={tierCopy.name}
              locale={locale}
              showBestValue={isRoyal}
              showPopular={isSignature}
              bestValueLabel={p.bestValue}
              popularLabel={p.popular}
            />
          </div>

          {/* Summary */}
          <div className="lg:col-span-5">
            <div className="text-[10px] tracking-[0.22em] uppercase text-[color:var(--color-gold)]">
              {locale === "fr" ? "Tier" : "Tier"}
            </div>
            <h1 className="mt-2 font-display text-5xl sm:text-6xl text-[color:var(--color-ink)] leading-[0.95]">
              {tierCopy.name}
            </h1>
            <p className="mt-4 text-[color:var(--color-ink-muted)] leading-relaxed">
              {tierCopy.tagline}
            </p>

            {/* Perks row */}
            <ul className="mt-6 flex flex-wrap gap-2">
              {tierCopy.perks.map((perk, i) => (
                <li
                  key={i}
                  className="text-[10px] sm:text-[11px] tracking-wider px-2.5 py-1 rounded-full border border-[color:var(--color-line)] text-[color:var(--color-ink-muted)]"
                >
                  {perk}
                </li>
              ))}
            </ul>

            {/* Price + count */}
            <div className="mt-8 flex items-baseline gap-3">
              <span className="font-display text-5xl sm:text-6xl text-[color:var(--color-ink)] tabular-nums leading-none">
                {price}
              </span>
              <span className="text-sm text-[color:var(--color-ink-muted)]">
                DH
              </span>
              <span className="ml-2 text-xs tracking-[0.18em] uppercase text-[color:var(--color-ink-muted)]">
                · {t.count} × 10 ml
              </span>
            </div>
            <div className="mt-1 text-[11px] text-[color:var(--color-gold)]/80">
              {t.freeShipping ? p.freeShipping : locale === "fr" ? "Livraison 35 DH" : "35 DH delivery"}
              {t.decantMl > 0 &&
                ` · ${p.freeDecant.replace("{n}", String(t.decantMl))}`}
            </div>

            {/* Variant pills */}
            <div className="mt-8">
              <div className="text-[10px] tracking-[0.22em] uppercase text-[color:var(--color-ink-muted)] mb-3">
                {p.chooseVariant}
              </div>
              <div className="flex flex-wrap gap-2">
                {tierBundles.map((b, bi) => {
                  const isActive = b.id === active.id;
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setActiveId(b.id)}
                      aria-pressed={isActive}
                      className={cn(
                        "px-4 py-2.5 rounded-lg text-sm tabular-nums tracking-wider transition-all min-w-[64px]",
                        isActive
                          ? "bg-[color:var(--color-gold)] text-[color:var(--color-bg)] border border-[color:var(--color-gold)]"
                          : "bg-transparent text-[color:var(--color-ink-muted)] border border-[color:var(--color-line)] hover:border-[color:var(--color-gold)]/50 hover:text-[color:var(--color-ink)]",
                      )}
                    >
                      {p.bundleNoun} {bi + 1}
                      {b.badgeKey === "gulfDuo" && (
                        <span className="ml-2 text-[10px] opacity-80">
                          {p.gulfDuoBadge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Fragrance list */}
            <div className="mt-8">
              <div className="text-[10px] tracking-[0.22em] uppercase text-[color:var(--color-ink-muted)] mb-3">
                {p.inThisBundle}
              </div>
              <AnimatePresence mode="wait">
                <motion.ul
                  key={active.id}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    reduce
                      ? { opacity: 0 }
                      : { opacity: 0, y: -8, transition: { duration: 0.15 } }
                  }
                  transition={{ duration: 0.3, ease: easeLuxe }}
                  className="space-y-4"
                >
                  {fragrances.map((f) => (
                    <li key={f.id} className="flex gap-4">
                      <div className="w-1.5 shrink-0 rounded-full bg-gradient-to-b from-[color:var(--color-gold)] to-transparent" />
                      <div className="min-w-0">
                        <div className="text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-ink-muted)]">
                          {f.house}
                        </div>
                        <div className="text-base sm:text-lg text-[color:var(--color-ink)] leading-snug">
                          {f.name}
                        </div>
                        <div className="mt-1 text-xs sm:text-sm text-[color:var(--color-ink-muted)] leading-relaxed">
                          {f.description[locale]}
                        </div>
                      </div>
                    </li>
                  ))}
                  {t.decantMl > 0 && (
                    <li className="flex gap-4 pt-3 border-t border-[color:var(--color-line-soft)]">
                      <div className="w-1.5 shrink-0 rounded-full bg-[color:var(--color-gold)]" />
                      <div className="min-w-0">
                        <div className="text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-gold)]">
                          {locale === "fr" ? "Cadeau" : "Bonus"}
                        </div>
                        <div className="text-base text-[color:var(--color-gold)] leading-snug">
                          {p.freeDecant.replace("{n}", String(t.decantMl))}
                        </div>
                      </div>
                    </li>
                  )}
                </motion.ul>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Inline order form */}
        <OrderSection
          locale={locale}
          bundle={active}
          price={price}
        />
      </div>

      {/* Mobile-only sticky "Order" CTA — jumps to the form */}
      <StickyOrderCta locale={locale} price={price} />
    </article>
  );
}

type Slide = { src: string; alt: string; kind: "composite" | "bottle" };

function BundleCarousel({
  bundle,
  fragrances,
  tierLabel,
  locale,
  showBestValue,
  showPopular,
  bestValueLabel,
  popularLabel,
}: {
  bundle: Bundle;
  fragrances: Fragrance[];
  tierLabel: string;
  locale: Locale;
  showBestValue: boolean;
  showPopular: boolean;
  bestValueLabel: string;
  popularLabel: string;
}) {
  const reduce = useReducedMotion();
  const slides: Slide[] = [
    {
      src: `/img/bundles/${bundle.id}.png`,
      alt:
        locale === "fr"
          ? `Bundle ${tierLabel} — vue d'ensemble`
          : `${tierLabel} bundle — overview`,
      kind: "composite",
    },
    ...fragrances.map((f) => ({
      src: f.image,
      alt: `${f.house} ${f.name}`,
      kind: "bottle" as const,
    })),
  ];

  const [index, setIndex] = useState(0);
  const total = slides.length;
  const go = (delta: number) =>
    setIndex((i) => (i + delta + total) % total);

  // Keyboard arrows when carousel area has focus
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  const active = slides[index];

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">
      {/* Thumbnails — horizontal scroll on mobile, vertical column on desktop */}
      <div
        className="flex sm:flex-col gap-2 sm:gap-2.5 overflow-x-auto sm:overflow-x-visible sm:overflow-y-auto no-scrollbar -mx-1 px-1 sm:mx-0 sm:px-0 sm:max-h-[480px] sm:w-20 shrink-0"
        role="tablist"
        aria-label={locale === "fr" ? "Vues du bundle" : "Bundle views"}
      >
        {slides.map((s, i) => {
          const isActive = i === index;
          return (
            <button
              key={`${bundle.id}-${i}`}
              type="button"
              onClick={() => setIndex(i)}
              role="tab"
              aria-selected={isActive}
              aria-label={s.alt}
              className={cn(
                "relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border transition-all bg-[color:var(--color-bg-elev)]",
                isActive
                  ? "border-[color:var(--color-gold)] ring-2 ring-[color:var(--color-gold)]/30"
                  : "border-[color:var(--color-line)] opacity-60 hover:opacity-100 hover:border-[color:var(--color-gold)]/40",
              )}
            >
              <Image
                src={s.src}
                alt=""
                fill
                sizes="80px"
                className="object-contain"
              />
            </button>
          );
        })}
      </div>

      {/* Main image area */}
      <div className="relative flex-1">
        <div className="relative aspect-square rounded-3xl border border-[color:var(--color-line)] bg-gradient-to-b from-[color:var(--color-bg-elev)] to-[color:var(--color-bg)] overflow-hidden">
          <div className="absolute inset-0 opacity-60 pointer-events-none">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[120%] aspect-square rounded-full bg-[color:var(--color-gold)]/10 blur-3xl" />
          </div>

          {showBestValue && (
            <Badge className="top-5 right-5 border border-[color:var(--color-gold)] text-[color:var(--color-gold)] bg-[color:var(--color-bg)]/80 backdrop-blur">
              {bestValueLabel}
            </Badge>
          )}
          {showPopular && (
            <Badge className="top-5 left-5 bg-[color:var(--color-gold)] text-[color:var(--color-bg)]">
              {popularLabel}
            </Badge>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={`${bundle.id}-${index}`}
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={
                reduce
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.98, transition: { duration: 0.2 } }
              }
              transition={{ duration: 0.35, ease: easeLuxe }}
              className="absolute inset-0 flex items-center justify-center p-6 sm:p-10"
            >
              <Image
                src={active.src}
                alt={active.alt}
                fill
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 60vw, 560px"
                className="object-contain"
                priority={index === 0}
              />
            </motion.div>
          </AnimatePresence>

          {/* Nav arrows */}
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label={locale === "fr" ? "Précédent" : "Previous"}
                className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[color:var(--color-bg)]/70 backdrop-blur border border-[color:var(--color-line)] text-[color:var(--color-ink-muted)] hover:text-[color:var(--color-ink)] hover:border-[color:var(--color-gold)]/40 flex items-center justify-center transition"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label={locale === "fr" ? "Suivant" : "Next"}
                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[color:var(--color-bg)]/70 backdrop-blur border border-[color:var(--color-line)] text-[color:var(--color-ink-muted)] hover:text-[color:var(--color-ink)] hover:border-[color:var(--color-gold)]/40 flex items-center justify-center transition"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Slide indicator dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {slides.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1 rounded-full transition-all",
                  i === index
                    ? "w-6 bg-[color:var(--color-gold)]"
                    : "w-1.5 bg-[color:var(--color-line)]",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StickyOrderCta({ locale, price }: { locale: Locale; price: number }) {
  const [show, setShow] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    const target = document.getElementById("order");
    if (!target) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        // Hide when the form/summary section is meaningfully in view
        setShow(!entry.isIntersecting);
      },
      { rootMargin: "0px 0px -25% 0px", threshold: 0 },
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={reduce ? { opacity: 0 } : { y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 340, damping: 32 }}
          className="md:hidden fixed left-0 right-0 z-40 px-3 pt-3 pb-[calc(env(safe-area-inset-bottom,0px)+12px)]"
          style={{ bottom: 0 }}
        >
          <a
            href="#order"
            className="cta-glint mx-auto max-w-md flex items-center justify-between gap-3 px-5 py-3.5 rounded-full bg-[color:var(--color-gold)] text-[color:var(--color-bg)] font-medium text-sm hover:bg-[color:var(--color-gold-hi)] shadow-[0_18px_40px_-12px_rgba(200,160,82,0.6)]"
          >
            <span className="tabular-nums">
              {locale === "fr" ? "Commander" : "Order"} · {price} DH
            </span>
            <ArrowDown className="w-4 h-4" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ============================================================
 * Inline order section
 * ============================================================ */

function OrderSection({
  locale,
  bundle,
  price,
}: {
  locale: Locale;
  bundle: Bundle;
  price: number;
}) {
  const t = getDict(locale).checkout;
  const p = getDict(locale).packs;
  const tier = tiers[bundle.tier];
  const tierCopy = p.perks[bundle.tier];

  const [form, setForm] = useState({ name: "", phone: "", city: "", address: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const reduce = useReducedMotion();

  const valid =
    form.name.trim() && form.phone.trim() && form.city.trim() && form.address.trim();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) {
      setError(t.requiredHint);
      return;
    }
    setError(null);
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setDone(true);
  }

  if (done) {
    return (
      <motion.section
        id="order"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeLuxe }}
        className="mt-16 sm:mt-24 max-w-2xl mx-auto text-center"
      >
        <div className="mx-auto w-16 h-16 rounded-full bg-[color:var(--color-gold)] text-[color:var(--color-bg)] flex items-center justify-center mb-6 shadow-[0_20px_40px_-10px_rgba(200,160,82,0.5)]">
          <Check className="w-7 h-7" />
        </div>
        <h2 className="font-display text-4xl text-[color:var(--color-ink)]">
          {t.successTitle}
        </h2>
        <p className="mt-4 text-[color:var(--color-ink-muted)]">{t.successBody}</p>
        <Link
          href={`/${locale}#packs`}
          className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[color:var(--color-gold)] text-[color:var(--color-gold)] hover:bg-[color:var(--color-accent-soft)] transition"
        >
          {t.successAgain}
        </Link>
      </motion.section>
    );
  }

  return (
    <section
      id="order"
      className="mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-[color:var(--color-line-soft)]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Summary (left on desktop, top on mobile) */}
        <aside className="lg:col-span-5 order-2 lg:order-1">
          <div className="lg:sticky lg:top-24 glass rounded-3xl p-6 sm:p-7 elev-card">
            <div className="text-[11px] tracking-[0.22em] uppercase text-[color:var(--color-gold)]">
              {t.summary}
            </div>
            <div className="mt-1 font-display text-2xl text-[color:var(--color-ink)]">
              {tierCopy.name} · {p.bundleNoun}
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {bundle.fragrances.map((id, i) => {
                const f = getFragrance(id);
                return (
                  <li
                    key={id}
                    className="flex items-baseline gap-2 text-[color:var(--color-ink)]"
                  >
                    <span className="font-display text-xs text-[color:var(--color-gold)]/70 tabular-nums w-5 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="leading-tight">{f.name}</div>
                      <div className="text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-ink-muted)]">
                        {f.house}
                      </div>
                    </div>
                  </li>
                );
              })}
              {tier.decantMl > 0 && (
                <li className="flex items-baseline gap-2 pt-2 border-t border-[color:var(--color-line-soft)] text-[color:var(--color-gold)]">
                  <span className="font-display text-xs w-5 shrink-0">+</span>
                  <span>
                    {p.freeDecant.replace("{n}", String(tier.decantMl))}
                  </span>
                </li>
              )}
            </ul>
            <div className="mt-5 pt-4 border-t border-[color:var(--color-line-soft)] space-y-2 text-sm">
              <Row label={t.subtotal} value={`${price} DH`} />
              <Row label={t.shipping} value={tier.freeShipping ? p.freeShipping : locale === "fr" ? "35 DH" : "35 DH"} faded />
            </div>
            <div className="mt-3 pt-4 border-t border-[color:var(--color-line-soft)] flex items-baseline justify-between">
              <span className="text-[11px] tracking-[0.22em] uppercase text-[color:var(--color-ink-muted)]">
                {t.total}
              </span>
              <span className="font-display text-3xl text-[color:var(--color-gold)] tabular-nums">
                {tier.freeShipping ? price : price + 35}
                <span className="ml-1 text-base text-[color:var(--color-ink-muted)]">DH</span>
              </span>
            </div>
          </div>
        </aside>

        {/* Form (right on desktop, bottom on mobile) */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <h2 className="font-display text-3xl sm:text-4xl text-[color:var(--color-ink)]">
            {t.title}
          </h2>
          <p className="mt-2 text-sm text-[color:var(--color-ink-muted)]">
            {t.sub}
          </p>

          <form onSubmit={submit} className="mt-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label={t.name}
                value={form.name}
                onChange={(v) => setForm({ ...form, name: v })}
                autoComplete="name"
              />
              <Field
                label={t.phone}
                value={form.phone}
                onChange={(v) => setForm({ ...form, phone: v })}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="06 xx xx xx xx"
              />
            </div>
            <Field
              label={t.city}
              value={form.city}
              onChange={(v) => setForm({ ...form, city: v })}
              autoComplete="address-level2"
              placeholder={t.cityPlaceholder}
            />
            <Field
              label={t.address}
              value={form.address}
              onChange={(v) => setForm({ ...form, address: v })}
              autoComplete="street-address"
              placeholder={t.addressPlaceholder}
            />

            {error && (
              <p role="alert" className="text-sm text-[color:var(--color-danger)]">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="cta-glint mt-2 w-full inline-flex items-center justify-center gap-2 py-4 rounded-full text-sm font-medium bg-[color:var(--color-gold)] text-[color:var(--color-bg)] hover:bg-[color:var(--color-gold-hi)] shadow-[0_20px_40px_-12px_rgba(200,160,82,0.45)] transition-all"
            >
              {submitting ? t.placing : `${t.placeOrder} · ${price} DH`}
              {!submitting && <ArrowRight className="w-4 h-4" />}
            </button>
            <p className="text-[11px] text-center text-[color:var(--color-ink-dim)]">
              {t.legal}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * Helpers
 * ============================================================ */

function Field({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  inputMode,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="block text-[11px] tracking-[0.18em] uppercase text-[color:var(--color-ink-muted)] mb-1.5">
        {label}
      </span>
      <input
        type={type}
        value={value}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-[color:var(--color-bg)] border border-[color:var(--color-line)] text-[color:var(--color-ink)] placeholder:text-[color:var(--color-ink-dim)] focus:border-[color:var(--color-gold)]/60 outline-none transition min-h-[48px]"
      />
    </label>
  );
}

function Row({
  label,
  value,
  faded,
}: {
  label: string;
  value: string;
  faded?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[color:var(--color-ink-muted)]">{label}</span>
      <span
        className={
          faded
            ? "text-[color:var(--color-gold)]"
            : "text-[color:var(--color-ink)]"
        }
      >
        {value}
      </span>
    </div>
  );
}

function Badge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "absolute px-3 py-1.5 rounded-full text-[10px] tracking-[0.22em] uppercase font-medium z-10",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* Icons */
function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ArrowLeft({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M19 12H5M11 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ArrowDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 5v14M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function Check({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
    >
      <path d="M4 12.5l5 5L20 6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
