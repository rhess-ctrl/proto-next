import { useMemo } from "react"
import { useOpportunityStore } from "@/store/opportunity-store"
import { OPPORTUNITIES, type ModuleKey } from "@/lib/opportunities"

export function useOpportunityView(moduleFilter?: ModuleKey) {
  const { expandedId, activeModule, query } = useOpportunityStore((s) => s.state)
  const { toggleExpanded, setExpanded, setModule, setQuery } = useOpportunityStore(
    (s) => s.actions
  )

  // moduleFilter lets a view hard-pin the module (e.g. ClientView)
  const effectiveModule = moduleFilter ?? activeModule

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return OPPORTUNITIES.filter((o) => {
      if (effectiveModule && o.module !== effectiveModule) return false
      if (q && !`${o.label} ${o.injury} ${o.defendant}`.toLowerCase().includes(q)) return false
      return true
    }).sort((a, b) => b.score - a.score)
  }, [effectiveModule, query])

  return {
    filtered,
    expandedId,
    activeModule,
    query,
    toggleExpanded,
    setExpanded,
    setModule,
    setQuery,
  }
}
