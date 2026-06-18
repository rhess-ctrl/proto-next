import { useSurfaceStore, type Surface } from "@/store/surface-store"

export type { Surface }

export function useSurface() {
  const active = useSurfaceStore((s) => s.state.active)
  const { setSurface } = useSurfaceStore((s) => s.actions)
  return { active, setSurface } as { active: Surface; setSurface: (s: Surface) => void }
}
