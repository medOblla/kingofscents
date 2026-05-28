import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Cinzel } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const brand = Cinzel({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kingofscents.ma"),
  title: {
    default: "kingofscents — Décants de parfums de luxe au Maroc",
    template: "%s | kingofscents",
  },
  description:
    "Composez votre pack de décants 10ml — Baccarat Rouge 540, Tom Ford, Creed, Dior. Livraison partout au Maroc, paiement à la livraison.",
  alternates: {
    languages: { fr: "/fr", en: "/en" },
  },
  openGraph: {
    type: "website",
    siteName: "kingofscents",
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable} ${brand.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[color:var(--color-bg)] text-[color:var(--color-ink)] grain">
        {children}
      </body>
    </html>
  );
}
