"use client";

import { useState } from "react";
import { Locale, getDict } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { SectionHeader } from "./HowItWorks";

export default function FAQ({ locale }: { locale: Locale }) {
  const f = getDict(locale).faq;
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative isolate overflow-hidden py-24 sm:py-32 scroll-mt-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.16]"
        style={{
          backgroundImage: "url(/img/backdrop.png)",
          backgroundSize: "cover",
          backgroundPosition: "80% 70%",
          transform: "scaleX(-1)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)",
        }}
      />
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeader eyebrow="FAQ" title={f.title} sub={f.sub} />
        <ul className="reveal-stagger mt-14 divide-y divide-[color:var(--color-line-soft)] border-y border-[color:var(--color-line-soft)]" style={{ ["--stagger" as string]: "60ms" }}>
          {f.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full py-6 flex items-start justify-between gap-6 text-left group"
                >
                  <span className="font-display text-lg sm:text-xl text-[color:var(--color-ink)] group-hover:text-[color:var(--color-gold)] transition-colors">
                    {item.q}
                  </span>
                  <span
                    className={cn(
                      "shrink-0 mt-1 w-7 h-7 rounded-full border border-[color:var(--color-line)] flex items-center justify-center transition-all duration-500",
                      isOpen ? "bg-[color:var(--color-gold)] border-[color:var(--color-gold)] rotate-45" : ""
                    )}
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke={isOpen ? "var(--color-bg)" : "currentColor"} strokeWidth="2">
                      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-500 ease-[var(--ease-luxe)]",
                    isOpen ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="text-[color:var(--color-ink-muted)] leading-relaxed pr-12">{item.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
