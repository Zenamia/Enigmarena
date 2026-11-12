import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, type ReactNode } from 'react'
import { CASES, HINT_PENALTY, REVEAL_PENALTY, TOTAL_SECONDS } from './data'

export type Screen =
  | { name: 'title' | 'signin' | 'instructions' | 'rules' | 'loading' | 'welcome' | 'files' | 'epilogue' | 'score' | 'end' }
  | { name: 'story' | 'invest' | 'hint' | 'puzzle' | 'confirm' | 'solution' | 'solved'; n: number }

export interface GameState {
  screen: Screen
  team: string
  startedAt: number | null
  finishedAt: number | null
  solved: number[]
  hintsOpened: number[]
  revealed: number[]
  /** Tous les dossiers sont ouverts (code d'équipe spécial). */
  unlockAll: boolean
}

type Action =
  | { type: 'go'; screen: Screen }
  | { type: 'team'; team: string }
  | { type: 'start' }
  | { type: 'hint'; n: number }
  | { type: 'reveal'; n: number }
  | { type: 'solve'; n: number }
  | { type: 'unlockAll'; on: boolean }
  | { type: 'reset' }

const KEY = 'enigmarena:game:v1'
const INITIAL: GameState = {
  screen: { name: 'title' },
  team: '',
  startedAt: null,
  finishedAt: null,
  solved: [],
  hintsOpened: [],
  revealed: [],
  unlockAll: false,
}

const add = (list: number[], n: number) => (list.includes(n) ? list : [...list, n])

function reducer(s: GameState, a: Action): GameState {
  switch (a.type) {
    case 'go':
      return { ...s, screen: a.screen }
    case 'team':
      return { ...s, team: a.team }
    case 'start':
      return s.startedAt ? s : { ...s, startedAt: Date.now() }
    case 'hint':
      return { ...s, hintsOpened: add(s.hintsOpened, a.n) }
    case 'reveal':
      return { ...s, revealed: add(s.revealed, a.n) }
    case 'solve': {
      const solved = add(s.solved, a.n)
      const done = solved.length === CASES.length
      return { ...s, solved, finishedAt: done && !s.finishedAt ? Date.now() : s.finishedAt }
    }
    case 'unlockAll':
      return { ...s, unlockAll: a.on }
    case 'reset':
      return INITIAL
  }
}

function load(): GameState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return INITIAL
    const s = { ...INITIAL, ...JSON.parse(raw) } as GameState
    // L'écran de chargement est transitoire : on reprend au hub si la partie est lancée.
    if (s.screen.name === 'loading') s.screen = { name: s.startedAt ? 'files' : 'rules' }
    return s
  } catch {
    return INITIAL
  }
}

export interface Report {
  timeUsed: number
  hints: number
  reveals: number
  penalty: number
  timeLeft: number
  score: number
}

export function reportFor(s: GameState): Report {
  const end = s.finishedAt ?? Date.now()
  const timeUsed = s.startedAt ? Math.max(0, Math.round((end - s.startedAt) / 1000)) : 0
  const hints = s.hintsOpened.length
  const reveals = s.revealed.length
  const penalty = hints * HINT_PENALTY + reveals * REVEAL_PENALTY
  const timeLeft = Math.max(0, TOTAL_SECONDS - timeUsed - penalty)
  return { timeUsed, hints, reveals, penalty, timeLeft, score: timeLeft }
}

interface GameApi {
  state: GameState
  go: (screen: Screen) => void
  setTeam: (team: string) => void
  start: () => void
  openHint: (n: number) => void
  reveal: (n: number) => void
  solve: (n: number) => void
  reset: () => void
  setUnlockAll: (on: boolean) => void
  /** Prochain dossier à ouvrir (1..14), ou 15 quand tout est résolu. */
  current: number
}

const Ctx = createContext<GameApi | null>(null)

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, load)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      /* stockage indisponible : la partie reste jouable */
    }
  }, [state])

  const go = useCallback((screen: Screen) => dispatch({ type: 'go', screen }), [])
  const api = useMemo<GameApi>(() => {
    let current = 1
    while (state.solved.includes(current) && current <= CASES.length) current++
    return {
      state,
      go,
      current,
      setTeam: (team) => dispatch({ type: 'team', team }),
      start: () => dispatch({ type: 'start' }),
      openHint: (n) => dispatch({ type: 'hint', n }),
      reveal: (n) => dispatch({ type: 'reveal', n }),
      solve: (n) => dispatch({ type: 'solve', n }),
      reset: () => dispatch({ type: 'reset' }),
      setUnlockAll: (on) => dispatch({ type: 'unlockAll', on }),
    }
  }, [state, go])

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}

export function useGame() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useGame doit être utilisé dans <GameProvider>')
  return ctx
}
