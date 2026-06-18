"use client"

import { Search, Pill } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useOpportunityView } from "@/hooks/use-opportunity-view"
import { MODULES } from "@/lib/opportunities"
import { OppCard } from "./opp-card"

export function ClientView() {
  const { filtered, expandedId, query, toggleExpanded, setQuery } = useOpportunityView("pharma")
  const meta = MODULES.pharma

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
        background: "var(--navy-field)",
      }}
    >
      {/* Client masthead */}
      <div
        style={{
          borderBottom: "1px solid var(--rule)",
          background: "rgba(0,10,24,0.5)",
          padding: "18px 40px 0",
          flexShrink: 0,
        }}
      >
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>

          {/* Top nav row */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <svg
              width="22"
              height="26"
              viewBox="0 0 120 140"
              fill="none"
              style={{ color: "var(--cyan-500)", flexShrink: 0 }}
            >
              <path
                d="M60 6 C60 6 60 18 71 18 L104 18 C108 18 110 21 110 25 L110 64 C110 99 88 122 60 134 C32 122 10 99 10 64 L10 25 C10 21 12 18 16 18 L49 18 C60 18 60 6 60 6 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="7"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{
                fontFamily: "var(--font-oswald)",
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                color: "#fff",
              }}
            >
              Tortelligence
            </span>
            <span
              style={{
                fontFamily: "var(--font-dm-mono)",
                fontSize: 10,
                letterSpacing: "1.4px",
                textTransform: "uppercase",
                color: "var(--text-faint)",
                borderLeft: "1px solid var(--rule-hi)",
                paddingLeft: 14,
              }}
            >
              for Whitfield &amp; Cole LLP
            </span>

            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 16 }}>
              {/* Search */}
              <div style={{ position: "relative", maxWidth: 280 }}>
                <Search
                  size={14}
                  strokeWidth={1.7}
                  style={{
                    position: "absolute",
                    left: 11,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--text-faint)",
                    pointerEvents: "none",
                  }}
                />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search this module…"
                  style={{
                    paddingLeft: 32,
                    width: 240,
                    background: "var(--navy-well)",
                    border: "1px solid var(--rule-hi)",
                    borderRadius: "var(--radius-md)",
                    color: "var(--text-body)",
                    fontFamily: "var(--font-open-sans)",
                    fontSize: 12,
                    height: 32,
                  }}
                />
              </div>

              {/* Avatar */}
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "var(--navy-raised)",
                  border: "1px solid var(--rule-hi)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: 10,
                  color: "var(--text-muted-hi)",
                }}
              >
                WC
              </div>
            </div>
          </div>

          {/* Module header row */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 16,
              padding: "22px 0 18px",
            }}
          >
            <span
              style={{
                width: 40,
                height: 40,
                borderRadius: 9,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: meta.color + "1f",
                border: `1px solid ${meta.color}59`,
                flexShrink: 0,
              }}
            >
              <Pill size={21} color={meta.color} strokeWidth={1.7} />
            </span>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: 10,
                  letterSpacing: "1.6px",
                  textTransform: "uppercase",
                  color: meta.color,
                  marginBottom: 7,
                }}
              >
                Module 01 · your subscription
              </div>
              <h1
                style={{
                  fontFamily: "var(--font-oswald)",
                  fontSize: 30,
                  fontWeight: 600,
                  letterSpacing: "0.3px",
                  textTransform: "uppercase",
                  color: "#fff",
                  margin: 0,
                  lineHeight: 1,
                }}
              >
                {meta.label}
              </h1>
            </div>
            <div style={{ marginLeft: "auto", textAlign: "right" }}>
              <div
                style={{
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: 10,
                  letterSpacing: "1.2px",
                  textTransform: "uppercase",
                  color: "var(--text-faint)",
                }}
              >
                Active opportunities
              </div>
              <div
                style={{
                  fontFamily: "var(--font-dm-mono)",
                  fontSize: 26,
                  color: "var(--cyan-300)",
                  marginTop: 3,
                }}
              >
                {filtered.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div
        style={{ flex: 1, overflowY: "auto", padding: "24px 40px 40px", minHeight: 0 }}
      >
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <p
            style={{
              fontSize: 13,
              color: "var(--text-muted-hi)",
              lineHeight: 1.7,
              maxWidth: 700,
              margin: "0 0 22px",
            }}
          >
            Disproportionality signals from FDA adverse-event data, ranked by opportunity score
            and time-stamped. Each opportunity carries its reporting evidence — report volume,
            severity rate and 90-day velocity. Click any opportunity to review the record.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
            {filtered.map((opp) => (
              <OppCard
                key={opp.id}
                opp={opp}
                density="feature"
                mode="client"
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
