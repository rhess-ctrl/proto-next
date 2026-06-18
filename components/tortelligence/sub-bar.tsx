import { bandColor } from "@/lib/band-color"
import { SUBSCORE_INFO, type ModuleKey, type SubScores } from "@/lib/opportunities"
import { InfoDot } from "./info-dot"

type SubBarProps = {
  label: string
  score: number
  infoKey: keyof SubScores
  module: ModuleKey
}

export function SubBar({ label, score, infoKey, module }: SubBarProps) {
  const color = bandColor(score)

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
        <span
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: 10,
            letterSpacing: "1.1px",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          {label}
        </span>
        <InfoDot text={SUBSCORE_INFO[module][infoKey]} />
        <span
          style={{
            marginLeft: "auto",
            fontFamily: "var(--font-dm-mono)",
            fontSize: 12,
            color,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {score}
        </span>
      </div>
      <div
        style={{
          height: 5,
          borderRadius: "var(--radius-full)",
          background: "var(--navy-well)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${score}%`,
            background: color,
            borderRadius: "var(--radius-full)",
          }}
        />
      </div>
    </div>
  )
}
