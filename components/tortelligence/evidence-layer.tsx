import { bandColor } from "@/lib/band-color"
import { MODULES, type Opportunity } from "@/lib/opportunities"
import { Spark } from "./spark"
import { VelocityPill } from "./velocity-pill"
import { SolvencyChip } from "./solvency-chip"
import { SubBar } from "./sub-bar"

type EvidenceLayerProps = {
  opp: Opportunity
  mode?: "internal" | "client"
}

function EvHead({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
      <span
        style={{
          fontFamily: "var(--font-dm-mono)",
          fontSize: 10,
          letterSpacing: "1.8px",
          textTransform: "uppercase",
          color: "var(--cyan-400)",
        }}
      >
        {children}
      </span>
      <span style={{ flex: 1, height: 1, background: "var(--rule)" }} />
    </div>
  )
}

function Well({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "var(--navy-well)",
        border: "1px solid var(--rule-hi)",
        borderRadius: "var(--radius-md)",
        padding: "11px 13px",
      }}
    >
      {children}
    </div>
  )
}

function BigStat({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <Well>
      <div
        style={{
          fontFamily: "var(--font-dm-mono)",
          fontSize: 10,
          letterSpacing: "1.2px",
          textTransform: "uppercase",
          color: "var(--text-muted)",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "var(--font-dm-mono)",
          fontSize: 24,
          color: "#fff",
          marginTop: 8,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 10.5, color: "var(--text-faint)", marginTop: 4 }}>{sub}</div>
      )}
    </Well>
  )
}

export function EvidenceLayer({ opp, mode = "internal" }: EvidenceLayerProps) {
  const m = MODULES[opp.module]
  const solvency = opp.solvency

  return (
    <div
      style={{
        borderTop: "1px solid var(--rule)",
        marginTop: 16,
        paddingTop: 18,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 26,
        animation: "hp-fade var(--dur-base) var(--ease-out)",
      }}
    >
      {/* Left — score breakdown */}
      <div>
        <EvHead>How this score is built</EvHead>
        <p
          style={{
            fontSize: 12,
            color: "var(--text-muted)",
            lineHeight: 1.55,
            margin: "0 0 14px",
            maxWidth: 360,
          }}
        >
          Four factors feed directly into the opportunity score. Tap any ⓘ for more information on
          this data point.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 20px" }}>
          <SubBar label="Disproportionality" score={opp.sub.disproportionality} infoKey="disproportionality" module={opp.module} />
          <SubBar label="Volume"             score={opp.sub.volume}             infoKey="volume"             module={opp.module} />
          <SubBar label="Severity"           score={opp.sub.severity}           infoKey="severity"           module={opp.module} />
          <SubBar label="Velocity"           score={opp.sub.velocity}           infoKey="velocity"           module={opp.module} />
        </div>
      </div>

      {/* Right — reporting, velocity & defendant */}
      <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
        <EvHead>Reporting, velocity &amp; defendant</EvHead>

        {/* Trend card */}
        <Well>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 9,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-dm-mono)",
                fontSize: 10,
                letterSpacing: "1.2px",
                textTransform: "uppercase",
                color: "var(--text-muted)",
              }}
            >
              Velocity · 90-day trend
            </span>
            <VelocityPill pct={opp.velocity.pct} />
          </div>
          <Spark series={opp.velocity.series} w={220} h={40} fill color={bandColor(opp.score)} />
        </Well>

        {/* Volume + solvency row */}
        {opp.module === "institutional" ? (
          <SolvencyChip variant="tile" state={solvency} />
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
            <BigStat
              label="Report volume"
              value={opp.reportVolume.toLocaleString("en-US")}
              sub={m.reportUnit}
            />
            <SolvencyChip variant="tile" state={solvency} />
          </div>
        )}
      </div>
    </div>
  )
}
