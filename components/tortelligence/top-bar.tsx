"use client"

import { Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useOpportunityView } from "@/hooks/use-opportunity-view"

type TopBarProps = {
  title: string
  sub: string
  count?: number
}

export function TopBar({ title, sub, count }: TopBarProps) {
  const { query, setQuery } = useOpportunityView()

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 18,
        padding: "13px 24px",
        borderBottom: "1px solid var(--rule)",
        background: "rgba(0,10,24,0.5)",
        flexShrink: 0,
      }}
    >
      {/* Title */}
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontFamily: "var(--font-oswald)",
            fontSize: 18,
            fontWeight: 600,
            letterSpacing: "0.4px",
            textTransform: "uppercase",
            color: "#fff",
            lineHeight: 1,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: 10,
            letterSpacing: "0.8px",
            color: "rgba(255,255,255,0.72)",
            marginTop: 6,
          }}
        >
          {sub}
        </div>
      </div>

      {/* Search */}
      <div style={{ position: "relative", flex: 1, maxWidth: 340, marginLeft: 12 }}>
        <Search
          size={15}
          strokeWidth={1.7}
          style={{
            position: "absolute",
            left: 11,
            top: "50%",
            transform: "translateY(-50%)",
            color: "rgba(255,255,255,0.62)",
            pointerEvents: "none",
          }}
        />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search defendant, drug, device…"
          style={{
            paddingLeft: 34,
            background: "var(--navy-well)",
            border: "1px solid var(--rule-hi)",
            borderRadius: "var(--radius-md)",
            color: "var(--text-body)",
            fontFamily: "var(--font-open-sans)",
            fontSize: 12.5,
            height: 34,
          }}
        />
      </div>

      {/* Count + bell */}
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 16 }}>
        {count !== undefined && (
          <div
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: 10.5,
              letterSpacing: "0.5px",
              color: "rgba(255,255,255,0.72)",
            }}
          >
            <span style={{ color: "var(--cyan-400)" }}>{count}</span> ranked
          </div>
        )}
        <Bell size={17} strokeWidth={1.7} style={{ color: "var(--text-muted-hi)" }} />
      </div>
    </div>
  )
}
