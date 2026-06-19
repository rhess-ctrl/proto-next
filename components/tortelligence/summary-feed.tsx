"use client"

import { useOpportunityView } from "@/hooks/use-opportunity-view"
import { MODULE_ORDER, MODULES, type ModuleKey, type Opportunity } from "@/lib/opportunities"
import { TopBar } from "./top-bar"
import { SummaryTile } from "./summary-tile"
import { OppCard } from "./opp-card"
import { ScaleLegend } from "./scale-legend"

function moduleStats(opportunities: Opportunity[], module: ModuleKey) {
  const list = opportunities.filter((o) => o.module === module).sort((a, b) => b.score - a.score)
  if (list.length === 0) return { topScore: 0, count: 0, avgVelocity: 0, topSeries: [0, 0, 0, 0, 0, 0, 0] }
  return {
    topScore:    list[0].score,
    count:       list.length,
    avgVelocity: Math.round(list.reduce((s, o) => s + o.velocity.pct, 0) / list.length),
    topSeries:   list[0].velocity.series,
  }
}

export function SummaryFeed() {
  const { opportunities, filtered, loading, expandedId, activeModule, toggleExpanded, setModule } = useOpportunityView()

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, minHeight: 0 }}>
      <TopBar
        title="Portfolio Overview"
        sub="MODULE HEALTH · THEN RANKED FEED"
        count={filtered.length}
      />

      <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px 36px", minHeight: 0 }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>

          {/* Module status section */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span
              style={{
                fontFamily: "var(--font-dm-mono)",
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "1.2px",
                textTransform: "uppercase",
                color: "#fff",
              }}
            >
              Module status
            </span>
            <span style={{ flex: 1, height: 1, background: "var(--rule)" }} />
            {activeModule && (
              <button
                onClick={() => setModule(null)}
                style={{
                  cursor: "pointer",
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.72)",
                  background: "transparent",
                  border: "1px solid var(--rule-hi)",
                  borderRadius: "var(--radius-sm)",
                  padding: "3px 9px",
                }}
              >
                Clear filter ✕
              </button>
            )}
          </div>

          {/* 4-column module tile grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 12,
              marginBottom: 24,
            }}
          >
            {MODULE_ORDER.map((m) => {
              const stats = moduleStats(opportunities, m)
              return (
                <SummaryTile
                  key={m}
                  module={m}
                  active={activeModule === m}
                  onClick={() => setModule(activeModule === m ? null : m)}
                  topScore={stats.topScore}
                  count={stats.count}
                  avgVelocity={stats.avgVelocity}
                  topSeries={stats.topSeries}
                />
              )
            })}
          </div>

          <ScaleLegend />

          {/* Feed section header */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <span
              style={{
                fontFamily: "var(--font-dm-mono)",
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: "1.2px",
                textTransform: "uppercase",
                color: "#fff",
              }}
            >
              {activeModule ? MODULES[activeModule as ModuleKey].label : "All opportunities"} · ranked
            </span>
            <span style={{ flex: 1, height: 1, background: "var(--rule)" }} />
            <span
              style={{
                fontFamily: "var(--font-dm-mono)",
                fontSize: 10,
                color: "rgba(255,255,255,0.62)",
              }}
            >
              {filtered.length}
            </span>
          </div>

          {/* Loading state */}
          {loading && (
            <div
              style={{
                fontFamily: "var(--font-dm-mono)",
                fontSize: 11,
                letterSpacing: "1px",
                color: "var(--text-faint)",
                padding: "32px 0",
                textAlign: "center",
              }}
            >
              Loading opportunities…
            </div>
          )}

          {/* Ranked opportunity feed */}
          {!loading && (
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              {filtered.map((opp, i) => (
                <OppCard
                  key={opp.id}
                  opp={opp}
                  rank={i + 1}
                  density="comfortable"
                  showModule
                  expanded={expandedId === opp.id}
                  onToggle={() => toggleExpanded(opp.id)}
                />
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
