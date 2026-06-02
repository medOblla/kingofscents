"use client";

import { useReducedMotion } from "framer-motion";
import { Locale, getDict } from "@/lib/i18n";

export default function Marquee({ locale }: { locale: Locale }) {
  const items = getDict(locale).marquee;
  // repeat enough times so one track always covers the visible area
  const repeated = [...items, ...items, ...items, ...items];
  const reduce = useReducedMotion();

  const track = (
    <div className="flex gap-12 sm:gap-16 whitespace-nowrap shrink-0 pr-12 sm:pr-16">
      {repeated.map((label, i) => (
        <span
          key={i}
          className="font-display text-2xl sm:text-3xl text-[color:var(--color-ink-muted)]/70 italic cursor-default transition-[color,transform] duration-200 hover:text-[color:var(--color-gold)] hover:scale-105"
        >
          {label}
          <span className="ml-12 sm:ml-16 text-[color:var(--color-gold)]">·</span>
        </span>
      ))}
    </div>
  );

  return (
    <section
      aria-hidden
      className="relative py-8 sm:py-10 border-y border-[color:var(--color-line-soft)]"
    >
      <div className="relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[color:var(--color-bg)] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[color:var(--color-bg)] to-transparent z-10 pointer-events-none" />
        <div
          className="flex"
          style={{ animation: reduce ? "none" : "marquee-x 40s linear infinite" }}
        >
          {track}
          {track}
        </div>
      </div>
    </section>
  );
}
