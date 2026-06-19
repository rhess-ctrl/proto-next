export type ScoreBand = "strong" | "good" | "moderate" | "weak"

export function scoreBand(score: number): ScoreBand {
  if (score >= 85) return "strong"
  if (score >= 70) return "good"
  if (score >= 50) return "moderate"
  return "weak"
}

export function bandColor(score: number): string {
  return `var(--score-${scoreBand(score)})`
}

export function bandWord(score: number): string {
  const band = scoreBand(score)
  if (band === "strong")   return "Strong"
  if (band === "good")     return "Solid"
  if (band === "moderate") return "Moderate"
  return "Weak"
}
