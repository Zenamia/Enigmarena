import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'

export type Sfx = 'button' | 'correct' | 'wrong' | 'fileOpen'
/** Musique de fond : l'ambiance du jeu, ou le morceau de l'écran « The End ». */
export type Scene = 'ambient' | 'end'

const SFX_URLS: Record<Sfx, string> = {
  button: '/audio/button.mp3',
  correct: '/audio/correct.mp3',
  wrong: '/audio/wrong.mp3',
  fileOpen: '/audio/file-open.mp3',
}
const MUSIC: Record<Scene, { url: string; volume: number }> = {
  ambient: { url: '/audio/ambient.mp3', volume: 0.35 },
  end: { url: '/audio/the-end.mp3', volume: 0.6 },
}
const FADE_MS = 1200

interface AudioApi {
  muted: boolean
  toggleMuted: () => void
  play: (sfx: Sfx) => void
  /** Change de musique de fond (fondu enchaîné). */
  setScene: (scene: Scene) => void
}

const AudioContext_ = createContext<AudioApi | null>(null)

/** SFX + musiques. La musique démarre au premier geste utilisateur (politique autoplay des navigateurs). */
export function AudioProvider({ children }: { children: ReactNode }) {
  const [muted, setMuted] = useState(() => localStorage.getItem('enigmarena:muted') === '1')
  const music = useRef<Partial<Record<Scene, HTMLAudioElement>>>({})
  const sfx = useRef<Partial<Record<Sfx, HTMLAudioElement>>>({})
  const scene = useRef<Scene>('ambient')
  const unlocked = useRef(false)
  const mutedRef = useRef(muted)
  mutedRef.current = muted
  const fades = useRef<Partial<Record<Scene, number>>>({})

  const fade = useCallback((s: Scene, to: number, thenPause: boolean) => {
    const el = music.current[s]
    if (!el) return
    window.clearInterval(fades.current[s])
    const from = el.volume
    const t0 = performance.now()
    fades.current[s] = window.setInterval(() => {
      const p = Math.min(1, (performance.now() - t0) / FADE_MS)
      el.volume = Math.max(0, Math.min(1, from + (to - from) * p))
      if (p >= 1) {
        window.clearInterval(fades.current[s])
        if (thenPause) el.pause()
      }
    }, 40)
  }, [])

  /** Lance la musique de la scène courante (si le son est actif et le navigateur débloqué). */
  const startCurrent = useCallback(() => {
    if (!unlocked.current || mutedRef.current) return
    const s = scene.current
    const el = music.current[s]
    if (!el) return
    if (el.paused) {
      el.volume = 0
      el.play().catch(() => {})
    }
    fade(s, MUSIC[s].volume, false)
  }, [fade])

  useEffect(() => {
    for (const [k, m] of Object.entries(MUSIC)) {
      const a = new Audio(m.url)
      a.loop = true
      a.preload = 'none' // la musique se télécharge au premier geste du joueur, pas pendant l'affichage du premier écran
      music.current[k as Scene] = a
    }
    // Les petits sons arrivent juste après le premier écran, sans lui voler de bande passante.
    const sfxTimer = window.setTimeout(() => {
      for (const [k, url] of Object.entries(SFX_URLS)) {
        const el = new Audio(url)
        el.preload = 'auto'
        sfx.current[k as Sfx] = el
      }
    }, 1500)
    const unlock = () => {
      unlocked.current = true
      startCurrent()
    }
    window.addEventListener('pointerdown', unlock, { once: true })
    const m = music.current
    const f = fades.current
    return () => {
      window.clearTimeout(sfxTimer)
      window.removeEventListener('pointerdown', unlock)
      Object.values(f).forEach((id) => window.clearInterval(id))
      Object.values(m).forEach((a) => a?.pause())
    }
  }, [startCurrent])

  useEffect(() => {
    localStorage.setItem('enigmarena:muted', muted ? '1' : '0')
    if (muted) {
      ;(Object.keys(music.current) as Scene[]).forEach((s) => music.current[s]?.pause())
    } else {
      startCurrent()
    }
  }, [muted, startCurrent])

  const setScene = useCallback(
    (next: Scene) => {
      if (scene.current === next) return
      const prev = scene.current
      scene.current = next
      fade(prev, 0, true)
      if (!music.current[next]) return
      if (next === 'end') music.current.end!.currentTime = 0
      startCurrent()
    },
    [fade, startCurrent],
  )

  const play = useCallback((name: Sfx) => {
    if (mutedRef.current) return
    const el = (sfx.current[name] ??= new Audio(SFX_URLS[name]))
    el.currentTime = 0
    el.play().catch(() => {})
  }, [])

  const toggleMuted = useCallback(() => setMuted((m) => !m), [])
  const value = useMemo(() => ({ muted, toggleMuted, play, setScene }), [muted, toggleMuted, play, setScene])

  return <AudioContext_.Provider value={value}>{children}</AudioContext_.Provider>
}

export function useAudio() {
  const ctx = useContext(AudioContext_)
  if (!ctx) throw new Error('useAudio doit être utilisé dans <AudioProvider>')
  return ctx
}
