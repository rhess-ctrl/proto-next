import { TrendingUp } from "lucide-react"
import { velocityTier } from "@/lib/velocity"

type VelocityPillProps = {
  pct: number
  big?: boolean
  size?: number
}

export function VelocityPill({ pct, big = false, size }: VelocityPillProps) {
  const tier = velocityTier(pct)
  const color = `var(--score-${tier.band})`
  const fs = size ?? (big ? 15 : 11)
  const iconSize = size ?? (big ? 15 : 12)
  const font = `${fs}px`

  return (
    <span
      className="inline-flex items-center gap-1"
      style={{
        fontFamily: "var(--font-dm-mono)",
        fontSize: font,
        fontWeight: 500,
        color,
      }}
    >
      <TrendingUp size={iconSize} color={color} strokeWidth={1.7} />
      +{pct}%
    </span>
  )
}
