import { NextRequest, NextResponse } from "next/server";

const SUPPORTED = ["fr", "en"] as const;
type Lang = (typeof SUPPORTED)[number];
const DEFAULT_LANG: Lang = "fr";

function pickLanguage(header: string | null): Lang {
  if (!header) return DEFAULT_LANG;
  const tags = header
    .split(",")
    .map((p) => p.trim().split(";")[0].toLowerCase().slice(0, 2));
  for (const tag of tags) {
    if (SUPPORTED.includes(tag as Lang)) return tag as Lang;
  }
  return DEFAULT_LANG;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/" || pathname === "") {
    const lang = pickLanguage(req.headers.get("accept-language"));
    const url = req.nextUrl.clone();
    url.pathname = `/${lang}`;
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
