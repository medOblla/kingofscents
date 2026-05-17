"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reveal = (el: Element) => {
      el.classList.add("is-in");
      if (el.classList.contains("reveal-stagger")) {
        Array.from(el.children).forEach((child, i) => {
          (child as HTMLElement).style.setProperty("--i", String(i));
        });
      }
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".reveal, .reveal-stagger").forEach(reveal);
      return;
    }

    const targets = Array.from(document.querySelectorAll<HTMLElement>(".reveal, .reveal-stagger"));

    targets.forEach((el) => {
      const i = i_check(el);
      if (i) reveal(el);
    });

    function i_check(el: HTMLElement) {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh * 0.92 && r.bottom > 0;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target);
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    targets.forEach((el) => {
      if (!el.classList.contains("is-in")) io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return null;
}
