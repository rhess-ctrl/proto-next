import { useEffect, useMemo } from "react"
import { useOpportunityStore } from "@/store/opportunity-store"
import type { ModuleKey } from "@/lib/opportunities"

export function useOpportunityView(moduleFilter?: ModuleKey) {
  const { opportunities, loading, expandedId, activeModule, query } = useOpportunityStore((s) => s.state)
  const { loadOpportunities, toggleExpanded, setExpanded, setModule, setQuery } = useOpportunityStore(
    (s) => s.actions
  )

  useEffect(() => {
    loadOpportunities()
  }, [loadOpportunities])

  // moduleFilter lets a view hard-pin the module (e.g. ClientView)
  const effectiveModule = moduleFilter ?? activeModule

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return opportunities
      .filter((o) => {
        if (effectiveModule && o.module !== effectiveModule) return false
        if (q && !`${o.label} ${o.injury} ${o.defendant}`.toLowerCase().includes(q)) return false
        return true
      })
      .sort((a, b) => b.score - a.score)
  }, [opportunities, effectiveModule, query])

  return {
    opportunities,
    filtered,
    loading,
    expandedId,
    activeModule,
    query,
    toggleExpanded,
    setExpanded,
    setModule,
    setQuery,
  }
}
