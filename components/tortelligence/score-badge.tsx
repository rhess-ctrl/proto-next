import { bandColor, scoreBand } from "@/lib/band-color"

type ScoreBadgeProps = {
  score: number
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
}

const DIM_COLOR: Record<string, string> = {
  strong:   "var(--score-strong-dim)",
  good:     "var(--score-good-dim)",
  moderate: "var(--score-moderate-dim)",
  weak:     "var(--score-weak-dim)",
}

const BORDER_ALPHA: Record<string, string> = {
  strong:   "rgba(31,201,142,0.35)",
  good:     "rgba(39,186,236,0.35)",
  moderate: "rgba(224,174,62,0.35)",
  weak:     "rgba(242,107,94,0.35)",
}

const SIZE_MAP = {
  sm: { outer: 40, font: 18, label: 9 },
  md: { outer: 52, font: 24, label: 9.5 },
  lg: { outer: 64, font: 30, label: 10 },
}

export function ScoreBadge({ score, size = "md", showLabel = true }: ScoreBadgeProps) {
  const band = scoreBand(score)
  const color = bandColor(score)
  const dim = DIM_COLOR[band]
  const border = BORDER_ALPHA[band]
  const { outer, font, label } = SIZE_MAP[size]

  return (
    <div
      className="flex flex-col items-center justify-center flex-shrink-0"
      style={{
        width: outer,
        height: outer,
        borderRadius: "var(--radius-md)",
        background: dim,
        border: `1px solid ${border}`,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-dm-mono)",
          fontWeight: 500,
          fontSize: font,
          lineHeight: 1,
          color,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {score}
      </span>
      {showLabel && (
        <span
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: label,
            letterSpacing: "1.2px",
            textTransform: "uppercase",
            color: "var(--text-faint)",
            marginTop: 3,
          }}
        >
          Score
        </span>
      )}
    </div>
  )
}
