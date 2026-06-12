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
