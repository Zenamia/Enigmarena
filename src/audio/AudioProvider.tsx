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

/** Volume enregistré sur l'appareil (1 par défaut ; l'ancien réglage « son coupé » vaut 0). */
function readVolume(key: string) {
  try {
    const raw = localStorage.getItem(key)
    if (raw !== null) return Math.min(1, Math.max(0, Number(raw)))
    return localStorage.getItem('enigmarena:muted') === '1' ? 0 : 1
  } catch {
    return 1
  }
}

interface AudioApi {
  /** Volume de la musique et des bruitages (boutons, bonne / mauvaise réponse, ouverture d'un dossier), de 0 à 1. */
  musicVolume: number
  sfxVolume: number
  setMusicVolume: (v: number) => void
  setSfxVolume: (v: number) => void
  play: (sfx: Sfx) => void
  /** Change de musique de fond (fondu enchaîné). */
  setScene: (scene: Scene) => void
}

const AudioContext_ = createContext<AudioApi | null>(null)

/** SFX + musiques. La musique démarre au premier geste utilisateur (politique autoplay des navigateurs). */
export function AudioProvider({ children }: { children: ReactNode }) {
  const [musicVolume, setMusicVolumeState] = useState(() => readVolume('enigmarena:vol:music'))
  const [sfxVolume, setSfxVolumeState] = useState(() => readVolume('enigmarena:vol:sfx'))
  const music = useRef<Partial<Record<Scene, HTMLAudioElement>>>({})
  const sfx = useRef<Partial<Record<Sfx, HTMLAudioElement>>>({})
  const scene = useRef<Scene>('ambient')
  const unlocked = useRef(false)
  const musicVol = useRef(musicVolume)
  musicVol.current = musicVolume
  const sfxVol = useRef(sfxVolume)
  sfxVol.current = sfxVolume
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
    if (!unlocked.current || musicVol.current === 0) return
    const s = scene.current
    const el = music.current[s]
    if (!el) return
    if (el.paused) {
      el.volume = 0
      el.play().catch(() => {})
    }
    fade(s, MUSIC[s].volume * musicVol.current, false)
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

  // Réglage de la musique : appliqué tout de suite au morceau en cours.
  useEffect(() => {
    try {
      localStorage.setItem('enigmarena:vol:music', String(musicVolume))
    } catch {
      /* stockage indisponible */
    }
    if (musicVolume === 0) {
      ;(Object.keys(music.current) as Scene[]).forEach((k) => {
        window.clearInterval(fades.current[k])
        music.current[k]?.pause()
      })
      return
    }
    const el = music.current[scene.current]
    if (el && !el.paused) {
      window.clearInterval(fades.current[scene.current])
      el.volume = MUSIC[scene.current].volume * musicVolume
    } else {
      startCurrent()
    }
  }, [musicVolume, startCurrent])

  useEffect(() => {
    try {
      localStorage.setItem('enigmarena:vol:sfx', String(sfxVolume))
    } catch {
      /* stockage indisponible */
    }
  }, [sfxVolume])

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
    if (sfxVol.current === 0) return
    const el = (sfx.current[name] ??= new Audio(SFX_URLS[name]))
    el.volume = sfxVol.current
    el.currentTime = 0
    el.play().catch(() => {})
  }, [])

  const setMusicVolume = useCallback((v: number) => setMusicVolumeState(Math.min(1, Math.max(0, v))), [])
  const setSfxVolume = useCallback((v: number) => {
    const c = Math.min(1, Math.max(0, v))
    sfxVol.current = c // pris en compte tout de suite (aperçu du son pendant le réglage)
    setSfxVolumeState(c)
  }, [])
  const value = useMemo(
    () => ({ musicVolume, sfxVolume, setMusicVolume, setSfxVolume, play, setScene }),
    [musicVolume, sfxVolume, setMusicVolume, setSfxVolume, play, setScene],
  )

  return <AudioContext_.Provider value={value}>{children}</AudioContext_.Provider>
}

export function useAudio() {
  const ctx = useContext(AudioContext_)
  if (!ctx) throw new Error('useAudio doit être utilisé dans <AudioProvider>')
  return ctx
}
