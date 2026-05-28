"use client";

import { motion } from "framer-motion";
import { Locale, getDict } from "@/lib/i18n";

const easeLuxe = [0.22, 1, 0.36, 1] as const;

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

        <motion.div
          className="mt-14 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-px bg-[color:var(--color-line-soft)] rounded-3xl overflow-hidden border border-[color:var(--color-line-soft)]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
          }}
        >
          {d.steps.map((step, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { type: "spring", stiffness: 140, damping: 18 },
                },
              }}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="relative bg-[color:var(--color-bg)] p-8 sm:p-10 group transition-colors duration-500 hover:bg-[color:var(--color-bg-elev)]"
            >
              <motion.div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-transparent via-[color:var(--color-gold)] to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.9, ease: easeLuxe, delay: 0.25 + i * 0.12 }}
              />
              <div className="flex items-baseline gap-4">
                <motion.span
                  className="font-display text-5xl sm:text-6xl text-[color:var(--color-gold)] tabular-nums inline-block"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 360, damping: 18 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </motion.span>
                <span className="h-px flex-1 bg-[color:var(--color-line)] mt-6" />
              </div>
              <h3 className="mt-6 font-display text-2xl text-[color:var(--color-ink)] transition-colors duration-500 group-hover:text-[color:var(--color-gold-hi)]">
                {step.title}
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[color:var(--color-ink-muted)] leading-relaxed">
                {step.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
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
    <motion.div
      className={`max-w-3xl ${centered ? "mx-auto text-center" : ""}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {eyebrow && (
        <motion.div
          variants={fadeUp}
          className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-[color:var(--color-gold)]"
        >
          <span className="divider-dot" />
          {eyebrow}
        </motion.div>
      )}
      <motion.h2
        variants={fadeUp}
        className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight text-[color:var(--color-ink)]"
      >
        {title}
      </motion.h2>
      {sub && (
        <motion.p
          variants={fadeUp}
          className="mt-5 text-[color:var(--color-ink-muted)] text-base sm:text-lg leading-relaxed"
        >
          {sub}
        </motion.p>
      )}
    </motion.div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeLuxe } },
} as const;
