import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, type ReactNode } from 'react'
import { loadCloud, saveCloud } from './cloud'
import { CASES, HINT_PENALTY, REVEAL_PENALTY, TOTAL_SECONDS } from './data'

export type Screen =
  | { name: 'title' | 'signin' | 'continue' | 'instructions' | 'rules' | 'loading' | 'welcome' | 'files' | 'epilogue' | 'score' | 'end' }
  | { name: 'story' | 'invest' | 'hint' | 'puzzle' | 'confirm' | 'solution' | 'solved'; n: number }

export interface GameState {
  screen: Screen
  team: string
  /** Le nom d'équipe a été validé : c'est lui qui retrouve la partie, sur n'importe quel appareil. */
  confirmed: boolean
  startedAt: number | null
  finishedAt: number | null
  solved: number[]
  hintsOpened: number[]
  revealed: number[]
  /** Tous les dossiers sont ouverts (code d'équipe spécial). */
  unlockAll: boolean
  /** Date de la dernière modification : la version la plus récente l'emporte entre appareil et serveur. */
  savedAt: number
}

type Action =
  | { type: 'go'; screen: Screen }
  | { type: 'team'; team: string }
  | { type: 'start' }
  | { type: 'hint'; n: number }
  | { type: 'reveal'; n: number }
  | { type: 'solve'; n: number }
  | { type: 'newTeam'; team: string; unlockAll: boolean }
  | { type: 'replace'; state: GameState }
  | { type: 'reset' }

const KEY = 'enigmarena:game:v1'
const INITIAL: GameState = {
  screen: { name: 'title' },
  team: '',
  confirmed: false,
  startedAt: null,
  finishedAt: null,
  solved: [],
  hintsOpened: [],
  revealed: [],
  unlockAll: false,
  savedAt: 0,
}

const add = (list: number[], n: number) => (list.includes(n) ? list : [...list, n])

function step(s: GameState, a: Action): GameState {
  switch (a.type) {
    case 'go':
      return { ...s, screen: a.screen }
    case 'team':
      return { ...s, team: a.team, confirmed: false }
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
    case 'newTeam':
      return { ...INITIAL, team: a.team, unlockAll: a.unlockAll, confirmed: true, screen: { name: 'instructions' } }
    case 'replace':
      return a.state
    case 'reset':
      return INITIAL
  }
}

function reducer(s: GameState, a: Action): GameState {
  const next = step(s, a)
  // Une reprise venant du serveur garde sa propre date ; toute autre action date la modification.
  return a.type === 'replace' ? next : { ...next, savedAt: Date.now() }
}

/** Reprise d'une sauvegarde reçue : on repart du hub (ou des instructions si la partie n'a pas commencé). */
export function resume(s: GameState): GameState {
  return { ...INITIAL, ...s, confirmed: true, screen: { name: s.startedAt ? 'files' : 'instructions' } }
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
  /** Démarre une nouvelle partie sous ce nom d'équipe (efface la partie locale d'une autre équipe). */
  newTeam: (team: string, unlockAll: boolean) => void
  /** Remplace la partie par une sauvegarde retrouvée sur le serveur. */
  restore: (state: GameState) => void
  /** Prochain dossier à ouvrir (1..14), ou 15 quand tout est résolu. */
  current: number
}

const Ctx = createContext<GameApi | null>(null)

const SYNC_DELAY_MS = 900

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, load)
  const latest = useRef(state)
  latest.current = state

  // Copie locale : sert uniquement à reprendre la session en cours après un rechargement.
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      /* stockage indisponible : la partie reste jouable */
    }
  }, [state])

  // Sauvegarde en ligne sous le nom d'équipe, peu après chaque changement.
  useEffect(() => {
    if (!state.confirmed || !state.team) return
    const id = window.setTimeout(async () => {
      const r = await saveCloud(latest.current)
      if (r.status === 'conflict') dispatch({ type: 'replace', state: resume(r.state) }) // une version plus récente existe (autre appareil)
    }, SYNC_DELAY_MS)
    return () => window.clearTimeout(id)
  }, [state])

  // Dernière écriture avant de quitter / de passer en arrière-plan.
  useEffect(() => {
    const flush = () => {
      const s = latest.current
      if (s.confirmed && s.team) void saveCloud(s, true)
    }
    const onVisibility = () => document.visibilityState === 'hidden' && flush()
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('pagehide', flush)
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pagehide', flush)
    }
  }, [])

  // Au démarrage : si le serveur a une version plus récente de cette équipe (jouée ailleurs), on la reprend.
  useEffect(() => {
    const s = latest.current
    if (!s.confirmed || !s.team) return
    let cancelled = false
    loadCloud(s.team).then((r) => {
      if (!cancelled && r.status === 'found' && r.state.savedAt > latest.current.savedAt) dispatch({ type: 'replace', state: resume(r.state) })
    })
    return () => {
      cancelled = true
    }
  }, [])

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
      newTeam: (team, unlockAll) => dispatch({ type: 'newTeam', team, unlockAll }),
      restore: (s) => dispatch({ type: 'replace', state: resume(s) }),
    }
  }, [state, go])

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}

export function useGame() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useGame doit être utilisé dans <GameProvider>')
  return ctx
}
