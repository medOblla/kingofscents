"use client";

import { useEffect, useState } from "react";

type Stage = "showing" | "opening" | "done";

export default function PageLoader() {
  const [stage, setStage] = useState<Stage>("showing");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const holdMs = reduce ? 100 : 250;
    const animMs = reduce ? 200 : 350;

    document.body.style.overflow = "hidden";
    const t1 = window.setTimeout(() => setStage("opening"), holdMs);
    const t2 = window.setTimeout(() => {
      setStage("done");
      document.body.style.overflow = "";
    }, holdMs + animMs);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

  if (stage === "done") return null;

  const opening = stage === "opening";

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[100] pointer-events-none"
      style={{ contain: "strict" }}
    >
      {/* Top half — slides up on open */}
      <div
        className="absolute inset-x-0 top-0 h-1/2 bg-[color:var(--color-bg)] transition-transform duration-[350ms] ease-[var(--ease-luxe)] will-change-transform"
        style={{ transform: opening ? "translateY(-100%)" : "translateY(0)" }}
      >
        {/* Subtle gold halo at the splitting edge */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[color:var(--color-gold)]/[0.08] to-transparent" />
      </div>

      {/* Bottom half — slides down on open */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[color:var(--color-bg)] transition-transform duration-[350ms] ease-[var(--ease-luxe)] will-change-transform"
        style={{ transform: opening ? "translateY(100%)" : "translateY(0)" }}
      >
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[color:var(--color-gold)]/[0.08] to-transparent" />
      </div>

      {/* Gold splitting line */}
      <div
        className="absolute inset-x-0 top-1/2 -translate-y-px h-px bg-gradient-to-r from-transparent via-[color:var(--color-gold)] to-transparent transition-opacity duration-500"
        style={{ opacity: opening ? 0 : 0.85 }}
      />

      {/* Centered logo, fades+lifts away as the panels open */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-all duration-[300ms] ease-[var(--ease-luxe)]"
        style={{
          opacity: opening ? 0 : 1,
          transform: opening ? "scale(1.08)" : "scale(1)",
        }}
      >
        <div
          className="flex flex-col items-center gap-4"
          style={{ animation: "loader-rise 220ms var(--ease-luxe) both" }}
        >
          <Crown />
          <span className="font-display text-3xl sm:text-4xl tracking-wider leading-none">
            <span className="text-[color:var(--color-gold)] gold-shimmer">king</span>
            <span className="text-[color:var(--color-ink)]">ofscents</span>
          </span>
          <span className="mt-2 text-[10px] tracking-[0.42em] uppercase text-[color:var(--color-ink-muted)]">
            Luxury, decanted
          </span>
        </div>
      </div>

      <style>{`
        @keyframes loader-rise {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes loader-crown-draw {
          from { stroke-dashoffset: 80; }
          to   { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}

function Crown() {
  return (
    <svg
      viewBox="0 0 24 24"
      width={56}
      height={56}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      className="text-[color:var(--color-gold)]"
    >
      <path
        d="M3 8l4 5 5-8 5 8 4-5v9.5A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5V8z"
        strokeDasharray="80"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ animation: "loader-crown-draw 250ms var(--ease-luxe) both" }}
      />
      <circle cx="3" cy="8" r="1" fill="currentColor" />
      <circle cx="21" cy="8" r="1" fill="currentColor" />
      <circle cx="12" cy="5" r="1" fill="currentColor" />
    </svg>
  );
}
