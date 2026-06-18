"use client"

import { bandColor } from "@/lib/band-color"
import { MODULES, OPPORTUNITIES, type ModuleKey } from "@/lib/opportunities"
import { Spark } from "./spark"
import { VelocityPill } from "./velocity-pill"
import { LucideIcon, Pill, Activity, ShoppingBag, Landmark } from "lucide-react"

const ICON_MAP: Record<string, LucideIcon> = {
  pill: Pill,
  activity: Activity,
  "shopping-bag": ShoppingBag,
  landmark: Landmark,
}

type SummaryTileProps = {
  module: ModuleKey
  active: boolean
  onClick: () => void
}

export function SummaryTile({ module, active, onClick }: SummaryTileProps) {
  const meta = MODULES[module]
  const list = OPPORTUNITIES.filter((o) => o.module === module).sort((a, b) => b.score - a.score)
  const top = list[0].score
  const avgVel = Math.round(list.reduce((s, o) => s + o.velocity.pct, 0) / list.length)
  const series = list[0].velocity.series
  const Icon = ICON_MAP[meta.icon] ?? Pill

  return (
    <button
      onClick={onClick}
      style={{
        textAlign: "left",
        cursor: "pointer",
        padding: "14px 15px",
        borderRadius: "var(--radius-lg)",
        background: active ? meta.color + "14" : "var(--navy-panel)",
        backgroundImage: active ? "none" : "var(--card-pinstripe)",
        border: active ? `1px solid ${meta.color}99` : "1px solid var(--rule-hi)",
        borderTop: `2px solid ${meta.color}`,
        boxShadow: active
          ? `0 0 0 1px ${meta.color}40, var(--shadow-md)`
          : "var(--shadow-sm)",
        display: "flex",
        flexDirection: "column",
        gap: 11,
        width: "100%",
        transition: "border-color var(--dur-fast), box-shadow var(--dur-fast)",
      }}
    >
      {/* Module identity */}
      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
        <span
          style={{
            width: 26,
            height: 26,
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: meta.color + "22",
            border: `1px solid ${meta.color}59`,
            flexShrink: 0,
          }}
        >
          <Icon size={14} color={meta.color} strokeWidth={1.7} />
        </span>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: 10,
              letterSpacing: "1px",
              color: meta.color,
            }}
          >
            {meta.num}
          </div>
          <div
            style={{
              fontFamily: "var(--font-oswald)",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.3px",
              textTransform: "uppercase",
              color: "#fff",
              lineHeight: 1.05,
              marginTop: 2,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {meta.short}
          </div>
        </div>
      </div>

      {/* Score + sparkline */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <div
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: 10,
              letterSpacing: "1.2px",
              textTransform: "uppercase",
              color: "var(--text-faint)",
            }}
          >
            Top score
          </div>
          <div
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: 30,
              lineHeight: 1,
              color: bandColor(top),
              marginTop: 3,
            }}
          >
            {top}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <Spark series={series} w={74} h={26} fill color={meta.color} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 6,
              marginTop: 4,
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-dm-mono)",
                fontSize: 10,
                color: "var(--text-faint)",
              }}
            >
              {list.length} opps
            </span>
            <VelocityPill pct={avgVel} />
          </div>
        </div>
      </div>
    </button>
  )
}
