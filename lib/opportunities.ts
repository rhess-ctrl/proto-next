export type ModuleKey = "pharma" | "device" | "consumer" | "institutional"
export type SolvencyState = "Solvent" | "At-Risk" | "Private" | "Unknown"

export type Module = {
  num: string
  short: string
  label: string
  icon: string
  color: string
  reportUnit: string
}

export type SubScores = {
  disproportionality: number
  volume: number
  severity: number
  velocity: number
}

export type Velocity = {
  pct: number
  series: number[]
}

export type Opportunity = {
  id: string
  module: ModuleKey
  label: string
  injury: string
  defendant: string
  score: number
  signalStrength: number
  sub: SubScores
  reportVolume: number
  severityRate: string
  velocity: Velocity
  year: string
  recency: string
}

export const MODULES: Record<ModuleKey, Module> = {
  pharma:        { num: "01", short: "Pharma",        label: "Pharmaceutical Drug & Biologic Injury", icon: "pill",         color: "#27BAEC", reportUnit: "adverse-event reports" },
  device:        { num: "02", short: "Device",        label: "Medical Device Injury",                 icon: "activity",     color: "#7E8BF5", reportUnit: "device reports" },
  consumer:      { num: "03", short: "Consumer",      label: "Consumer Product Harm",                 icon: "shopping-bag", color: "#E0A93C", reportUnit: "consumer product reports" },
  institutional: { num: "04", short: "Institutional", label: "Institutional Sexual Abuse",            icon: "landmark",     color: "#B57BE8", reportUnit: "documented incidents and articles" },
}

export const MODULE_ORDER: ModuleKey[] = ["pharma", "device", "consumer", "institutional"]

export const SOLVENCY_STATE: Record<string, SolvencyState> = {
  "TG-2588": "Solvent",  "TG-2543": "At-Risk",  "TG-2571": "Unknown",
  "TG-2614": "Solvent",  "TG-2510": "At-Risk",  "TG-2497": "Unknown",
  "TG-2602": "Solvent",  "TG-2559": "Private",  "TG-2531": "Unknown",
  "TG-2701": "Solvent",  "TG-2688": "Private",  "TG-2675": "Unknown",
}

export const SUBSCORE_INFO: Record<ModuleKey, Record<keyof SubScores, string>> = {
  pharma: {
    disproportionality: "Looks at whether this drug is linked to this type of harm far more often than other drugs. A high reading means the pattern stands out clearly from everything else being reported.",
    volume:             "Counts how many separate adverse-event reports describe this harm. A larger report count generally means a sturdier, better-documented picture.",
    severity:           "Reflects the share of reports describing serious medical outcomes — lasting injury or hospitalization rather than minor effects. Higher severity points to higher-stakes cases.",
    velocity:           "Measures how quickly new adverse-event reports are arriving over a recent time window. A rising rate suggests an emerging pattern worth watching.",
  },
  device: {
    disproportionality: "Looks at whether this device is linked to this type of problem far more often than other devices. A high reading means the pattern stands out from the broader device safety database.",
    volume:             "Counts how many separate device reports describe this problem. A larger report count generally means a sturdier, better-documented picture.",
    severity:           "Reflects the share of reports describing serious medical outcomes — lasting injury or hospitalization rather than minor effects. Higher severity points to higher-stakes cases.",
    velocity:           "Measures how quickly new device reports are arriving over a recent time window. A rising rate suggests an emerging pattern worth watching.",
  },
  consumer: {
    disproportionality: "Looks at whether this product is linked to this type of harm far more often than other consumer products. A high reading means the pattern stands out from everything else being reported.",
    volume:             "Counts how many separate consumer reports describe this harm. A larger report count generally means a sturdier, better-documented picture.",
    severity:           "Reflects the share of reports describing serious medical outcomes — lasting injury or hospitalization rather than minor effects. Higher severity points to higher-stakes cases.",
    velocity:           "Measures how quickly new consumer reports are arriving over a recent time window. A rising rate suggests an emerging pattern worth watching.",
  },
  institutional: {
    disproportionality: "Looks at how strongly this institution is associated with this type of abuse based on reported incidents, legal filings, and news coverage. A high reading means the pattern is concentrated and documented.",
    volume:             "Counts how many documented incidents and news articles describe this pattern of abuse. A larger, well-sourced record generally means a sturdier picture.",
    severity:           "Reflects the presence of criminal convictions, civil findings, and official classifications. Stronger findings point to higher-stakes cases.",
    velocity:           "Measures how quickly new incident reports and coverage are accumulating over a recent time window. A rising rate suggests an emerging pattern worth watching.",
  },
}

export const OPPORTUNITIES: Opportunity[] = [
  // Module 01 · Pharmaceutical
  { id: "TG-2588", module: "pharma",        label: "Harmful Drug A",      injury: "Cardiac arrhythmia",       defendant: "Big Pharma A",       score: 91, signalStrength: 86, sub: { disproportionality: 92, volume: 81, severity: 74, velocity: 70 }, reportVolume: 2910, severityRate: "61%", velocity: { pct: 18, series: [44, 47, 51, 55, 62, 71, 84]    }, year: "2026", recency: "1h ago"  },
  { id: "TG-2543", module: "pharma",        label: "Harmful Drug B",      injury: "Liver failure",            defendant: "Big Pharma B",       score: 87, signalStrength: 82, sub: { disproportionality: 80, volume: 94, severity: 68, velocity: 90 }, reportVolume: 6240, severityRate: "47%", velocity: { pct: 34, series: [38, 44, 52, 63, 78, 99, 132]   }, year: "2026", recency: "22m ago" },
  { id: "TG-2571", module: "pharma",        label: "Harmful Drug C",      injury: "Severe dental decay",      defendant: "Big Pharma C",       score: 78, signalStrength: 79, sub: { disproportionality: 81, volume: 64, severity: 70, velocity: 58 }, reportVolume: 1540, severityRate: "39%", velocity: { pct: 12, series: [60, 62, 65, 68, 72, 77, 84]    }, year: "2026", recency: "6h ago"  },
  // Module 02 · Medical Device
  { id: "TG-2614", module: "device",        label: "Harmful Device A",    injury: "Fracture & migration",     defendant: "Big Device Co A",    score: 88, signalStrength: 83, sub: { disproportionality: 85, volume: 80, severity: 88, velocity: 60 }, reportVolume: 3450, severityRate: "72%", velocity: { pct: 9,  series: [62, 64, 66, 69, 72, 76, 83]    }, year: "2026", recency: "3h ago"  },
  { id: "TG-2510", module: "device",        label: "Harmful Device B",    injury: "Premature degradation",    defendant: "Big Device Co B",    score: 82, signalStrength: 78, sub: { disproportionality: 76, volume: 82, severity: 72, velocity: 76 }, reportVolume: 2100, severityRate: "57%", velocity: { pct: 22, series: [40, 46, 53, 61, 70, 82, 96]    }, year: "2026", recency: "1d ago"  },
  { id: "TG-2497", module: "device",        label: "Harmful Device C",    injury: "Misfiring & obstruction",  defendant: "Big Device Co C",    score: 71, signalStrength: 73, sub: { disproportionality: 72, volume: 70, severity: 80, velocity: 52 }, reportVolume: 980,  severityRate: "64%", velocity: { pct: 7,  series: [70, 71, 72, 74, 76, 78, 82]    }, year: "2026", recency: "2d ago"  },
  // Module 03 · Consumer Product
  { id: "TG-2602", module: "consumer",      label: "Harmful Product A",   injury: "Neurodevelopmental harm",  defendant: "Big Consumer Co A",  score: 85, signalStrength: 80, sub: { disproportionality: 78, volume: 84, severity: 86, velocity: 82 }, reportVolume: 1120, severityRate: "71%", velocity: { pct: 28, series: [42, 48, 56, 66, 79, 95, 116]   }, year: "2026", recency: "48m ago" },
  { id: "TG-2559", module: "consumer",      label: "Harmful Product B",   injury: "Ovarian cancer",           defendant: "Big Consumer Co B",  score: 79, signalStrength: 76, sub: { disproportionality: 79, volume: 66, severity: 84, velocity: 72 }, reportVolume: 940,  severityRate: "69%", velocity: { pct: 19, series: [50, 55, 61, 68, 76, 86, 99]    }, year: "2026", recency: "5h ago"  },
  { id: "TG-2531", module: "consumer",      label: "Harmful Product C",   injury: "Multi-organ toxicity",     defendant: "Big Consumer Co C",  score: 73, signalStrength: 72, sub: { disproportionality: 70, volume: 88, severity: 78, velocity: 56 }, reportVolume: 2480, severityRate: "58%", velocity: { pct: 11, series: [58, 60, 63, 66, 70, 75, 81]    }, year: "2026", recency: "1d ago"  },
  // Module 04 · Institutional Abuse
  { id: "TG-2701", module: "institutional", label: "Bad Institution A",   injury: "Systemic staff abuse",     defendant: "Bad Institution A",  score: 90, signalStrength: 88, sub: { disproportionality: 91, volume: 78, severity: 95, velocity: 84 }, reportVolume: 214,  severityRate: "95%", velocity: { pct: 41, series: [12, 18, 27, 41, 80, 150, 214]   }, year: "2026", recency: "14m ago" },
  { id: "TG-2688", module: "institutional", label: "Bad Institution B",   injury: "Historical clergy abuse",  defendant: "Bad Institution B",  score: 83, signalStrength: 82, sub: { disproportionality: 84, volume: 80, severity: 88, velocity: 62 }, reportVolume: 380,  severityRate: "88%", velocity: { pct: 15, series: [200, 215, 235, 260, 290, 330, 380] }, year: "2026", recency: "9h ago"  },
  { id: "TG-2675", module: "institutional", label: "Bad Institution C",   injury: "Coaching abuse pattern",   defendant: "Bad Institution C",  score: 76, signalStrength: 77, sub: { disproportionality: 78, volume: 70, severity: 86, velocity: 70 }, reportVolume: 142,  severityRate: "86%", velocity: { pct: 22, series: [70, 78, 88, 100, 114, 128, 142]  }, year: "2026", recency: "1d ago"  },
]
