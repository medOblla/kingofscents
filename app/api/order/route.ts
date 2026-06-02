import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK;
  if (!webhookUrl) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const body = await req.json();

  const { name, phone, city, address, bundleId, tier, fragrances, price, pouchColor, locale } = body;

  if (!name || !phone || !city || !address) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const payload = {
    timestamp: new Date().toLocaleString("fr-MA", { timeZone: "Africa/Casablanca" }),
    name,
    phone,
    city,
    address,
    bundle: bundleId,
    tier,
    fragrances: fragrances.join(", "),
    price: `${price} DH`,
    pouch: pouchColor ?? "—",
    locale,
  };

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to save order" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
