"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";

type Stage = "showing" | "opening" | "done";

const MIN_HOLD_MS = 400;
const ANIM_MS = 400;
const MAX_TOTAL_MS = 2000;

function subscribeReducedMotion(cb: () => void) {
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", cb);
  return () => mql.removeEventListener("change", cb);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function PageLoader() {
  const reduce = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    () => false,
  );
  const [stage, setStage] = useState<Stage>("showing");
  const mountedAt = useRef<number>(0);

  useEffect(() => {
    if (reduce) return;

    mountedAt.current = performance.now();
    document.body.style.overflow = "hidden";

    let openTimer = 0;
    let doneTimer = 0;
    let capTimer = 0;
    let onReady: (() => void) | null = null;

    const beginExit = () => {
      const elapsed = performance.now() - mountedAt.current;
      const wait = Math.max(0, MIN_HOLD_MS - elapsed);
      openTimer = window.setTimeout(() => {
        setStage("opening");
        doneTimer = window.setTimeout(() => {
          setStage("done");
          document.body.style.overflow = "";
        }, ANIM_MS);
      }, wait);
    };

    if (document.readyState === "complete") {
      beginExit();
    } else {
      onReady = beginExit;
      window.addEventListener("load", onReady, { once: true });
    }

    // Hard cap: never stuck past MAX_TOTAL_MS even if `load` never fires
    capTimer = window.setTimeout(() => {
      if (onReady) window.removeEventListener("load", onReady);
      beginExit();
    }, MAX_TOTAL_MS - ANIM_MS);

    const skip = () => {
      if (onReady) window.removeEventListener("load", onReady);
      window.clearTimeout(openTimer);
      window.clearTimeout(capTimer);
      setStage("opening");
      doneTimer = window.setTimeout(() => {
        setStage("done");
        document.body.style.overflow = "";
      }, ANIM_MS);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") skip();
    };
    window.addEventListener("pointerdown", skip, { once: true });
    window.addEventListener("keydown", onKey);

    return () => {
      if (onReady) window.removeEventListener("load", onReady);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(openTimer);
      window.clearTimeout(doneTimer);
      window.clearTimeout(capTimer);
      document.body.style.overflow = "";
    };
  }, [reduce]);

  if (reduce || stage === "done") return null;

  const opening = stage === "opening";

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[100]"
      style={{ contain: "strict", pointerEvents: opening ? "none" : "auto" }}
    >
      {/* Top half — slides up on open */}
      <div
        className="absolute inset-x-0 top-0 h-1/2 bg-[color:var(--color-bg)] transition-transform duration-[400ms] ease-[var(--ease-luxe)] will-change-transform"
        style={{ transform: opening ? "translateY(-100%)" : "translateY(0)" }}
      >
        {/* Subtle gold halo at the splitting edge */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[color:var(--color-gold)]/[0.08] to-transparent" />
      </div>

      {/* Bottom half — slides down on open */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[color:var(--color-bg)] transition-transform duration-[400ms] ease-[var(--ease-luxe)] will-change-transform"
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
        className="absolute inset-0 flex items-center justify-center transition-all duration-[400ms] ease-[var(--ease-luxe)]"
        style={{
          opacity: opening ? 0 : 1,
          transform: opening ? "scale(1.08)" : "scale(1)",
        }}
      >
        <div
          className="flex flex-col items-center gap-4"
          style={{ animation: "loader-rise 400ms var(--ease-luxe) both" }}
        >
          <Image
            src="/img/scentofkings-v2.png"
            alt="Scent of Kings"
            width={224}
            height={224}
            priority
            className="h-32 sm:h-40 w-auto"
          />
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
      `}</style>
    </div>
  );
}
