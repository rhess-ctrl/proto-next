import { Pill, Activity, ShoppingBag, Landmark, LucideIcon } from "lucide-react"
import { MODULES, type ModuleKey } from "@/lib/opportunities"

const ICON_MAP: Record<string, LucideIcon> = {
  pill:         Pill,
  activity:     Activity,
  "shopping-bag": ShoppingBag,
  landmark:     Landmark,
}

type ModuleBadgeProps = {
  module: ModuleKey
  size?: "sm" | "md" | "lg"
}

const SIZE_MAP = {
  sm: { tile: 18, icon: 11, font: "10.5px" },
  md: { tile: 22, icon: 12, font: "11.5px"  },
  lg: { tile: 26, icon: 15, font: "11.5px"  },
}

export function ModuleBadge({ module, size = "md" }: ModuleBadgeProps) {
  const m = MODULES[module]
  const { tile, icon, font } = SIZE_MAP[size]
  const Icon = ICON_MAP[m.icon] ?? Pill

  return (
    <span className="inline-flex items-center gap-[7px]">
      <span
        style={{
          width: tile,
          height: tile,
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: m.color + "20",
          border: `1px solid ${m.color}59`,
          flexShrink: 0,
        }}
      >
        <Icon size={icon} color={m.color} strokeWidth={1.7} />
      </span>
      <span
        style={{
          fontFamily: "var(--font-dm-mono)",
          fontSize: font,
          fontWeight: 500,
          letterSpacing: "1.1px",
          textTransform: "uppercase",
          color: "var(--text-muted-hi)",
        }}
      >
        <span style={{ color: m.color }}>{m.num}</span> {m.short}
      </span>
    </span>
  )
}
