"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Locale, getDict } from "@/lib/i18n";
import { cn } from "@/lib/cn";

export default function Header({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const otherLocale: Locale = locale === "fr" ? "en" : "fr";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-[color:var(--color-bg)]/80 backdrop-blur-xl border-b border-[color:var(--color-line-soft)]"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-2 group">
          <Crown className="w-5 h-5 text-[color:var(--color-gold)] group-hover:rotate-6 transition-transform duration-500" />
          <span className="font-display text-lg sm:text-xl tracking-wider">
            <span className="text-[color:var(--color-gold)]">king</span>
            <span className="text-[color:var(--color-ink)]">ofscents</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          <a href="#packs" className="text-[color:var(--color-ink-muted)] hover:text-[color:var(--color-ink)] transition">{d.nav.packs}</a>
          <a href="#fragrances" className="text-[color:var(--color-ink-muted)] hover:text-[color:var(--color-ink)] transition">{d.nav.perfumes}</a>
          <a href="#story" className="text-[color:var(--color-ink-muted)] hover:text-[color:var(--color-ink)] transition">{d.nav.story}</a>
          <a href="#faq" className="text-[color:var(--color-ink-muted)] hover:text-[color:var(--color-ink)] transition">{d.nav.faq}</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={`/${otherLocale}`}
            aria-label={`Switch to ${otherLocale.toUpperCase()}`}
            className="hidden sm:inline-flex text-xs tracking-wider px-3 py-1.5 rounded-full border border-[color:var(--color-line)] text-[color:var(--color-ink-muted)] hover:text-[color:var(--color-ink)] hover:border-[color:var(--color-gold)]/40 transition"
          >
            {locale === "fr" ? "EN" : "FR"}
          </Link>
          <a
            href="#packs"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-[color:var(--color-gold)] text-[color:var(--color-bg)] hover:bg-[color:var(--color-gold-hi)] transition-colors"
          >
            {d.nav.orderNow}
          </a>
          <button
            aria-label="Menu"
            className="md:hidden p-2 -mr-2 text-[color:var(--color-ink)]"
            onClick={() => setMobileOpen((o) => !o)}
          >
            <Burger open={mobileOpen} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-[color:var(--color-line-soft)] bg-[color:var(--color-bg)]/95 backdrop-blur-xl">
          <div className="px-5 py-4 flex flex-col gap-3">
            <a onClick={() => setMobileOpen(false)} href="#packs" className="py-2 text-[color:var(--color-ink)]">{d.nav.packs}</a>
            <a onClick={() => setMobileOpen(false)} href="#fragrances" className="py-2 text-[color:var(--color-ink)]">{d.nav.perfumes}</a>
            <a onClick={() => setMobileOpen(false)} href="#story" className="py-2 text-[color:var(--color-ink)]">{d.nav.story}</a>
            <a onClick={() => setMobileOpen(false)} href="#faq" className="py-2 text-[color:var(--color-ink)]">{d.nav.faq}</a>
            <Link href={`/${otherLocale}`} className="py-2 text-[color:var(--color-gold)]">{locale === "fr" ? "English" : "Français"}</Link>
          </div>
        </div>
      )}
    </header>
  );
}

function Crown({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path d="M3 8l4 5 5-8 5 8 4-5v9.5A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5V8z" />
      <circle cx="3" cy="8" r="1" fill="currentColor" />
      <circle cx="21" cy="8" r="1" fill="currentColor" />
      <circle cx="12" cy="5" r="1" fill="currentColor" />
    </svg>
  );
}

function Burger({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="1.6" fill="none">
      <line x1="4" y1={open ? "12" : "8"} x2="20" y2={open ? "12" : "8"} style={{ transform: open ? "rotate(45deg)" : "none", transformOrigin: "center" }} />
      <line x1="4" y1={open ? "12" : "16"} x2="20" y2={open ? "12" : "16"} style={{ transform: open ? "rotate(-45deg)" : "none", transformOrigin: "center" }} />
    </svg>
  );
}
