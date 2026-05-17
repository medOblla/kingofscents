"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Locale, getDict } from "@/lib/i18n";
import { catalog, Family, Fragrance, getFragranceById } from "@/lib/catalog";
import { cn } from "@/lib/cn";
import { SectionHeader } from "./HowItWorks";

type PackSize = 2 | 3 | 4;

const PACK_PRICES: Record<PackSize, number> = { 2: 180, 3: 250, 4: 310 };
const PACK_REG: Record<PackSize, number> = { 2: 240, 3: 360, 4: 480 };
const SHIPPING_FREE_OVER = 250;

export default function ShopExperience({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const c = d.composer;
  const p = d.packs;

  const [pack, setPack] = useState<PackSize | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [family, setFamily] = useState<Family | "all">("all");
  const [q, setQ] = useState("");
  const [step, setStep] = useState<"compose" | "checkout" | "done">("compose");

  // Reset selection when pack changes; trim if shrinking.
  useEffect(() => {
    if (pack == null) return;
    setSelected((cur) => cur.slice(0, pack));
  }, [pack]);

  const filtered = useMemo(() => {
    return catalog.filter((f) => {
      const familyOk = family === "all" || f.family === family;
      const qt = q.trim().toLowerCase();
      const qOk = !qt || f.name.toLowerCase().includes(qt) || f.house.toLowerCase().includes(qt);
      return familyOk && qOk;
    });
  }, [family, q]);

  function toggle(id: string) {
    if (pack == null) {
      setPack(3); // sensible default if user clicks a fragrance first
      setSelected([id]);
      scrollToId("composer");
      return;
    }
    setSelected((cur) => {
      if (cur.includes(id)) return cur.filter((x) => x !== id);
      if (cur.length >= pack) {
        // Replace oldest selection — feels generous, not blocking.
        return [...cur.slice(1), id];
      }
      return [...cur, id];
    });
  }

  function remove(id: string) {
    setSelected((cur) => cur.filter((x) => x !== id));
  }

  const subtotal = pack ? PACK_PRICES[pack] : 0;
  const shipping = !pack ? 0 : subtotal >= SHIPPING_FREE_OVER ? 0 : 25;
  const total = subtotal + shipping;
  const filled = selected.length;
  const isReady = pack != null && filled === pack;

  const onProceed = () => {
    if (!isReady) return;
    setStep("checkout");
    scrollToId("checkout");
  };

  return (
    <>
      {/* PACKS */}
      <section id="packs" className="relative py-24 sm:py-32 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeader
            eyebrow={locale === "fr" ? "Étape 1" : "Step 1"}
            title={p.title}
            sub={p.sub}
          />

          <div className="reveal-stagger mt-14 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6" style={{ ["--stagger" as string]: "140ms" }}>
            {p.items.map((item) => {
              const isActive = pack === item.id;
              const savings = item.reg - item.price;
              const perDecant = Math.round(item.price / item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setPack(item.id);
                    scrollToId("composer");
                  }}
                  className={cn(
                    "group relative text-left rounded-3xl p-7 sm:p-8 transition-all duration-500 elev-card",
                    "border bg-[color:var(--color-bg-elev)]",
                    isActive
                      ? "border-[color:var(--color-gold)] bg-gradient-to-b from-[color:var(--color-bg-elev)] to-[color:var(--color-bg)] -translate-y-1 shadow-[0_30px_60px_-20px_rgba(200,160,82,0.35)]"
                      : "border-[color:var(--color-line)] hover:border-[color:var(--color-gold)]/40 hover:-translate-y-1"
                  )}
                >
                  {item.id === 3 && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[color:var(--color-gold)] text-[color:var(--color-bg)] text-[10px] tracking-[0.18em] uppercase font-medium">
                      {p.popular}
                    </div>
                  )}
                  {item.id === 4 && (
                    <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-[color:var(--color-bg)] border border-[color:var(--color-gold)] text-[color:var(--color-gold)] text-[10px] tracking-[0.18em] uppercase">
                      {p.bestValue}
                    </div>
                  )}

                  {/* Pack visual: stacked vials */}
                  <div className="relative h-32 sm:h-36 -mt-2 mb-6 flex items-end justify-center gap-1.5">
                    {Array.from({ length: item.id }).map((_, i) => (
                      <span
                        key={i}
                        className={cn(
                          "w-5 sm:w-6 rounded-t-md rounded-b-sm border-t border-[color:var(--color-gold)] transition-all duration-500",
                          isActive ? "shadow-[0_0_30px_rgba(200,160,82,0.3)]" : ""
                        )}
                        style={{
                          height: `${70 + i * 8}%`,
                          background: `linear-gradient(180deg, rgba(200,160,82,0.0) 0%, rgba(200,160,82,0.15) 35%, rgba(${[
                            "200,160,82",
                            "230,199,122",
                            "200,160,82",
                            "142,110,44",
                          ][i % 4]},0.55) 100%)`,
                        }}
                      />
                    ))}
                  </div>

                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-xs tracking-[0.18em] uppercase text-[color:var(--color-ink-muted)]">
                        {item.id} × 10 ml
                      </div>
                      <h3 className="font-display text-2xl sm:text-3xl mt-1 text-[color:var(--color-ink)]">{item.name}</h3>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-[color:var(--color-ink-muted)]">{item.subtitle}</p>

                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="font-display text-4xl sm:text-5xl text-[color:var(--color-ink)]">{item.price}</span>
                    <span className="text-sm text-[color:var(--color-ink-muted)]">DH</span>
                    <span className="ml-2 text-sm text-[color:var(--color-ink-dim)] line-through">{item.reg} DH</span>
                  </div>
                  <div className="text-xs text-[color:var(--color-ink-muted)] mt-1">
                    {perDecant} DH {p.perDecant} · {p.save} {savings} DH
                  </div>

                  <ul className="mt-6 space-y-2 text-sm text-[color:var(--color-ink-muted)]">
                    {item.perks.map((perk, i) => (
                      <li key={i} className="flex items-center gap-2.5">
                        <Plus className="w-3.5 h-3.5 text-[color:var(--color-gold)]" />
                        {perk}
                      </li>
                    ))}
                  </ul>

                  <div
                    className={cn(
                      "mt-7 inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all",
                      isActive
                        ? "bg-[color:var(--color-gold)] text-[color:var(--color-bg)]"
                        : "bg-[color:var(--color-ink)] text-[color:var(--color-bg)] group-hover:bg-[color:var(--color-gold)]"
                    )}
                  >
                    {isActive ? (locale === "fr" ? "Sélectionné" : "Selected") : p.chooseCta}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* COMPOSER */}
      <section id="composer" className="relative py-24 sm:py-32 scroll-mt-24 bg-gradient-to-b from-[color:var(--color-bg)] via-[color:var(--color-bg-elev)] to-[color:var(--color-bg)]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeader
            eyebrow={locale === "fr" ? "Étape 2" : "Step 2"}
            title={c.title}
            sub={pack ? c.subWith.replace("{n}", String(pack)) : c.selectPackFirst}
          />

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Catalog */}
            <div className="lg:col-span-8" id="fragrances">
              {/* Progress + filters */}
              <div className="flex flex-col gap-4 mb-7">
                {pack != null && (
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm text-[color:var(--color-ink-muted)]">
                      {c.progress.replace("{filled}", String(filled)).replace("{total}", String(pack))}
                    </div>
                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: pack }).map((_, i) => (
                        <span
                          key={i}
                          className={cn(
                            "h-1.5 rounded-full transition-all duration-500",
                            i < filled ? "w-8 bg-[color:var(--color-gold)]" : "w-4 bg-[color:var(--color-line)]"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[color:var(--color-ink-dim)]" />
                    <input
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder={c.searchPlaceholder}
                      className="w-full pl-11 pr-4 py-3 rounded-full bg-[color:var(--color-bg-elev)] border border-[color:var(--color-line)] text-sm text-[color:var(--color-ink)] placeholder:text-[color:var(--color-ink-dim)] focus:border-[color:var(--color-gold)]/60 outline-none transition"
                    />
                  </div>
                  <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1">
                    {(["all", "fresh", "oriental", "woody", "floral", "gourmand", "spicy"] as const).map((fam) => (
                      <button
                        key={fam}
                        type="button"
                        onClick={() => setFamily(fam)}
                        className={cn(
                          "shrink-0 px-4 py-2 rounded-full text-xs tracking-wide border transition-colors",
                          family === fam
                            ? "bg-[color:var(--color-gold)] text-[color:var(--color-bg)] border-[color:var(--color-gold)]"
                            : "border-[color:var(--color-line)] text-[color:var(--color-ink-muted)] hover:border-[color:var(--color-gold)]/40"
                        )}
                      >
                        {fam === "all" ? c.filterAll : c.family[fam as keyof typeof c.family]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4" style={{ ["--stagger" as string]: "40ms" }}>
                {filtered.map((f) => {
                  const isSelected = selected.includes(f.id);
                  return (
                    <FragranceCard
                      key={f.id}
                      f={f}
                      locale={locale}
                      selected={isSelected}
                      onToggle={() => toggle(f.id)}
                      disabled={false}
                    />
                  );
                })}
              </div>
            </div>

            {/* Sticky Cart */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24">
                <div className="glass rounded-3xl p-6 sm:p-7 elev-card">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl">{c.summary}</h3>
                    {pack != null && (
                      <span className="text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-gold)] px-2 py-1 rounded-full border border-[color:var(--color-gold)]/40">
                        {filled}/{pack}
                      </span>
                    )}
                  </div>
                  <div className="gold-rule my-5" />

                  {pack == null ? (
                    <p className="text-sm text-[color:var(--color-ink-muted)] py-6">
                      {c.selectPackFirst}
                    </p>
                  ) : selected.length === 0 ? (
                    <p className="text-sm text-[color:var(--color-ink-muted)] py-6">{c.empty}</p>
                  ) : (
                    <ul className="space-y-3">
                      {selected.map((id, i) => {
                        const f = getFragranceById(id)!;
                        return (
                          <li key={id} className="flex items-center gap-3 group">
                            <span className={cn("w-9 h-12 rounded-md bg-gradient-to-b shrink-0 border border-white/10", f.gradient)} />
                            <div className="flex-1 min-w-0">
                              <div className="text-xs text-[color:var(--color-ink-dim)] uppercase tracking-wider truncate">{f.house}</div>
                              <div className="text-sm text-[color:var(--color-ink)] truncate">{f.name}</div>
                            </div>
                            <button
                              type="button"
                              onClick={() => remove(id)}
                              aria-label={c.remove}
                              className="p-1.5 rounded-full text-[color:var(--color-ink-dim)] hover:text-[color:var(--color-danger)] hover:bg-[color:var(--color-bg-elev-2)] transition"
                            >
                              <Close className="w-3.5 h-3.5" />
                            </button>
                          </li>
                        );
                      })}
                      {Array.from({ length: pack - selected.length }).map((_, i) => (
                        <li key={`ghost-${i}`} className="flex items-center gap-3 opacity-50">
                          <span className="w-9 h-12 rounded-md border border-dashed border-[color:var(--color-line)] shrink-0" />
                          <div className="text-sm text-[color:var(--color-ink-dim)]">
                            {locale === "fr" ? "Emplacement libre" : "Open slot"}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-6 space-y-2 text-sm">
                    <Row label={c.subtotal} value={pack ? `${subtotal} DH` : "—"} />
                    <Row
                      label={c.shipping}
                      value={pack ? (shipping === 0 ? c.shippingFree : `${shipping} DH`) : "—"}
                      faded={shipping === 0 && pack != null}
                    />
                  </div>
                  <div className="gold-rule my-5" />
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-lg">{c.total}</span>
                    <span className="font-display text-2xl">
                      {pack ? `${total}` : "—"} <span className="text-sm text-[color:var(--color-ink-muted)]">DH</span>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={onProceed}
                    disabled={!isReady}
                    className={cn(
                      "mt-6 w-full inline-flex items-center justify-center gap-2 py-4 rounded-full text-sm font-medium transition-all duration-300",
                      isReady
                        ? "bg-[color:var(--color-gold)] text-[color:var(--color-bg)] hover:bg-[color:var(--color-gold-hi)] shadow-[0_20px_40px_-12px_rgba(200,160,82,0.45)]"
                        : "bg-[color:var(--color-bg-elev-2)] text-[color:var(--color-ink-dim)] cursor-not-allowed"
                    )}
                  >
                    {isReady ? c.proceed : c.completeYourPack}
                    {isReady && <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* CHECKOUT */}
      <section id="checkout" className="relative py-24 sm:py-32 scroll-mt-24">
        <div className={cn("mx-auto px-5 sm:px-8", step === "done" || !isReady ? "max-w-3xl" : "max-w-6xl")}>
          {step === "done" ? (
            <SuccessCard locale={locale} reset={() => { setStep("compose"); setPack(null); setSelected([]); }} />
          ) : (
            <>
              <SectionHeader
                eyebrow={locale === "fr" ? "Étape 3" : "Step 3"}
                title={d.checkout.title}
                sub={d.checkout.sub}
              />
              {isReady ? (
                <CheckoutForm
                  locale={locale}
                  packSize={pack}
                  selected={selected}
                  total={total}
                  onDone={() => setStep("done")}
                />
              ) : (
                <CheckoutLocked
                  locale={locale}
                  hasPack={pack != null}
                  filled={filled}
                  packSize={pack}
                />
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}

function FragranceCard({
  f,
  locale,
  selected,
  onToggle,
  disabled,
}: {
  f: Fragrance;
  locale: Locale;
  selected: boolean;
  onToggle: () => void;
  disabled?: boolean;
}) {
  const c = getDict(locale).composer;
  const familyLabel = c.family[f.family];
  const genderLabel = f.gender === "him" ? c.forHim : f.gender === "her" ? c.forHer : c.forUnisex;
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      className={cn(
        "group relative text-left rounded-2xl overflow-hidden border transition-all duration-500",
        "bg-[color:var(--color-bg-elev)] hover:-translate-y-0.5 elev-card",
        selected
          ? "border-[color:var(--color-gold)] shadow-[0_30px_60px_-20px_rgba(200,160,82,0.35)]"
          : "border-[color:var(--color-line)] hover:border-[color:var(--color-gold)]/40"
      )}
    >
      {/* Top art */}
      <div className="relative h-44 overflow-hidden">
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-90 group-hover:scale-105 transition-transform duration-1000", f.gradient)} />
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-bg-elev)] via-transparent to-transparent" />
        {/* Mini bottle silhouette */}
        <div className="absolute inset-x-0 bottom-3 flex justify-center">
          <div className="relative w-12 h-20">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-2 bg-gradient-to-b from-[color:var(--color-gold-hi)] to-[color:var(--color-gold-lo)] rounded-sm" />
            <div className="absolute inset-x-0 top-2 bottom-0 rounded-md border border-white/30 bg-white/10 backdrop-blur-sm" />
            <div className="absolute top-4 left-1/2 -translate-x-1/2 h-px w-6 bg-[color:var(--color-gold)]/70" />
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] tracking-widest text-white/90">10 ml</div>
          </div>
        </div>
        {selected && (
          <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[color:var(--color-gold)] text-[color:var(--color-bg)] flex items-center justify-center">
            <Check className="w-4 h-4" />
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-ink-dim)] truncate">{f.house}</div>
            <h3 className="font-display text-lg sm:text-xl text-[color:var(--color-ink)] leading-tight">{f.name}</h3>
          </div>
          <span className="text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-gold)] shrink-0 mt-1">{familyLabel}</span>
        </div>
        <p className="mt-2 text-xs text-[color:var(--color-ink-muted)] line-clamp-2 leading-relaxed">
          {f.description[locale]}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {f.notes[locale].slice(0, 3).map((n) => (
            <span key={n} className="text-[10px] px-2 py-0.5 rounded-full bg-[color:var(--color-bg)] text-[color:var(--color-ink-muted)] border border-[color:var(--color-line-soft)]">
              {n}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-[10px] tracking-[0.18em] uppercase text-[color:var(--color-ink-dim)]">{genderLabel}</span>
          <span
            className={cn(
              "inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-colors",
              selected
                ? "bg-[color:var(--color-gold)] text-[color:var(--color-bg)]"
                : "bg-[color:var(--color-bg)] text-[color:var(--color-ink)] border border-[color:var(--color-line)] group-hover:border-[color:var(--color-gold)]/60"
            )}
          >
            {selected ? c.addedCta : c.addCta}
            {selected ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
          </span>
        </div>
      </div>
    </button>
  );
}

function Row({ label, value, faded }: { label: string; value: string; faded?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[color:var(--color-ink-muted)]">{label}</span>
      <span className={faded ? "text-[color:var(--color-gold)]" : "text-[color:var(--color-ink)]"}>{value}</span>
    </div>
  );
}

function CheckoutLocked({
  locale,
  hasPack,
  filled,
  packSize,
}: {
  locale: Locale;
  hasPack: boolean;
  filled: number;
  packSize: 2 | 3 | 4 | null;
}) {
  const isFr = locale === "fr";
  return (
    <div className="mt-10 glass rounded-3xl px-6 sm:px-10 py-12 text-center">
      <div className="mx-auto w-12 h-12 rounded-full border border-[color:var(--color-gold)]/40 flex items-center justify-center text-[color:var(--color-gold)] mb-5">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="5" y="11" width="14" height="9" rx="2" />
          <path d="M8 11V8a4 4 0 0 1 8 0v3" />
        </svg>
      </div>
      <p className="font-display text-2xl sm:text-3xl text-[color:var(--color-ink)]">
        {!hasPack
          ? isFr
            ? "Commencez par choisir un pack."
            : "Start by picking a pack."
          : isFr
          ? `Plus que ${packSize! - filled} parfum${packSize! - filled > 1 ? "s" : ""} à choisir.`
          : `${packSize! - filled} more fragrance${packSize! - filled > 1 ? "s" : ""} to pick.`}
      </p>
      <p className="mt-2 text-sm text-[color:var(--color-ink-muted)]">
        {!hasPack
          ? isFr
            ? "Le formulaire de commande s'affichera dès que votre pack sera complet."
            : "The checkout form will appear as soon as your pack is complete."
          : isFr
          ? "Remplissez votre pack pour activer la commande."
          : "Complete your pack to enable checkout."}
      </p>
      <a
        href={hasPack ? "#composer" : "#packs"}
        className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[color:var(--color-gold)] text-[color:var(--color-gold)] hover:bg-[color:var(--color-accent-soft)] transition text-sm"
      >
        {hasPack
          ? isFr
            ? "Composer mon pack"
            : "Compose my pack"
          : isFr
          ? "Voir les packs"
          : "Browse packs"}
      </a>
    </div>
  );
}

function CheckoutForm({
  locale,
  packSize,
  selected,
  total,
  onDone,
}: {
  locale: Locale;
  packSize: 2 | 3 | 4 | null;
  selected: string[];
  total: number;
  onDone: () => void;
}) {
  const t = getDict(locale).checkout;
  const [form, setForm] = useState({ name: "", phone: "", city: "", address: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const valid = form.name.trim() && form.phone.trim() && form.city.trim() && form.address.trim();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) {
      setError(t.requiredHint);
      return;
    }
    setError(null);
    setSubmitting(true);
    // Simulated order placement — wire to your API/webhook here.
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    onDone();
  }

  return (
    <form onSubmit={submit} className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
      {/* Order summary — left on desktop, top on mobile */}
      <aside className="lg:col-span-5 lg:sticky lg:top-24">
        <div className="glass elev-card rounded-3xl p-6 sm:p-8">
          <div className="flex items-center justify-between mb-5">
            <span className="text-[11px] tracking-[0.22em] uppercase text-[color:var(--color-gold)]">
              {locale === "fr" ? "Récapitulatif" : "Order summary"}
            </span>
            <span className="text-[11px] tracking-[0.16em] uppercase text-[color:var(--color-ink-muted)]">
              {packSize ? `${packSize} × 10 ml` : "—"}
            </span>
          </div>
          <ul className="space-y-4">
            {selected.map((id, i) => {
              const f = getFragranceById(id);
              if (!f) return null;
              return (
                <li key={id} className="flex items-baseline gap-3">
                  <span className="font-display text-sm text-[color:var(--color-gold)]/70 tabular-nums w-6 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="font-display text-lg leading-tight text-[color:var(--color-ink)]">{f.name}</div>
                    <div className="mt-0.5 text-[11px] tracking-[0.18em] uppercase text-[color:var(--color-ink-muted)]">
                      {f.house}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="mt-7 pt-5 border-t border-[color:var(--color-line-soft)] space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[color:var(--color-ink-muted)]">
                {locale === "fr" ? "Sous-total" : "Subtotal"}
              </span>
              <span className="text-[color:var(--color-ink)]">{total} DH</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[color:var(--color-ink-muted)]">{t.payCod}</span>
              <span className="text-[color:var(--color-gold)]">
                {locale === "fr" ? "Incluse" : "Included"}
              </span>
            </div>
            <div className="mt-1 flex items-baseline justify-between border-t border-[color:var(--color-line-soft)] pt-4">
              <span className="text-[11px] tracking-[0.22em] uppercase text-[color:var(--color-ink-muted)]">
                {locale === "fr" ? "Total" : "Total"}
              </span>
              <span className="font-display text-4xl text-[color:var(--color-gold)]">{total} <span className="text-xl text-[color:var(--color-ink-muted)]">DH</span></span>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex mt-5 px-2 items-center gap-2 text-[11px] text-[color:var(--color-ink-muted)]">
          <Lock className="w-3.5 h-3.5 text-[color:var(--color-gold)]" />
          <span>{locale === "fr" ? "Vos coordonnées restent privées." : "Your details stay private."}</span>
        </div>
      </aside>

      {/* Form — right on desktop */}
      <div className="lg:col-span-7 glass elev-card rounded-3xl p-6 sm:p-8 lg:p-10">
        <div className="mb-7">
          <h3 className="font-display text-2xl sm:text-3xl text-[color:var(--color-ink)]">
            {locale === "fr" ? "Livraison" : "Delivery"}
          </h3>
          <p className="mt-1 text-sm text-[color:var(--color-ink-muted)]">
            {locale === "fr"
              ? "Paiement à la livraison, partout au Maroc."
              : "Cash on delivery, anywhere in Morocco."}
          </p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label={t.name} value={form.name} onChange={(v) => setForm({ ...form, name: v })} autoComplete="name" />
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
        </div>

        {error && (
          <p role="alert" className="mt-4 text-sm text-[color:var(--color-danger)]">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="cta-glint mt-7 w-full inline-flex items-center justify-center gap-2 py-4 rounded-full text-sm font-medium bg-[color:var(--color-gold)] text-[color:var(--color-bg)] hover:bg-[color:var(--color-gold-hi)] shadow-[0_20px_40px_-12px_rgba(200,160,82,0.45)] transition-all"
        >
          {submitting ? t.placing : t.placeOrder}
          {!submitting && <ArrowRight className="w-4 h-4" />}
        </button>
        <p className="mt-3 text-[11px] text-center text-[color:var(--color-ink-dim)]">{t.legal}</p>
      </div>
    </form>
  );
}

function Lock({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  inputMode,
  placeholder,
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  placeholder?: string;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="block text-[11px] tracking-[0.18em] uppercase text-[color:var(--color-ink-muted)] mb-2">{label}</span>
      <input
        type={type}
        value={value}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-[color:var(--color-bg)] border border-[color:var(--color-line)] text-[color:var(--color-ink)] placeholder:text-[color:var(--color-ink-dim)] focus:border-[color:var(--color-gold)]/60 outline-none transition"
      />
    </label>
  );
}

function SuccessCard({ locale, reset }: { locale: Locale; reset: () => void }) {
  const t = getDict(locale).checkout;
  return (
    <div className="text-center max-w-2xl mx-auto py-10">
      <div className="mx-auto w-16 h-16 rounded-full bg-[color:var(--color-gold)] text-[color:var(--color-bg)] flex items-center justify-center mb-6 animate-float-up">
        <Check className="w-7 h-7" />
      </div>
      <h2 className="font-display text-4xl sm:text-5xl text-[color:var(--color-ink)]">{t.successTitle}</h2>
      <p className="mt-4 text-[color:var(--color-ink-muted)]">{t.successBody}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[color:var(--color-gold)] text-[color:var(--color-gold)] hover:bg-[color:var(--color-accent-soft)] transition"
      >
        {t.successAgain}
      </button>
    </div>
  );
}

function scrollToId(id: string) {
  if (typeof window === "undefined") return;
  requestAnimationFrame(() => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

/* Icons */
function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function Plus({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}
function Check({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
      <path d="M4 12.5l5 5L20 6.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function Close({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" />
    </svg>
  );
}
function Search({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="11" cy="11" r="6.5" />
      <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}
