"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Locale, getDict } from "@/lib/i18n";
import { cn } from "@/lib/cn";

const easeLuxe = [0.22, 1, 0.36, 1] as const;

export default function Header({ locale }: { locale: Locale }) {
  const d = getDict(locale);
  const otherLocale: Locale = locale === "fr" ? "en" : "fr";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const home = `/${locale}`;
  const navItems = [
    { href: `${home}#packs`, label: d.nav.packs },
    { href: `${home}#story`, label: d.nav.story },
    { href: `${home}#faq`, label: d.nav.faq },
  ];

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: easeLuxe, delay: 0.1 }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-colors duration-500",
        scrolled
          ? "bg-[color:var(--color-bg)]/80 backdrop-blur-xl border-b border-[color:var(--color-line-soft)]"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-3 group" aria-label="Scent of Kings">
          <motion.div
            whileHover={{ rotate: 6, scale: 1.04 }}
            transition={{ type: "spring", stiffness: 360, damping: 16 }}
            className="inline-block"
          >
            <Image
              src="/img/scentofkings-v2.png"
              alt="Scent of Kings"
              width={160}
              height={160}
              priority
              className="h-10 sm:h-12 w-auto"
            />
          </motion.div>
          <span className="font-brand text-base sm:text-lg uppercase text-[color:var(--color-gold)] leading-none">
            Scent <span className="text-[color:var(--color-ink-muted)]">of</span> Kings
          </span>
        </Link>

        <nav
          className="hidden md:flex items-center gap-2 text-sm"
          onMouseLeave={() => setHovered(null)}
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onMouseEnter={() => setHovered(item.href)}
              className="relative px-3 py-2 text-[color:var(--color-ink-muted)] hover:text-[color:var(--color-ink)] transition-colors"
            >
              {hovered === item.href && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-[color:var(--color-accent-soft)] border border-[color:var(--color-gold)]/20"
                  transition={{ type: "spring", stiffness: 360, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={`/${otherLocale}`}
            aria-label={`Switch to ${otherLocale.toUpperCase()}`}
            className="hidden sm:inline-flex text-xs tracking-wider px-3 py-1.5 rounded-full border border-[color:var(--color-line)] text-[color:var(--color-ink-muted)] hover:text-[color:var(--color-ink)] hover:border-[color:var(--color-gold)]/40 transition"
          >
            {locale === "fr" ? "EN" : "FR"}
          </Link>
          <motion.a
            href={`${home}#packs`}
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 360, damping: 22 }}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-[color:var(--color-gold)] text-[color:var(--color-bg)] hover:bg-[color:var(--color-gold-hi)] transition-colors"
          >
            {d.nav.orderNow}
          </motion.a>
          <button
            aria-label="Menu"
            className="md:hidden p-2 -mr-2 text-[color:var(--color-ink)]"
            onClick={() => setMobileOpen((o) => !o)}
          >
            <Burger open={mobileOpen} />
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.div
            key="drawer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: easeLuxe }}
            className="md:hidden overflow-hidden border-t border-[color:var(--color-line-soft)] bg-[color:var(--color-bg)]/95 backdrop-blur-xl"
          >
            <motion.div
              className="px-5 py-4 flex flex-col gap-3"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
                closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
              }}
            >
              {navItems.map((item) => (
                <motion.a
                  key={item.href}
                  onClick={() => setMobileOpen(false)}
                  href={item.href}
                  variants={drawerItem}
                  className="py-2 text-[color:var(--color-ink)]"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.div variants={drawerItem}>
                <Link href={`/${otherLocale}`} className="py-2 text-[color:var(--color-gold)]">
                  {locale === "fr" ? "English" : "Français"}
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

const drawerItem = {
  open: { opacity: 1, x: 0, transition: { duration: 0.3, ease: easeLuxe } },
  closed: { opacity: 0, x: -12, transition: { duration: 0.2, ease: easeLuxe } },
} as const;

function Burger({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="1.6" fill="none">
      <motion.line
        x1="4"
        x2="20"
        animate={{ y1: open ? 12 : 8, y2: open ? 12 : 8, rotate: open ? 45 : 0 }}
        style={{ originX: "12px", originY: "12px" }}
        transition={{ type: "spring", stiffness: 360, damping: 22 }}
      />
      <motion.line
        x1="4"
        x2="20"
        animate={{ y1: open ? 12 : 16, y2: open ? 12 : 16, rotate: open ? -45 : 0 }}
        style={{ originX: "12px", originY: "12px" }}
        transition={{ type: "spring", stiffness: 360, damping: 22 }}
      />
    </svg>
  );
}
