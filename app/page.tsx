import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getItems } from "@/lib/items";

export const dynamic = "force-dynamic";

export default async function Home() {
  const items = await getItems();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-background p-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">proto-next</h1>
        <p className="text-muted-foreground text-lg">
          Next.js · shadcn/ui · Tailwind CSS · GCP Cloud Run
        </p>
        <nav className="flex justify-center gap-4 pt-1 text-sm">
          <Link href="/" className="text-foreground font-medium">Home</Link>
          <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
        </nav>
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 w-full max-w-sm sm:max-w-none">
        <Button className="w-full sm:w-auto">Primary</Button>
        <Button className="w-full sm:w-auto" variant="secondary">Secondary</Button>
        <Button className="w-full sm:w-auto" variant="outline">Outline</Button>
        <Button className="w-full sm:w-auto" variant="ghost">Ghost</Button>
        <Button className="w-full sm:w-auto" variant="destructive">Destructive</Button>
      </div>

      <div className="w-full max-w-lg space-y-3">
        <h2 className="text-xl font-semibold">Items</h2>
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">No items found.</p>
        ) : (
          <ul className="divide-y divide-border rounded-lg border">
            {items.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/items/${item.id}`}
                  className="block px-4 py-3 hover:bg-muted/50 transition-colors"
                >
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="text-sm text-muted-foreground">
        Data via <code className="font-mono bg-muted px-1 py-0.5 rounded">/api/items</code> · Firestore
      </p>
    </main>
  );
}
