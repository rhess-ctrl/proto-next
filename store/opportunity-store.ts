import { create } from "zustand"
import type { Opportunity } from "@/lib/opportunities"

type OpportunityState = {
  opportunities: Opportunity[]
  loading:       boolean
  expandedId:    string | null
  activeModule:  string | null
  query:         string
}

type OpportunityActions = {
  loadOpportunities: () => Promise<void>
  toggleExpanded:    (id: string) => void
  setExpanded:       (id: string | null) => void
  setModule:         (module: string | null) => void
  setQuery:          (query: string) => void
}

type OpportunityStore = {
  state:   OpportunityState
  actions: OpportunityActions
}

export const useOpportunityStore = create<OpportunityStore>()((set, get) => ({
  state: {
    opportunities: [],
    loading:       false,
    expandedId:    null,
    activeModule:  null,
    query:         "",
  },
  actions: {
    loadOpportunities: async () => {
      if (get().state.loading || get().state.opportunities.length > 0) return
      set((s) => ({ state: { ...s.state, loading: true } }))
      try {
        const res = await fetch("/api/opportunities")
        const data: Opportunity[] = await res.json()
        set((s) => ({ state: { ...s.state, opportunities: data, loading: false } }))
      } catch (err) {
        console.error("Failed to load opportunities:", err)
        set((s) => ({ state: { ...s.state, loading: false } }))
      }
    },
    toggleExpanded: (id) =>
      set((s) => ({
        state: { ...s.state, expandedId: s.state.expandedId === id ? null : id },
      })),
    setExpanded: (id) =>
      set((s) => ({ state: { ...s.state, expandedId: id } })),
    setModule: (module) =>
      set((s) => ({ state: { ...s.state, activeModule: module } })),
    setQuery: (query) =>
      set((s) => ({ state: { ...s.state, query } })),
  },
}))
