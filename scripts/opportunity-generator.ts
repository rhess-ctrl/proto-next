import type { Opportunity, ModuleKey, SolvencyState } from "../lib/opportunities"

// Mulberry32 seeded PRNG — same seed → same dataset every run
function makePrng(seed: number) {
  let s = seed
  return () => {
    s |= 0; s = (s + 0x6D2B79F5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function pick<T>(arr: T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)]
}
function randInt(min: number, max: number, rand: () => number): number {
  return min + Math.floor(rand() * (max - min + 1))
}

// weighted toward mid range — matches a real litigation pipeline
function generateScore(rand: () => number): number {
  const tier = rand()
  if (tier < 0.07) return randInt(80, 96, rand)
  if (tier < 0.25) return randInt(65, 79, rand)
  if (tier < 0.60) return randInt(46, 64, rand)
  return randInt(26, 45, rand)
}

function velocityPct(score: number, rand: () => number): number {
  return Math.max(1, Math.min(60, Math.round(score * 0.35 + rand() * 15 - 5)))
}

function velocitySeries(pct: number, rand: () => number): number[] {
  const amplitude = pct * 1.4 + rand() * 18
  let v = 20 + Math.floor(rand() * 180)
  return Array.from({ length: 7 }, () => { const p = Math.round(v); v += amplitude * (0.07 + rand() * 0.09); return p })
}

function subScores(score: number, rand: () => number) {
  const n = () => Math.max(10, Math.min(99, Math.round(score + rand() * 22 - 11)))
  return { disproportionality: n(), volume: n(), severity: n(), velocity: n() }
}

function reportVol(score: number, module: ModuleKey, rand: () => number): number {
  const base = module === "institutional" ? 18 + score * 5
             : module === "consumer"      ? 80 + score * 14
             : module === "device"        ? 120 + score * 22
             :                             180 + score * 38
  return Math.round(base * (0.5 + rand()))
}

function severityRate(score: number, rand: () => number): string {
  return `${Math.max(12, Math.min(97, Math.round(score * 0.7 + rand() * 30)))}%`
}

function recencyStr(rand: () => number): string {
  const v = rand()
  if (v < 0.10) return `${randInt(15, 55, rand)}m ago`
  if (v < 0.25) return `${randInt(1, 11, rand)}h ago`
  if (v < 0.50) return `${randInt(1, 3, rand)}d ago`
  return `${randInt(4, 14, rand)}d ago`
}

const SOLVENCIES: SolvencyState[] = ["Solvent", "At-Risk", "Private", "Unknown"]

// ── Pharma ────────────────────────────────────────────────────────────────────

const P_PREFIX = [
  "Ver", "Drax", "Celt", "Mir", "Thren", "Quas", "Bin", "Pro", "Nex", "Dalm",
  "Astr", "Felb", "Orin", "Calp", "Ren", "Brav", "Amv", "Loph", "Nort", "Palb",
  "Quin", "Rox", "Tram", "Zol", "Gliv", "Imb", "Tec", "Mev", "Sulp", "Uren",
  "Hexo", "Doln", "Kraz", "Obrin", "Pexo", "Salix", "Turel", "Vidon", "Yeln", "Zephir",
]
const P_SUFFIX = [
  "alox", "ipine SR", "tivex", "avon", "olide", "astatin", "ovex", "lexan",
  "ovir", "azyn", "brizine", "pivot", "nolide", "vitix", "omide", "axon",
  "amine ER", "adone", "artan", "vastatin", "rozumab", "tinib", "oxacin",
  "cycline", "prazole", "dipine", "sartan", "formin", "lactam", "mycin",
]
const P_INJURY = [
  "Cardiac arrhythmia", "Hepatotoxicity", "Peripheral neuropathy", "Ischemic stroke",
  "Severe bone density loss", "Rhabdomyolysis", "Acute pancreatitis", "Fetal cardiac defects",
  "Interstitial lung disease", "QT prolongation & arrhythmia", "Treatment-emergent suicidal ideation",
  "Agranulocytosis", "Drug-induced lupus", "Severe hyponatremia", "Renal tubular acidosis",
  "Stevens-Johnson syndrome", "Pulmonary arterial hypertension", "Drug-induced liver failure",
  "Severe anaphylaxis", "Hemorrhagic stroke", "Optic neuritis", "Retroperitoneal fibrosis",
  "Autoimmune hepatitis", "Aplastic anemia", "Toxic epidermal necrolysis",
]
const P_DEFENDANT = [
  "Meridian BioPharm", "Crestline Therapeutics", "Novara Life Sciences", "Stelford Pharma Group",
  "Vantagen Medical", "Halcyon Biologics", "Pinnacle Drug Corp", "Areon Pharma",
  "Delcroft Biosciences", "Orvaxen Labs", "Stratford Pharmaceuticals", "Lumena Life Sciences",
  "Nexagen Biotech", "Parvane Drug Co.", "Quorvex Life Sciences",
]

// ── Device ────────────────────────────────────────────────────────────────────

const D_BRAND = [
  "Apex", "CoreMed", "Syntherion", "Vantara", "Stratum", "Nexis Medical",
  "Orbis Surgical", "Calibra", "Paragon Implants", "Verdax Medical",
  "Hallston Devices", "Lumis Surgical", "Praxis Medical", "Sentric Devices",
]
const D_PRODUCT = [
  "SpinalFix System", "Hip Stem Pro", "Cardiac Valve", "NeuroPulse",
  "Mesh Pro", "Pelvic Repair Kit", "Shoulder Hub", "RetinaSeal",
  "VentAssist", "Knee Platform", "OsteoPin", "Neural Stim",
  "Vascular Graft", "Spinal Cage", "Hip Liner", "Lumbar Disc",
  "Aortic Stent", "Tibial Nail", "Shoulder Plate", "Cochlear Processor",
  "Spinal Rod System", "Cervical Disc", "Ankle Arthroplasty", "Wrist Fusion Plate",
]
const D_INJURY = [
  "Implant migration & cord compression", "Elevated metal ion toxicity",
  "Leaflet tear & regurgitation", "Lead fracture & pocket infection",
  "Visceral erosion & fistula", "Pseudarthrosis & hardware failure",
  "Tibial component loosening", "Periprosthetic stress fracture",
  "Bowel perforation risk", "Rotator interface debonding",
  "Silicone oil emulsification & migration", "Pump thrombosis & haemolysis",
  "Hemorrhage at implant site", "Battery migration & erosion",
  "Wire corrosion & infection", "Poly component fracture",
  "Osteolysis & aseptic loosening", "Tissue adhesion & scar banding",
  "Ceramic head fracture", "Keel debonding & subsidence",
  "Graft delamination & stenosis", "Electrode displacement & arcing",
]
const D_DEFENDANT = [
  "Apex Implant Systems", "CoreMed Devices", "Syntherion Medical", "Vantara Surgical",
  "Stratum Medical", "Nexis Medical Corp", "Orbis Surgical Group", "Calibra Implants",
  "Paragon Implants Ltd.", "Verdax Medical", "Hallston Devices", "Lumis Surgical",
  "Praxis Medical Inc.", "Sentric Devices",
]

// ── Consumer ──────────────────────────────────────────────────────────────────

const C_BRAND = [
  "Solbrex", "Gloware", "Verdant", "Terracycle", "Lumex",
  "Cleantek", "Naturverde", "Flexsafe", "Puravex", "Brightex",
]
const C_PRODUCT = [
  "SPF 70 Sport", "Nursery Wipes", "Lawn Pro", "All-Surface Cleaner",
  "Daily Moisturizer", "Baby Powder", "Pest Barrier", "Wood Polish",
  "Tinted SPF", "Disinfecting Spray", "Tree & Shrub", "Deck Stain",
  "After-Sun Lotion", "Hand Sanitizer", "Garden Soil", "Grout Cleaner",
  "Kids Sunscreen", "Fabric Softener", "Indoor Plant Food", "Rust Remover",
  "Laundry Detergent", "Dish Soap", "Air Freshener", "Bathroom Cleaner",
  "Window Spray", "Carpet Cleaner", "Paint Stripper", "Drain Cleaner",
  "Multi-Surface Wipes", "Oven Cleaner",
]
const C_INJURY = [
  "Benzene contamination — cancer risk", "PFAS-linked developmental harm",
  "Chlorpyrifos neurotoxicity", "Occupational sensitizer — asthma",
  "Nitrosamine carcinogen trace", "Talc contamination — mesothelioma",
  "Organophosphate neurotoxin exposure", "Formaldehyde sensitization",
  "Oxybenzone endocrine disruption", "Ethylene oxide trace — cancer risk",
  "Imidacloprid groundwater runoff", "VOC sensitization — occupational asthma",
  "Retinyl palmitate photosensitivity", "Methanol contamination",
  "Lead particulate inhalation risk", "Hydrofluoric acid skin burns",
  "Benzophenone contamination", "Quaternary ammonium sensitization",
  "Boric acid ingestion risk", "Phosphoric acid burn on contact",
  "Asbestos fiber contamination", "1,4-dioxane carcinogen trace",
  "Phthalate endocrine disruption", "Sodium hypochlorite respiratory harm",
]
const C_DEFENDANT = [
  "Solbrex Health & Beauty", "Gloware Consumer Products", "Verdant Home Solutions",
  "Terracycle Industries", "Lumex Personal Care", "Cleantek Household",
  "Naturverde LLC", "Flexsafe Products", "Puravex Consumer Goods", "Brightex Corp",
]

// ── Institutional ─────────────────────────────────────────────────────────────

const I_LOCATION = [
  "Lakewood", "St. Aldemar", "Northgate", "Meridian", "Crestwood", "Harbor View",
  "Sunridge", "Vantage", "Fairview", "Ridgeline", "Oakbrook", "Silverdale",
  "Maplewood", "Glenbrook", "Pinehurst", "Clearwater", "Elmwood", "Brookfield",
  "Highland", "Stonegate", "Riverdale", "Westbrook", "Ashford", "Kenmore",
]
const I_TYPE = [
  "Youth Athletic Foundation", "Diocese", "Residential Care", "Preparatory Academy",
  "Treatment Center", "Group Home", "School District", "Behavioral Health",
  "Boys & Girls Club", "Community Center", "Youth Services", "Foster Agency",
  "Sports Academy", "Overnight Camp", "Youth Shelter", "Therapeutic Program",
  "Seminary", "Day School", "Athletic Club",
]
const I_INJURY = [
  "Systematic coach grooming & abuse", "Historical clergy sexual abuse",
  "Staff-on-resident physical abuse", "Faculty boundary violations — minors",
  "Patient exploitation & coercive control", "Caretaker abuse & neglect pattern",
  "Systematic staff misconduct — students", "Therapist-patient boundary violations",
  "Unsupervised volunteer predation pattern", "Administrator misconduct — residents",
  "Facility-wide neglect & exploitation", "Counselor predation — overnight program",
  "Coach-athlete boundary violations", "Director-facilitated exploitation pattern",
]

// ── builders ──────────────────────────────────────────────────────────────────

function build(id: string, module: ModuleKey, label: string, injury: string, defendant: string, rand: () => number): Opportunity {
  const score = generateScore(rand)
  const pct   = velocityPct(score, rand)
  return {
    id, module, label, injury, defendant,
    score,
    signalStrength: Math.max(10, score - randInt(1, 5, rand)),
    solvency:       pick(SOLVENCIES, rand),
    sub:            subScores(score, rand),
    reportVolume:   reportVol(score, module, rand),
    severityRate:   severityRate(score, rand),
    velocity:       { pct, series: velocitySeries(pct, rand) },
    year: "2026",
    recency: recencyStr(rand),
  }
}

// ── public API ────────────────────────────────────────────────────────────────

export type ModuleCounts = { pharma: number; device: number; consumer: number; institutional: number }

export function generateOpportunities(
  counts: ModuleCounts = { pharma: 35, device: 28, consumer: 42, institutional: 20 },
  seed = 20260101,
): Opportunity[] {
  const rand = makePrng(seed)
  const opps: Opportunity[] = []
  let seq = 1000

  for (let i = 0; i < counts.pharma; i++) {
    opps.push(build(`TG-P${++seq}`, "pharma", pick(P_PREFIX, rand) + pick(P_SUFFIX, rand), pick(P_INJURY, rand), pick(P_DEFENDANT, rand), rand))
  }
  for (let i = 0; i < counts.device; i++) {
    opps.push(build(`TG-D${++seq}`, "device", `${pick(D_BRAND, rand)} ${pick(D_PRODUCT, rand)}`, pick(D_INJURY, rand), pick(D_DEFENDANT, rand), rand))
  }
  for (let i = 0; i < counts.consumer; i++) {
    opps.push(build(`TG-C${++seq}`, "consumer", `${pick(C_BRAND, rand)} ${pick(C_PRODUCT, rand)}`, pick(C_INJURY, rand), pick(C_DEFENDANT, rand), rand))
  }
  for (let i = 0; i < counts.institutional; i++) {
    const name = `${pick(I_LOCATION, rand)} ${pick(I_TYPE, rand)}`
    opps.push(build(`TG-I${++seq}`, "institutional", name, pick(I_INJURY, rand), name, rand))
  }

  return opps
}
