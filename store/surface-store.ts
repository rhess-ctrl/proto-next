import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Surface = "internal" | "client"

type SurfaceState = {
  active: Surface
}

type SurfaceActions = {
  setSurface: (surface: Surface) => void
}

type SurfaceStore = {
  state:   SurfaceState
  actions: SurfaceActions
}

export const useSurfaceStore = create<SurfaceStore>()(
  persist(
    (set) => ({
      state: {
        active: "internal",
      },
      actions: {
        setSurface: (surface) =>
          set((s) => ({ state: { ...s.state, active: surface } })),
      },
    }),
    {
      name:       "tortelligence.surface",
      version:    1,
      partialize: (s) => ({ state: { active: s.state.active } }),
    }
  )
)
