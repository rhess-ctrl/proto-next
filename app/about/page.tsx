import Link from "next/link";

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-background p-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">About</h1>
        <p className="text-muted-foreground text-lg">
          Next.js · shadcn/ui · Tailwind CSS · GCP Cloud Run
        </p>
        <nav className="flex justify-center gap-4 pt-1 text-sm">
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
          <Link href="/about" className="text-foreground font-medium">About</Link>
        </nav>
      </div>

      <div className="w-full max-w-lg space-y-4 text-sm text-muted-foreground">
        <p>
          This is a static page — no data fetching, no <code className="font-mono bg-muted px-1 py-0.5 rounded">force-dynamic</code>.
          Next.js renders it at build time and serves it as a static asset.
        </p>
        <p>
          It lives at <code className="font-mono bg-muted px-1 py-0.5 rounded">app/about/page.tsx</code>.
          The file path is the route — no config needed.
        </p>
      </div>

      <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
        ← Back to home
      </Link>
    </main>
  );
}
