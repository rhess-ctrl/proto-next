import { NextResponse } from "next/server"
import { db } from "@/lib/firestore"
import type { Opportunity } from "@/lib/opportunities"

export const dynamic = "force-dynamic"

export async function GET() {
  const snapshot = await db.collection("opportunities").orderBy("score", "desc").get()
  const opportunities = snapshot.docs.map((doc) => doc.data() as Opportunity)
  return NextResponse.json(opportunities)
}
