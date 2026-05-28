"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { Locale, getDict } from "@/lib/i18n";

export default function Marquee({ locale }: { locale: Locale }) {
  const items = getDict(locale).marquee;
  const doubled = [...items, ...items];
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const xPercent = useTransform(x, (n) => `${n}%`);
  const paused = useRef(false);

  useAnimationFrame((_, delta) => {
    if (reduce || paused.current) return;
    const speed = -50 / 40000; // -50% over 40s
    let next = x.get() + speed * delta;
    if (next <= -50) next += 50;
    x.set(next);
  });

  return (
    <section
      aria-hidden
      className="relative py-8 sm:py-10 border-y border-[color:var(--color-line-soft)] overflow-hidden"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[color:var(--color-bg)] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[color:var(--color-bg)] to-transparent z-10 pointer-events-none" />
      <div className="flex overflow-hidden">
        <motion.div
          className="flex gap-12 sm:gap-16 whitespace-nowrap"
          style={{ x: xPercent }}
        >
          {doubled.map((label, i) => (
            <motion.span
              key={i}
              whileHover={reduce ? undefined : { scale: 1.08, color: "var(--color-gold)" }}
              transition={{ type: "spring", stiffness: 320, damping: 18 }}
              className="font-display text-2xl sm:text-3xl text-[color:var(--color-ink-muted)]/70 italic cursor-default"
            >
              {label}
              <span className="ml-12 sm:ml-16 text-[color:var(--color-gold)]">·</span>
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
