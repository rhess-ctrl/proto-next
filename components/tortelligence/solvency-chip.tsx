import type { SolvencyState } from "@/lib/opportunities"

const STATE_COLOR: Record<SolvencyState, string> = {
  Solvent:  "var(--score-strong)",
  "At-Risk": "var(--gold-400)",
  Private:  "var(--cyan-300)",
  Unknown:  "var(--text-faint)",
}

type SolvencyChipProps = {
  state: SolvencyState
  variant?: "card" | "tile"
}

export function SolvencyChip({ state, variant = "card" }: SolvencyChipProps) {
  const color = STATE_COLOR[state]

  if (variant === "card") {
    return (
      <div
        style={{ textAlign: "right" }}
        title="Defendant solvency — illustrative preview. Values will be Solvent / At-Risk / Private / Unknown"
      >
        <div
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "1.2px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.62)",
          }}
        >
          Solvency
        </div>
        <div style={{ marginTop: 3, display: "inline-flex", alignItems: "center", gap: 5 }}>
          <span
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: 12,
              color,
              border: "1px dashed var(--rule-strong)",
              borderRadius: "var(--radius-sm)",
              padding: "1px 7px",
              letterSpacing: "0.4px",
              whiteSpace: "nowrap",
            }}
          >
            {state}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        background: "var(--navy-well)",
        border: "1px dashed var(--rule-strong)",
        borderRadius: "var(--radius-md)",
        padding: "11px 13px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "1.2px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.72)",
          }}
        >
          Defendant solvency
        </span>
        <span
          style={{
            marginLeft: "auto",
            fontFamily: "var(--font-dm-mono)",
            fontSize: 10,
            letterSpacing: "1px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.28)",
            border: "1px solid var(--rule-strong)",
            borderRadius: "var(--radius-sm)",
            padding: "2px 7px",
          }}
        >
          Preview
        </span>
      </div>
      <div style={{ fontFamily: "var(--font-dm-mono)", fontSize: 24, color, marginTop: 8 }}>
        {state}
      </div>
      <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.62)", marginTop: 4 }}>
        Not yet live — illustrative preview.
      </div>
    </div>
  )
}
