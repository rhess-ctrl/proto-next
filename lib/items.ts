import { db } from "@/lib/firestore";

export type Item = {
  id: string;
  name: string;
  description: string;
};

export async function getItems(): Promise<Item[]> {
  const snapshot = await db.collection("items").orderBy("name").get();
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name as string,
    description: doc.data().description as string,
  }));
}

export async function getItem(id: string): Promise<Item | null> {
  const doc = await db.collection("items").doc(id).get();
  if (!doc.exists) return null;
  return {
    id: doc.id,
    name: doc.data()!.name as string,
    description: doc.data()!.description as string,
  };
}
