import { create } from "zustand"

type OpportunityState = {
  expandedId:   string | null
  activeModule: string | null  // null = all modules
  query:        string
}

type OpportunityActions = {
  toggleExpanded: (id: string) => void
  setExpanded:    (id: string | null) => void
  setModule:      (module: string | null) => void
  setQuery:       (query: string) => void
}

type OpportunityStore = {
  state:   OpportunityState
  actions: OpportunityActions
}

export const useOpportunityStore = create<OpportunityStore>()((set) => ({
  state: {
    expandedId:   null,
    activeModule: null,
    query:        "",
  },
  actions: {
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
