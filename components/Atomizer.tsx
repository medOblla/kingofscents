import { cn } from "@/lib/cn";
import type { Fragrance } from "@/lib/catalog";

// Short, all-caps labels that fit in the bottle's tiny label area.
export function shortHouseLabel(house: string): string {
  const map: Record<string, string> = {
    YSL: "YSL",
    Dior: "DIOR",
    "Emporio Armani": "ARMANI",
    Afnan: "AFNAN",
  };
  return map[house] ?? house.toUpperCase().slice(0, 7);
}

type Size = "sm" | "md" | "lg";

const sizes: Record<
  Size,
  { cap: string; collar: string; body: string; label: string }
> = {
  sm: {
    cap: "w-5 sm:w-6 h-3",
    collar: "w-7 sm:w-9 h-1.5",
    body: "w-12 sm:w-14 h-28 sm:h-32",
    label: "text-[7px] sm:text-[8px]",
  },
  md: {
    cap: "w-6 sm:w-7 h-3.5",
    collar: "w-9 sm:w-11 h-2",
    body: "w-14 sm:w-16 h-32 sm:h-36",
    label: "text-[8px] sm:text-[9px]",
  },
  lg: {
    cap: "w-8 sm:w-10 h-4",
    collar: "w-12 sm:w-14 h-2.5",
    body: "w-20 sm:w-24 h-44 sm:h-52",
    label: "text-[10px] sm:text-[11px]",
  },
};

export function Atomizer({
  fragrance,
  index,
  total,
  size = "sm",
}: {
  fragrance: Fragrance;
  index: number;
  total: number;
  size?: Size;
}) {
  const s = sizes[size];
  // Slight vertical stagger so they look arranged
  const offset = ((index - (total - 1) / 2) * 4) | 0;
  const label = shortHouseLabel(fragrance.house);
  return (
    <div
      className="relative flex flex-col items-center"
      style={{ transform: `translateY(${offset}px)` }}
    >
      {/* Cap */}
      <span
        className={cn("block rounded-t-sm", s.cap)}
        style={{
          background: "linear-gradient(180deg, #E6C77A 0%, #C8A052 60%, #8E6E2C 100%)",
          boxShadow: "0 1px 0 rgba(255,255,255,0.15) inset, 0 -1px 0 rgba(0,0,0,0.3) inset",
        }}
      />
      {/* Collar */}
      <span
        className={cn("block -mt-px rounded-sm", s.collar)}
        style={{
          background: "linear-gradient(180deg, #C8A052 0%, #8E6E2C 100%)",
        }}
      />
      {/* Body */}
      <span
        className={cn(
          "block rounded-md border border-white/15 relative overflow-hidden bg-gradient-to-b",
          s.body,
          fragrance.gradient,
        )}
        style={{
          boxShadow:
            "0 12px 28px -10px rgba(0,0,0,0.55), inset 1px 0 0 rgba(255,255,255,0.08), inset -1px 0 0 rgba(0,0,0,0.25)",
        }}
      >
        {/* Glass shine */}
        <span className="absolute inset-y-2 left-1 w-1 rounded-full bg-white/20 blur-[1px]" />
        {/* Label */}
        <span className="absolute inset-x-1 top-1/2 -translate-y-1/2 h-9 rounded-sm bg-[color:var(--color-bg)]/70 border border-white/10 flex items-center justify-center px-0.5">
          <span
            className={cn(
              "tracking-[0.08em] uppercase text-[color:var(--color-ink)]/90 text-center leading-tight",
              s.label,
            )}
          >
            {label}
          </span>
        </span>
      </span>
    </div>
  );
}
