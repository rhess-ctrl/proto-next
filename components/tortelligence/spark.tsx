type SparkProps = {
  series: number[]
  color?: string
  w?: number
  h?: number
  fill?: boolean
}

export function Spark({ series, color = "var(--score-strong)", w = 84, h = 26, fill = false }: SparkProps) {
  const max = Math.max(...series)
  const min = Math.min(...series)
  const rng = max - min || 1
  const pts = series.map((v, i) => {
    const x = (i / (series.length - 1)) * (w - 2) + 1
    const y = h - 2 - ((v - min) / rng) * (h - 4)
    return [x, y] as [number, number]
  })
  const line = pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ")
  const last = pts[pts.length - 1]
  const area = `1,${h - 1} ${line} ${(w - 1).toFixed(1)},${h - 1}`

  return (
    <svg width={w} height={h} style={{ display: "block", overflow: "visible", flexShrink: 0 }}>
      {fill && <polygon points={area} fill={color} opacity={0.10} />}
      <polyline points={line} fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={last[0]} cy={last[1]} r={2.4} fill={color} />
    </svg>
  )
}
