"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { Locale, getDict } from "@/lib/i18n";
import heroImage from "@/public/img/hero.png";

const easeLuxe = [0.22, 1, 0.36, 1] as const;

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
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-700/20 via-amber-500/10 to-transparent blur-3xl animate-drift" />
          <div className="absolute inset-20 rounded-full bg-gradient-to-tr from-rose-900/20 via-amber-700/15 to-transparent blur-3xl animate-drift" style={{ animationDelay: "-8s" }} />
          <div className="absolute inset-40 rounded-full bg-gradient-to-bl from-amber-300/10 via-transparent to-transparent blur-2xl animate-drift" style={{ animationDelay: "-16s" }} />
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <motion.div
          className="lg:col-span-7"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: 0.05 } },
          }}
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[color:var(--color-line)] text-[11px] sm:text-xs tracking-[0.18em] uppercase text-[color:var(--color-ink-muted)]"
          >
            <span className="divider-dot" />
            {d.eyebrow}
          </motion.div>

          <h1 className="mt-6 font-display text-[clamp(2.6rem,7vw,5.6rem)] leading-[0.95] tracking-tight">
            <TitleLine text={d.titleA} className="text-[color:var(--color-ink)]" />
            <TitleLine text={d.titleB} className="italic text-[color:var(--color-ink-muted)]" />
            <TitleLine text={d.titleC} className="gold-shimmer" />
          </h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-xl text-[color:var(--color-ink-muted)] text-base sm:text-lg leading-relaxed"
          >
            {d.sub}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
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

        <motion.div
          className="lg:col-span-5 relative"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeLuxe, delay: 0.15 }}
        >
          <HeroVisual locale={locale} />
        </motion.div>
      </div>

      {/* Trust strip */}
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 mt-20 sm:mt-28">
        <div className="gold-rule reveal mb-8" />
        <motion.ul
          className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5 text-center md:text-left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.09 } },
          }}
        >
          {[
            { i: <Lock className="w-4 h-4" />, t: t.secure },
            { i: <Cash className="w-4 h-4" />, t: t.codAvail },
            { i: <Truck className="w-4 h-4" />, t: t.delivery },
            { i: <Flask className="w-4 h-4" />, t: t.authentic },
          ].map((b, i) => (
            <motion.li
              key={i}
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

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeLuxe } },
} as const;

function TitleLine({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={`block ${className ?? ""}`}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-baseline pb-[0.05em]">
          <motion.span
            className="inline-block will-change-transform"
            variants={{
              hidden: { y: "110%" },
              visible: { y: 0, transition: { duration: 0.8, ease: easeLuxe } },
            }}
          >
            {w}
            {i < words.length - 1 && " "}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function HeroVisual({ locale }: { locale: Locale }) {
  const alt =
    locale === "fr"
      ? "Trois décants 10 ml de parfums de luxe sur pierre obsidienne, capsules dorées."
      : "Three 10 ml luxury fragrance decants on obsidian stone with brass-gold caps.";

  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 14 });
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 14 });

  return (
    <motion.div
      onMouseMove={(e) => {
        if (reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width - 0.5);
        py.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        px.set(0);
        py.set(0);
      }}
      style={{ rotateX: reduce ? 0 : rx, rotateY: reduce ? 0 : ry, transformPerspective: 1000 }}
      className="relative aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none [transform-style:preserve-3d]"
    >
      <div className="absolute -inset-6 -z-10 bg-[color:var(--color-gold)]/15 blur-3xl rounded-full animate-pulse-glow" />
      <div className="relative h-full w-full overflow-hidden rounded-[32px] border border-white/10 elev-card">
        <div className="absolute inset-0 animate-ken-burns">
          <Image
            src={heroImage}
            alt={alt}
            placeholder="blur"
            priority
            fetchPriority="high"
            sizes="(max-width: 1024px) 90vw, 480px"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color:var(--color-bg)]/40 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-gold)]/60 to-transparent" />
      </div>
    </motion.div>
  );
}

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
