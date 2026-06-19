/**
 * Seeds the Firestore `opportunities` collection with generated mock data.
 * Run with: pnpm seed
 *
 * Requires Application Default Credentials (ADC):
 *   gcloud auth application-default login
 *   gcloud auth application-default set-quota-project proto-next
 */
import { db } from "../lib/firestore"
import { generateOpportunities } from "./opportunity-generator"

const BATCH_LIMIT = 499
const COLLECTION = "opportunities"

async function deleteCollection() {
  let deleted = 0
  let snapshot = await db.collection(COLLECTION).limit(BATCH_LIMIT).get()
  while (!snapshot.empty) {
    const batch = db.batch()
    snapshot.docs.forEach((d) => batch.delete(d.ref))
    await batch.commit()
    deleted += snapshot.size
    snapshot = await db.collection(COLLECTION).limit(BATCH_LIMIT).get()
  }
  if (deleted > 0) console.log(`  Cleared ${deleted} existing records`)
}

async function seed() {
  const opps = generateOpportunities(
    { pharma: 35, device: 28, consumer: 42, institutional: 20 },
    /* seed: */ 20260101,
  )

  console.log(`Seeding ${opps.length} opportunities to Firestore…`)
  await deleteCollection()

  for (let i = 0; i < opps.length; i += BATCH_LIMIT) {
    const chunk = opps.slice(i, i + BATCH_LIMIT)
    const batch = db.batch()
    for (const opp of chunk) {
      batch.set(db.collection(COLLECTION).doc(opp.id), opp)
    }
    await batch.commit()
  }

  console.log(`✓ Seeded ${opps.length} opportunities`)
  process.exit(0)
}

seed().catch((err) => {
  console.error("Seed failed:", err)
  process.exit(1)
})
