"use client"

import { useOpportunityView } from "@/hooks/use-opportunity-view"
import { MODULE_ORDER, MODULES, type ModuleKey } from "@/lib/opportunities"
import { TopBar } from "./top-bar"
import { SummaryTile } from "./summary-tile"
import { OppCard } from "./opp-card"

export function SummaryFeed() {
  const { filtered, expandedId, activeModule, toggleExpanded, setModule } = useOpportunityView()

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, minHeight: 0 }}>
      <TopBar
        title="Portfolio Overview"
        sub="MODULE HEALTH · THEN RANKED FEED"
        count={filtered.length}
      />

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px 36px", minHeight: 0 }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>

          {/* Module status section */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span
              style={{
                fontFamily: "var(--font-dm-mono)",
                fontSize: 10,
                letterSpacing: "1.8px",
                textTransform: "uppercase",
                color: "var(--cyan-400)",
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
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
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
            {MODULE_ORDER.map((m) => (
              <SummaryTile
                key={m}
                module={m}
                active={activeModule === m}
                onClick={() => setModule(activeModule === m ? null : m)}
              />
            ))}
          </div>

          {/* Feed section header */}
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
              {activeModule ? MODULES[activeModule as ModuleKey].label : "All opportunities"} · ranked
            </span>
            <span style={{ flex: 1, height: 1, background: "var(--rule)" }} />
            <span
              style={{
                fontFamily: "var(--font-dm-mono)",
                fontSize: 10,
                color: "var(--text-faint)",
              }}
            >
              {filtered.length}
            </span>
          </div>

          {/* Ranked opportunity feed */}
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

        </div>
      </div>
    </div>
  )
}
