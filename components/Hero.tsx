"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Locale, getDict } from "@/lib/i18n";
import blackCase from "@/public/img/travel-case-black.png";
import brownCase from "@/public/img/travel-case-brown.png";

const easeLuxe = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeLuxe } },
} as const;

const SLIDES = [
  { src: blackCase,  label: "Black", dot: "#2a2a2a" },
  { src: brownCase, label: "Brown", dot: "#8B5E3C" },
];

export default function Hero({ locale }: { locale: Locale }) {
  const d = getDict(locale).hero;
  const t = getDict(locale).trust;
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden pt-28 sm:pt-36 pb-20 sm:pb-32">
      {/* Background field */}
      <div aria-hidden className="absolute inset-0 vignette" />
      <div aria-hidden className="absolute inset-0 -z-10 opacity-60">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[140%] aspect-square">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-700/20 via-amber-500/10 to-transparent blur-3xl animate-drift" style={{ willChange: "transform" }} />
          <div className="absolute inset-20 rounded-full bg-gradient-to-tr from-rose-900/20 via-amber-700/15 to-transparent blur-3xl animate-drift" style={{ animationDelay: "-8s", willChange: "transform" }} />
          <div className="absolute inset-40 rounded-full bg-gradient-to-bl from-amber-300/10 via-transparent to-transparent blur-2xl animate-drift" style={{ animationDelay: "-16s", willChange: "transform" }} />
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">

        {/* ── Title ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: 0.05 } },
          }}
          className="max-w-2xl"
        >
          <h1 className="font-display text-[clamp(2.8rem,7vw,5.8rem)] leading-[0.95] tracking-tight">
            <TitleLine text={d.titleA} className="text-[color:var(--color-ink)]" />
            <TitleLine text={d.titleB} className="italic text-[color:var(--color-ink)]" />
            <TitleLine text={d.titleC} className="text-[#C8A052]" />
          </h1>
        </motion.div>

        {/* ── Carousel ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeLuxe, delay: 0.35 }}
          className="mt-10 sm:mt-12"
        >
          <HeroCarousel locale={locale} reduce={!!reduce} />
        </motion.div>

        {/* ── Sub-text + CTAs ── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: reduce ? 0 : 0.09, delayChildren: 0.6 } },
          }}
          className="mt-10 sm:mt-12 max-w-xl"
        >
          <motion.p
            variants={fadeUp}
            className="text-[color:var(--color-ink-muted)] text-base sm:text-lg leading-relaxed"
          >
            {d.sub}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
            <motion.a
              href="#packs"
              whileHover={reduce ? undefined : { scale: 1.04, y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
              transition={{ type: "spring", stiffness: 360, damping: 22 }}
              className="cta-glint group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[color:var(--color-gold)] text-[color:var(--color-bg)] font-medium text-sm tracking-wide hover:bg-[color:var(--color-gold-hi)] hover:shadow-[0_20px_40px_-10px_rgba(200,160,82,0.4)]"
            >
              {d.ctaPrimary}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.a>
            <motion.a
              href="#story"
              whileHover={reduce ? undefined : { scale: 1.03, y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
              transition={{ type: "spring", stiffness: 360, damping: 22 }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[color:var(--color-line)] text-[color:var(--color-ink)] text-sm tracking-wide hover:border-[color:var(--color-gold)]/60 hover:bg-[color:var(--color-accent-soft)]"
            >
              {d.ctaSecondary}
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Trust strip */}
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 mt-20 sm:mt-28">
        <div className="gold-rule reveal mb-8" />
        <motion.ul
          className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5 text-center md:text-left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
        >
          {[
            { i: <Lock className="w-4 h-4" />, t: t.secure },
            { i: <Cash className="w-4 h-4" />, t: t.codAvail },
            { i: <Truck className="w-4 h-4" />, t: t.delivery },
            { i: <Flask className="w-4 h-4" />, t: t.authentic },
          ].map((b, idx) => (
            <motion.li
              key={idx}
              variants={fadeUp}
              className="flex items-center gap-3 justify-center md:justify-start text-xs sm:text-sm text-[color:var(--color-ink-muted)]"
            >
              <span className="text-[color:var(--color-gold)]">{b.i}</span>
              <span>{b.t}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Full-bleed one-at-a-time carousel
───────────────────────────────────────────── */
function HeroCarousel({ locale, reduce }: { locale: Locale; reduce: boolean }) {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (idx: number) => {
    setDir(idx > active ? 1 : -1);
    setActive(idx);
  };

  const next = () => { setDir(1);  setActive((p) => (p + 1) % SLIDES.length); };
  const prev = () => { setDir(-1); setActive((p) => (p - 1 + SLIDES.length) % SLIDES.length); };

  // Auto-advance every 5 s
  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const alts =
    locale === "fr"
      ? ["Étui de voyage noir avec décants 10 ml.", "Étui de voyage brun avec décants 10 ml."]
      : ["Black travel case with 10 ml decants.", "Brown travel case with 10 ml decants."];

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * 60 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeLuxe } },
    exit: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * -60, transition: { duration: 0.4, ease: easeLuxe } }),
  };

  const DRAG_THRESHOLD = 50; // px

  return (
    <div className="relative">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[48px] blur-3xl opacity-25 transition-colors duration-1000"
        style={{ background: `radial-gradient(ellipse at 50% 60%, ${SLIDES[active].dot}88, transparent 70%)` }}
      />

      {/* Image frame — intrinsic size, no crop */}
      <div className="relative w-full overflow-hidden rounded-[28px] sm:rounded-[36px] border border-white/10 elev-card bg-[color:var(--color-bg)]">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={active}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            /* ── drag to swipe ── */
            drag={reduce ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              if (info.offset.x < -DRAG_THRESHOLD) next();
              else if (info.offset.x > DRAG_THRESHOLD) prev();
            }}
            className="w-full cursor-grab active:cursor-grabbing"
          >
            <Image
              src={SLIDES[active].src}
              alt={alts[active]}
              priority={active === 0}
              draggable={false}
              quality={90}
              sizes="(max-width: 640px) 95vw, (max-width: 1024px) 85vw, 1100px"
              style={{ width: "100%", height: "auto", display: "block", pointerEvents: "none" }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Top gold shimmer */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-gold)]/60 to-transparent" />
      </div>

      {/* Dot indicators */}
      <div className="mt-5 flex items-center justify-center gap-2.5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="h-1.5 rounded-full transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-gold)]"
            style={{
              width: i === active ? "2rem" : "0.375rem",
              background: i === active ? "var(--color-gold)" : "rgba(255,255,255,0.25)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── TitleLine — space fix: whitespace sits outside overflow-hidden ─── */
function TitleLine({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={`block ${className ?? ""}`}>
      {words.map((w, i) => (
        <span key={i}>
          <span className="inline-block overflow-hidden align-baseline pb-[0.05em]">
            <motion.span
              className="inline-block will-change-transform"
              variants={{
                hidden: { y: "110%" },
                visible: { y: 0, transition: { duration: 0.8, ease: easeLuxe } },
              }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </span>
  );
}

/* ─── Icon helpers ─── */
function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
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
function Cash({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="7" width="18" height="11" rx="2" />
      <circle cx="12" cy="12.5" r="2.4" />
      <path d="M6 10v5M18 10v5" />
    </svg>
  );
}
function Truck({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </svg>
  );
}
function Flask({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M9 3h6M10 3v6L5 19a2 2 0 0 0 1.7 3h10.6A2 2 0 0 0 19 19l-5-10V3" />
    </svg>
  );
}
