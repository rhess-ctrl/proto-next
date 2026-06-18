import { TrendingUp } from "lucide-react"

type VelocityPillProps = {
  pct: number
  big?: boolean
}

export function VelocityPill({ pct, big = false }: VelocityPillProps) {
  const color = "var(--score-strong)"
  const size = big ? 15 : 12
  const font = big ? "15px" : "11px"

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
      <TrendingUp size={size} color={color} strokeWidth={1.7} />
      +{pct}%
    </span>
  )
}
