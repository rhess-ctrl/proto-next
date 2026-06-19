"use client"

import { useSurface, type Surface } from "@/hooks/use-surface"

type SurfaceDef = {
  key: Surface
  n: string
  group: "internal" | "client"
  name: string
  note: string
}

const SURFACES: SurfaceDef[] = [
  { key: "internal", n: "01", group: "internal", name: "Summary + Feed", note: "Module health, then feed" },
  { key: "client",   n: "02", group: "client",   name: "Client View",    note: "Single module · law-firm" },
]

function Tab({ s, active, onSelect }: { s: SurfaceDef; active: Surface; onSelect: (k: Surface) => void }) {
  const on = s.key === active
  const isClient = s.group === "client"
  const col = isClient ? "var(--gold-400)" : "var(--cyan-400)"

  return (
    <button
      onClick={() => onSelect(s.key)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 9,
        padding: "6px 12px",
        cursor: "pointer",
        borderRadius: "var(--radius-md)",
        flexShrink: 0,
        background: on ? (isClient ? "var(--gold-tint)" : "var(--cyan-tint)") : "transparent",
        border: on ? `1px solid ${col}66` : "1px solid transparent",
        textAlign: "left",
        transition: "background var(--dur-fast), border-color var(--dur-fast)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-dm-mono)",
          fontSize: 11,
          color: on ? col : "var(--text-faint)",
        }}
      >
        {s.n}
      </span>
      <span style={{ lineHeight: 1.2, whiteSpace: "nowrap" }}>
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-oswald)",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.4px",
            textTransform: "uppercase",
            color: on ? "#fff" : "var(--text-muted-hi)",
          }}
        >
          {s.name}
        </span>
        <span
          style={{
            display: "block",
            fontFamily: "var(--font-dm-mono)",
            fontSize: 10,
            letterSpacing: "0.6px",
            color: "rgba(255,255,255,0.62)",
            marginTop: 2,
          }}
        >
          {s.note}
        </span>
      </span>
    </button>
  )
}

export function SurfaceSwitcher() {
  const { active, setSurface } = useSurface()

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        height: 60,
        flexShrink: 0,
        padding: "0 18px",
        background: "var(--navy-trough)",
        borderBottom: "1px solid var(--rule-hi)",
      }}
    >
      {/* Brand label */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          paddingRight: 14,
          borderRight: "1px solid var(--rule)",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: 10,
            letterSpacing: "2.2px",
            textTransform: "uppercase",
            color: "var(--cyan-400)",
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
            fontWeight: 500,
          color: "rgba(255,255,255,0.62)",
          }}
        >
          Homepage surfaces
        </span>
      </div>

      {/* Internal tabs */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: 10,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            fontWeight: 500,
            color: "rgba(255,255,255,0.62)",
            marginRight: 4,
          }}
        >
          Internal
        </span>
        {SURFACES.filter((s) => s.group === "internal").map((s) => (
          <Tab key={s.key} s={s} active={active} onSelect={setSurface} />
        ))}
      </div>

      {/* Client tabs */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          paddingLeft: 10,
          marginLeft: 2,
          borderLeft: "1px solid var(--rule)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-dm-mono)",
            fontSize: 10,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            fontWeight: 500,
            color: "rgba(255,255,255,0.62)",
            marginRight: 4,
          }}
        >
          Client
        </span>
        {SURFACES.filter((s) => s.group === "client").map((s) => (
          <Tab key={s.key} s={s} active={active} onSelect={setSurface} />
        ))}
      </div>

      {/* Right — sync status + user */}
      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          gap: 14,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "var(--score-strong)",
              boxShadow: "0 0 8px var(--score-strong)",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: 10,
              letterSpacing: "0.8px",
              textTransform: "uppercase",
              fontWeight: 500,
              color: "rgba(255,255,255,0.72)",
              whiteSpace: "nowrap",
            }}
          >
            Last synced Jun 12, 2026
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 9,
            paddingLeft: 14,
            borderLeft: "1px solid var(--rule)",
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "var(--cyan-600)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-dm-mono)",
              fontSize: 10,
              color: "#fff",
              fontWeight: 500,
              flexShrink: 0,
            }}
          >
            CK
          </div>
          <div style={{ lineHeight: 1.3, whiteSpace: "nowrap" }}>
            <div style={{ fontFamily: "var(--font-open-sans)", fontSize: 11.5, color: "var(--text-body)" }}>
              CC Kitanovski, Ph.D.
            </div>
            <div
              style={{
                fontFamily: "var(--font-dm-mono)",
                fontSize: 10,
                color: "rgba(255,255,255,0.62)",
                letterSpacing: "0.5px",
              }}
            >
              Internal · Admin
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
