import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'

export type Sfx = 'button' | 'correct' | 'wrong' | 'fileOpen'

const SFX_URLS: Record<Sfx, string> = {
  button: '/audio/button.mp3',
  correct: '/audio/correct.mp3',
  wrong: '/audio/wrong.mp3',
  fileOpen: '/audio/file-open.mp3',
}

interface AudioApi {
  muted: boolean
  toggleMuted: () => void
  play: (sfx: Sfx) => void
}

const AudioContext_ = createContext<AudioApi | null>(null)

/** SFX + musique d'ambiance. L'ambiance démarre au premier geste utilisateur (politique autoplay des navigateurs). */
export function AudioProvider({ children }: { children: ReactNode }) {
  const [muted, setMuted] = useState(() => localStorage.getItem('enigmarena:muted') === '1')
  const ambient = useRef<HTMLAudioElement | null>(null)
  const sfx = useRef<Partial<Record<Sfx, HTMLAudioElement>>>({})
  const mutedRef = useRef(muted)
  mutedRef.current = muted

  useEffect(() => {
    const a = new Audio('/audio/ambient.mp3')
    a.loop = true
    a.volume = 0.35
    ambient.current = a
    for (const [k, url] of Object.entries(SFX_URLS)) {
      const el = new Audio(url)
      el.preload = 'auto'
      sfx.current[k as Sfx] = el
    }
    const start = () => {
      if (!mutedRef.current) a.play().catch(() => {})
    }
    window.addEventListener('pointerdown', start, { once: true })
    return () => {
      window.removeEventListener('pointerdown', start)
      a.pause()
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('enigmarena:muted', muted ? '1' : '0')
    const a = ambient.current
    if (!a) return
    if (muted) a.pause()
    else if (a.currentTime > 0) a.play().catch(() => {})
  }, [muted])

  const play = useCallback((name: Sfx) => {
    if (mutedRef.current) return
    const el = sfx.current[name]
    if (!el) return
    el.currentTime = 0
    el.play().catch(() => {})
  }, [])

  const toggleMuted = useCallback(() => setMuted((m) => !m), [])
  const value = useMemo(() => ({ muted, toggleMuted, play }), [muted, toggleMuted, play])

  return <AudioContext_.Provider value={value}>{children}</AudioContext_.Provider>
}

export function useAudio() {
  const ctx = useContext(AudioContext_)
  if (!ctx) throw new Error('useAudio doit être utilisé dans <AudioProvider>')
  return ctx
}
