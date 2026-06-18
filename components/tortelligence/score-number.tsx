import { bandColor } from "@/lib/band-color"

type ScoreNumberProps = {
  score: number
  size?: number
}

export function ScoreNumber({ score, size = 42 }: ScoreNumberProps) {
  return (
    <div className="flex flex-col items-center flex-shrink-0">
      <span
        style={{
          fontFamily: "var(--font-dm-mono)",
          fontWeight: 500,
          fontSize: size,
          lineHeight: 1,
          color: bandColor(score),
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {score}
      </span>
      <span
        style={{
          fontFamily: "var(--font-dm-mono)",
          fontSize: 10,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          color: "var(--text-faint)",
          marginTop: 4,
        }}
      >
        Score
      </span>
    </div>
  )
}
