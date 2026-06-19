type StatProps = {
  label: string
  value: string | number
  color?: string
  align?: "left" | "right"
}

export function Stat({ label, value, color = "#fff", align = "right" }: StatProps) {
  return (
    <div style={{ textAlign: align }}>
      <div
        style={{
          fontFamily: "var(--font-dm-mono)",
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "1.2px",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.62)",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: "var(--font-dm-mono)",
          fontSize: 16,
          color,
          marginTop: 3,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
      </div>
    </div>
  )
}
