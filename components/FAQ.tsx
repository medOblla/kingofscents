"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Locale, getDict } from "@/lib/i18n";
import { SectionHeader } from "./HowItWorks";

const easeLuxe = [0.22, 1, 0.36, 1] as const;

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
        <motion.ul
          className="mt-14 divide-y divide-[color:var(--color-line-soft)] border-y border-[color:var(--color-line-soft)]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
        >
          {f.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.li
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeLuxe } },
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full py-6 flex items-start justify-between gap-6 text-left group"
                >
                  <span className="font-display text-lg sm:text-xl text-[color:var(--color-ink)] group-hover:text-[color:var(--color-gold)] transition-colors">
                    {item.q}
                  </span>
                  <motion.span
                    className="shrink-0 mt-1 w-7 h-7 rounded-full border flex items-center justify-center"
                    animate={{
                      rotate: isOpen ? 45 : 0,
                      backgroundColor: isOpen ? "var(--color-gold)" : "rgba(0,0,0,0)",
                      borderColor: isOpen ? "var(--color-gold)" : "var(--color-line)",
                    }}
                    transition={{ type: "spring", stiffness: 360, damping: 22 }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="none"
                      stroke={isOpen ? "var(--color-bg)" : "currentColor"}
                      strokeWidth="2"
                    >
                      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                    </svg>
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.45, ease: easeLuxe },
                        opacity: { duration: 0.3, ease: easeLuxe },
                      }}
                      className="overflow-hidden"
                    >
                      <p className="text-[color:var(--color-ink-muted)] leading-relaxed pr-12 pb-6">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
