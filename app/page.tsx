import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-background p-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">proto-next</h1>
        <p className="text-muted-foreground text-lg">
          Next.js · shadcn/ui · Tailwind CSS · GCP Cloud Run
        </p>
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 w-full max-w-sm sm:max-w-none">
        <Button className="w-full sm:w-auto">Primary</Button>
        <Button className="w-full sm:w-auto" variant="secondary">Secondary</Button>
        <Button className="w-full sm:w-auto" variant="outline">Outline</Button>
        <Button className="w-full sm:w-auto" variant="ghost">Ghost</Button>
        <Button className="w-full sm:w-auto" variant="destructive">Destructive</Button>
      </div>

      <p className="text-sm text-muted-foreground">
        shadcn/ui <code className="font-mono bg-muted px-1 py-0.5 rounded">Button</code> variants — stack is wired up.
      </p>
    </main>
  );
}
