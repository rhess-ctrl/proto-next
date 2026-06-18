"use client"

import { ChevronRight } from "lucide-react"
import { bandColor } from "@/lib/band-color"
import { MODULES, SOLVENCY_STATE, type Opportunity } from "@/lib/opportunities"
import { ScoreNumber } from "./score-number"
import { ScoreBadge } from "./score-badge"
import { ModuleBadge } from "./module-badge"
import { VelocityPill } from "./velocity-pill"
import { Spark } from "./spark"
import { Stat } from "./stat"
import { SolvencyChip } from "./solvency-chip"
import { EvidenceLayer } from "./evidence-layer"

type OppCardProps = {
  opp: Opportunity
  rank?: number
  expanded: boolean
  onToggle: () => void
  density?: "comfortable" | "feature"
  mode?: "internal" | "client"
  showModule?: boolean
}

const cardBase: React.CSSProperties = {
  position: "relative",
  borderRadius: "var(--radius-lg)",
  overflow: "hidden",
  background: "var(--navy-panel)",
  backgroundImage: "var(--card-pinstripe)",
  cursor: "pointer",
  transition: "border-color var(--dur-fast), box-shadow var(--dur-fast)",
}

export function OppCard({
  opp,
  rank,
  expanded,
  onToggle,
  density = "comfortable",
  mode = "internal",
  showModule = true,
}: OppCardProps) {
  const m = MODULES[opp.module]
  const accent = bandColor(opp.score)
  const solvency = SOLVENCY_STATE[opp.id] ?? "Unknown"

  const border = expanded ? `1px solid ${m.color}80` : "1px solid var(--rule-hi)"
  const shadow = expanded
    ? `0 0 0 1px ${m.color}40, var(--shadow-md)`
    : "var(--shadow-sm)"

  const chevron = (
    <span
      style={{
        color: "var(--text-faint)",
        transition: "transform var(--dur-fast)",
        transform: expanded ? "rotate(90deg)" : "none",
        lineHeight: 0,
        flexShrink: 0,
        display: "flex",
      }}
    >
      <ChevronRight size={18} strokeWidth={1.7} />
    </span>
  )

  const accentBar = (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: 3,
        background: accent,
      }}
    />
  )

  if (density === "feature") {
    return (
      <div onClick={onToggle} style={{ ...cardBase, border, boxShadow: shadow, padding: "20px 22px" }}>
        {accentBar}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 18 }}>
          <ScoreBadge score={opp.score} size="lg" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <ModuleBadge module={opp.module} />
            <div
              style={{
                fontFamily: "var(--font-oswald)",
                fontSize: 22,
                fontWeight: 600,
                color: "#fff",
                lineHeight: 1.12,
                letterSpacing: "0.2px",
                marginTop: 10,
              }}
            >
              {opp.label}
            </div>
            <div style={{ fontSize: 15, color: "var(--text-muted-hi)", marginTop: 6, lineHeight: 1.35 }}>
              {opp.injury}
            </div>
            <div
              style={{
                fontFamily: "var(--font-dm-mono)",
                fontSize: 11,
                letterSpacing: "0.4px",
                color: "var(--text-faint)",
                marginTop: 10,
              }}
            >
              {opp.defendant}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 14, flexShrink: 0 }}>
            {chevron}
            <Stat label="Report volume" value={opp.reportVolume.toLocaleString("en-US")} color="var(--cyan-300)" />
            <SolvencyChip variant="card" state={solvency} />
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <VelocityPill pct={opp.velocity.pct} />
              <Spark series={opp.velocity.series} w={56} h={22} />
            </div>
          </div>
        </div>
        {expanded && <EvidenceLayer opp={opp} mode={mode} />}
      </div>
    )
  }

  // comfortable (feed row)
  return (
    <div onClick={onToggle} style={{ ...cardBase, border, boxShadow: shadow, padding: "15px 18px 15px 20px" }}>
      {accentBar}
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        {rank !== undefined && (
          <span
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: 12,
              color: "var(--text-faint)",
              width: 18,
              textAlign: "right",
              flexShrink: 0,
            }}
          >
            {rank}
          </span>
        )}
        <ScoreNumber score={opp.score} size={40} />
        <div style={{ flex: 1, minWidth: 0 }}>
          {showModule && (
            <div style={{ marginBottom: 7 }}>
              <ModuleBadge module={opp.module} />
            </div>
          )}
          <div
            style={{
              fontFamily: "var(--font-oswald)",
              fontSize: 16,
              fontWeight: 600,
              color: "#fff",
              lineHeight: 1.16,
              letterSpacing: "0.2px",
            }}
          >
            {opp.label}
          </div>
          <div style={{ fontSize: 13, color: "var(--text-muted-hi)", marginTop: 3, lineHeight: 1.35 }}>
            {opp.injury}
          </div>
          <div
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: 10.5,
              letterSpacing: "0.4px",
              color: "var(--text-faint)",
              marginTop: 6,
            }}
          >
            {opp.defendant} · {opp.year}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, flexShrink: 0 }}>
          <Stat label="Reports" value={opp.reportVolume.toLocaleString("en-US")} />
          <Stat label="Severity" value={opp.severityRate} />
          <SolvencyChip variant="card" state={solvency} />
          <div style={{ textAlign: "right", minWidth: 64 }}>
            <div
              style={{
                fontFamily: "var(--font-dm-mono)",
                fontSize: 10,
                letterSpacing: "1.2px",
                textTransform: "uppercase",
                color: "var(--text-faint)",
              }}
            >
              Velocity
            </div>
            <div
              style={{
                marginTop: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 6,
              }}
            >
              <VelocityPill pct={opp.velocity.pct} />
              <Spark series={opp.velocity.series} w={44} h={18} />
            </div>
          </div>
          {chevron}
        </div>
      </div>
      {expanded && <EvidenceLayer opp={opp} mode={mode} />}
    </div>
  )
}
