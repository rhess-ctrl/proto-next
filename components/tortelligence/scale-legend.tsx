"use client"

import { useState } from "react"
import { ChevronDown, Info } from "lucide-react"
import { bandColor } from "@/lib/band-color"
import { velocityColor } from "@/lib/velocity"

const SCORE_BANDS = [
  { word: "Strong",   range: "85–100", score: 91 },
  { word: "Solid",    range: "70–84",  score: 77 },
  { word: "Moderate", range: "50–69",  score: 60 },
  { word: "Weak",     range: "0–49",   score: 35 },
]

const VEL_TIERS = [
  { word: "Surging",  range: "≥ 30%",  pct: 35 },
  { word: "Rising",   range: "15–29%", pct: 22 },
  { word: "Climbing", range: "7–14%",  pct: 10 },
  { word: "Flat",     range: "< 7%",   pct: 4 },
]

function Chip({ color, word, range }: { color: string; word: string; range: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
      <span
        style={{
          width: 11,
          height: 11,
          borderRadius: 3,
          background: color,
          boxShadow: `0 0 7px ${color}`,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontFamily: "var(--font-dm-mono)",
          fontSize: 11,
          letterSpacing: "1px",
          textTransform: "uppercase",
          fontWeight: 500,
          color,
        }}
      >
        {word}
      </span>
      <span
        style={{
          fontFamily: "var(--font-dm-mono)",
          fontSize: 11.5,
          letterSpacing: "0.4px",
          fontWeight: 400,
          color: "#fff",
        }}
      >
        {range}
      </span>
    </span>
  )
}

function Group({
  label,
  desc,
  children,
}: {
  label: string
  desc: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div style={{ flex: "1 1 0%", minWidth: 280 }}>
      <div style={{ marginBottom: 12 }}>
        <div
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: 11.5,
            letterSpacing: "1.2px",
            textTransform: "uppercase",
            fontWeight: 400,
            color: "#fff",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </div>
        {desc}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 22px" }}>
        {children}
      </div>
    </div>
  )
}

function DescLine({ bold, text }: { bold: string; text: string }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-dm-mono)",
        fontSize: 11.5,
        letterSpacing: "0.2px",
        fontWeight: 400,
        color: "var(--text-muted-hi)",
        marginTop: 6,
        lineHeight: 1.5,
      }}
    >
      <span style={{ fontWeight: 600 }}>{bold}:</span> {text}
    </div>
  )
}

export function ScaleLegend({ defaultOpen = true }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div
      style={{
        background: "var(--navy-field)",
        border: "1px solid var(--rule-hi)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        marginBottom: 22,
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "11px 16px",
          cursor: "pointer",
          background: "transparent",
          textAlign: "left",
        }}
      >
        <Info size={14} strokeWidth={1.7} style={{ color: "#fff", flexShrink: 0 }} />
        <span
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: 11,
            letterSpacing: "1.6px",
            textTransform: "uppercase",
            fontWeight: 500,
            color: "#fff",
          }}
        >
          Legend
        </span>
        <span
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: 11.5,
            letterSpacing: "0.4px",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          Colors &amp; ranges for every data point
        </span>
        <span style={{ marginLeft: "auto", lineHeight: 0, color: "var(--text-muted)", transition: "transform var(--dur-fast)", transform: open ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}>
          <ChevronDown size={16} strokeWidth={1.7} />
        </span>
      </button>

      {open && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px 40px",
            padding: "4px 16px 17px",
            borderTop: "1px solid var(--rule)",
          }}
        >
          <Group
            label="Opportunity score & factors"
            desc={
              <>
                <DescLine bold="Range" text="0–100" />
                <DescLine bold="Includes" text="Score, Disproportionality, Volume, Severity, Velocity" />
              </>
            }
          >
            {SCORE_BANDS.map(({ word, range, score }) => (
              <Chip key={word} color={bandColor(score)} word={word} range={range} />
            ))}
          </Group>

          <Group
            label="Velocity · 90-day momentum"
            desc={
              <>
                <DescLine bold="Range" text="< 7% to ≥ 30%" />
                <DescLine bold="Tracks" text="Headline 90-day reporting trend" />
              </>
            }
          >
            {VEL_TIERS.map(({ word, range, pct }) => (
              <Chip key={word} color={velocityColor(pct)} word={word} range={range} />
            ))}
          </Group>
        </div>
      )}
    </div>
  )
}
