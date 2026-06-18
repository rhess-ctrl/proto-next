export function Sidebar() {
  return (
    <aside
      style={{
        width: 224,
        flexShrink: 0,
        background: "var(--navy-trough)",
        borderRight: "1px solid var(--rule)",
        display: "flex",
        flexDirection: "column",
        padding: "16px 11px",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 8px 16px" }}>
        <svg width="24" height="28" viewBox="0 0 120 140" fill="none" style={{ color: "var(--cyan-500)", flexShrink: 0 }}>
          <path
            d="M60 6 C60 6 60 18 71 18 L104 18 C108 18 110 21 110 25 L110 64 C110 99 88 122 60 134 C32 122 10 99 10 64 L10 25 C10 21 12 18 16 18 L49 18 C60 18 60 6 60 6 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="7"
            strokeLinejoin="round"
          />
        </svg>
        <div style={{ lineHeight: 1 }}>
          <div
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
          </div>
          <div
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: 10,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "var(--text-faint)",
              marginTop: 4,
            }}
          >
            Shield Legal · DSIS
          </div>
        </div>
      </div>

      {/* Nav placeholder */}
      <div
        style={{
          fontFamily: "var(--font-dm-mono)",
          fontSize: 10,
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.28)",
          padding: "0 4px 8px",
        }}
      >
        Navigation — not in scope yet
      </div>
      <nav style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 11px",
              borderRadius: "var(--radius-md)",
              border: "1px dashed var(--rule-strong)",
              color: "rgba(255,255,255,0.28)",
              fontFamily: "var(--font-dm-mono)",
              fontSize: 10,
              letterSpacing: "1.6px",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: 14,
                height: 14,
                borderRadius: 3,
                border: "1px dashed var(--rule-strong)",
                flexShrink: 0,
              }}
            />
            Placeholder
          </div>
        ))}
      </nav>

      {/* Account placeholder */}
      <div style={{ marginTop: "auto" }}>
        <div
          style={{
            padding: 12,
            borderRadius: "var(--radius-md)",
            border: "1px dashed var(--rule-strong)",
            color: "rgba(255,255,255,0.28)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-dm-mono)",
              fontSize: 10,
              letterSpacing: "1.6px",
              textTransform: "uppercase",
            }}
          >
            Placeholder
          </div>
          <div
            style={{
              fontFamily: "var(--font-open-sans)",
              fontSize: 10,
              marginTop: 5,
              color: "var(--text-faint)",
            }}
          >
            Account &amp; status area
          </div>
        </div>
      </div>
    </aside>
  )
}
