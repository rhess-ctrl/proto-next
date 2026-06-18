"use client"

import { useSurface } from "@/hooks/use-surface"
import { SurfaceSwitcher } from "./surface-switcher"
import { SummaryFeed } from "./summary-feed"
import { ClientView } from "./client-view"

export function AppShell() {
  const { active } = useSurface()

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--navy-abyss)",
        color: "var(--text-body)",
        overflow: "hidden",
      }}
    >
      <SurfaceSwitcher />
      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
        {active === "internal" ? (
          <SummaryFeed key="internal" />
        ) : (
          <ClientView key="client" />
        )}
      </div>
    </div>
  )
}
