export type VelocityBand = "strong" | "good" | "moderate" | "weak"
export type VelocityTier = { word: string; band: VelocityBand }

export function velocityTier(pct: number): VelocityTier {
  if (pct >= 30) return { word: "Surging",  band: "strong" }
  if (pct >= 15) return { word: "Rising",   band: "good" }
  if (pct >= 7)  return { word: "Climbing", band: "moderate" }
  return             { word: "Flat",     band: "weak" }
}

export function velocityColor(pct: number): string {
  return `var(--score-${velocityTier(pct).band})`
}
