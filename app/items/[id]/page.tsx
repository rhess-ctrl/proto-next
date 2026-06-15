import Link from "next/link";
import { notFound } from "next/navigation";
import { getItem } from "@/lib/items";

export const dynamic = "force-dynamic";

export default async function ItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getItem(id);

  if (!item) notFound();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-background p-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">{item.name}</h1>
        <p className="text-muted-foreground text-lg">{item.description}</p>
        <nav className="flex justify-center gap-4 pt-1 text-sm">
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
          <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
        </nav>
      </div>

      <div className="w-full max-w-lg space-y-4 rounded-lg border p-6">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">ID</p>
          <p className="font-mono text-sm">{item.id}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Name</p>
          <p className="font-medium">{item.name}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Description</p>
          <p className="text-sm text-muted-foreground">{item.description}</p>
        </div>
      </div>

      <div className="text-sm text-muted-foreground text-center space-y-1">
        <p>
          Dynamic route — <code className="font-mono bg-muted px-1 py-0.5 rounded">app/items/[id]/page.tsx</code>
        </p>
        <p>The <code className="font-mono bg-muted px-1 py-0.5 rounded">[id]</code> segment matches any value and is passed as <code className="font-mono bg-muted px-1 py-0.5 rounded">params.id</code>.</p>
      </div>

      <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
        ← Back to home
      </Link>
    </main>
  );
}
