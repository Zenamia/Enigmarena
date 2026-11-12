import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { useAudio } from '../audio/AudioProvider'

/** Taille d'un écran dans le Figma (mobile). Toutes les coordonnées sont celles du design. */
export const STAGE_W = 430.129
export const STAGE_H = 932.281

export interface Pos {
  x?: number
  cx?: number
  y?: number
  cy?: number
  w?: number
  h?: number
}

export function posStyle({ x, cx, y, cy, w, h }: Pos): CSSProperties {
  const s: CSSProperties = { position: 'absolute' }
  if (x !== undefined) s.left = x
  if (cx !== undefined) s.left = cx
  if (y !== undefined) s.top = y
  if (cy !== undefined) s.top = cy
  if (w !== undefined) s.width = w
  if (h !== undefined) s.height = h
  if (cx !== undefined || cy !== undefined) {
    s.transform = `translate(${cx !== undefined ? '-50%' : '0'}, ${cy !== undefined ? '-50%' : '0'})`
  }
  return s
}

export function Box({ children, style, className, ...pos }: Pos & { children?: ReactNode; style?: CSSProperties; className?: string }) {
  return (
    <div className={className} style={{ ...posStyle(pos), ...style }}>
      {children}
    </div>
  )
}

type FontKey = 'cinzel' | 'body' | 'corm' | 'script'
const FONT: Record<FontKey, string> = {
  cinzel: 'var(--font-cinzel)',
  body: 'var(--font-body)',
  corm: 'var(--font-corm)',
  script: 'var(--font-script)',
}

interface TxtProps extends Pos {
  children: ReactNode
  font?: FontKey
  size: number
  color?: string
  /** letter-spacing en px */
  ls?: number
  /** line-height (nombre = multiplicateur) */
  lh?: number | string
  align?: CSSProperties['textAlign']
  weight?: number
  nowrap?: boolean
  pre?: boolean
  style?: CSSProperties
}

export function Txt({ children, font = 'body', size, color = '#1f130b', ls = 0, lh = 1.28, align = 'center', weight, nowrap, pre, style, ...pos }: TxtProps) {
  return (
    <div
      style={{
        ...posStyle(pos),
        fontFamily: FONT[font],
        fontSize: font === 'body' ? `calc(${size}px * var(--body-scale))` : size,
        color,
        letterSpacing: ls,
        lineHeight: lh,
        textAlign: align,
        fontWeight: weight ?? (font === 'cinzel' || font === 'corm' ? 700 : 400),
        whiteSpace: nowrap ? 'nowrap' : pre ? 'pre-line' : undefined,
        wordBreak: 'break-word',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/** Bouton « plaque » rouge et laiton. */
export function Plaque({ label, y, x = 100.03, center, onClick, disabled, sound = 'button' }: { label: string; y: number; x?: number; center?: boolean; onClick?: () => void; disabled?: boolean; sound?: 'button' | 'fileOpen' | null }) {
  const { play } = useAudio()
  return (
    <button
      type="button"
      className="plaque"
      disabled={disabled}
      style={{
        position: 'absolute',
        top: y,
        left: center ? 'calc(50% + 0.5px)' : x,
        width: 225.068,
        height: 76.023,
        transform: center ? 'translateX(-50%)' : undefined,
      }}
      onClick={() => {
        if (sound) play(sound)
        onClick?.()
      }}
    >
      <img className="plaque-art" src="/img/ui/plaque.webp" alt="" draggable={false} style={{ width: 228.069, height: 76.023 }} />
      <span className="plaque-label">{label}</span>
    </button>
  )
}

export function Paper({ y, h = 541.163 }: { y: number; h?: number }) {
  return <img src="/img/ui/paper-panel.webp" alt="" draggable={false} style={{ position: 'absolute', left: 22.01, top: y, width: 382.115, height: h, objectFit: 'contain', pointerEvents: 'none' }} />
}

export function Screen({ bg, overlay = 0.4, children, className }: { bg: string; overlay?: number; children: ReactNode; className?: string }) {
  return (
    <div className={`screen ${className ?? ''}`}>
      <img className="screen-bg" src={bg} alt="" draggable={false} />
      {overlay > 0 && <div className="overlay" style={{ background: `rgba(3,3,5,${overlay})` }} />}
      {children}
    </div>
  )
}

/** Bandeau du haut : « SHADOW RIDDLE » + texte du ruban rouge du décor (ex. « CASE FILE 01 »). */
export function Header({ ribbon }: { ribbon?: string }) {
  return (
    <>
      <Txt font="cinzel" size={13.004} ls={0.2601} color="#f0deb2" cx={213.06} cy={30.01} w={140.042}>
        SHADOW RIDDLE
      </Txt>
      {ribbon && (
        <Txt font="cinzel" size={24} ls={0.5} color="#f0deb2" cx={213.06} cy={70} w={300} lh={1} style={{ textShadow: '0 2px 2px rgba(40,5,5,.55)' }}>
          {ribbon}
        </Txt>
      )}
    </>
  )
}

export const caseRibbon = (n: number) => `CASE FILE ${String(n).padStart(2, '0')}`

/** Barre de défilement décorative (rail + gemme), synchronisée avec un bloc de texte. */
export function ScrollBar({ x, y, frac, onDrag }: { x: number; y: number; frac: number; onDrag: (f: number) => void }) {
  const RANGE = 190
  const dragging = useRef<{ y0: number; f0: number } | null>(null)
  return (
    <>
      <div style={{ position: 'absolute', left: x, top: y, width: 45.048, height: 401, overflow: 'hidden', pointerEvents: 'none' }}>
        <img src="/img/ui/scroll-track.webp" alt="" draggable={false} style={{ position: 'absolute', height: '100%', left: '-98.36%', width: '296.72%', maxWidth: 'none', top: 0 }} />
      </div>
      <div
        className="scroll-thumb"
        style={{ position: 'absolute', left: x + 11.81, top: y + 69.23 + frac * RANGE, width: 21.604, height: 104.324, overflow: 'hidden', touchAction: 'none' }}
        onPointerDown={(e) => {
          ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
          dragging.current = { y0: e.clientY, f0: frac }
        }}
        onPointerMove={(e) => {
          if (!dragging.current) return
          const scale = (e.currentTarget as HTMLElement).getBoundingClientRect().height / 104.324
          onDrag(Math.min(1, Math.max(0, dragging.current.f0 + (e.clientY - dragging.current.y0) / scale / RANGE)))
        }}
        onPointerUp={() => (dragging.current = null)}
      >
        <img src="/img/ui/scroll-thumb.webp" alt="" draggable={false} style={{ position: 'absolute', height: '120.27%', left: '-46.79%', top: '-10.74%', width: '193.58%', maxWidth: 'none' }} />
      </div>
    </>
  )
}

/** Bloc de texte défilant, avec la barre décorative du design. */
export function ScrollText({ box, track, children, size = 20.006 }: { box: { x: number; y: number; w: number; h: number }; track: { x: number; y: number }; children: ReactNode; size?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [frac, setFrac] = useState(0)
  const onScroll = useCallback(() => {
    const el = ref.current
    if (!el) return
    const max = el.scrollHeight - el.clientHeight
    setFrac(max > 0 ? el.scrollTop / max : 0)
  }, [])
  useEffect(onScroll, [onScroll])
  const drag = (f: number) => {
    const el = ref.current
    if (el) el.scrollTop = f * (el.scrollHeight - el.clientHeight)
  }
  return (
    <>
      <div ref={ref} className="scroll-text" onScroll={onScroll} style={{ ...posStyle(box), fontFamily: FONT.body, fontSize: `calc(${size}px * var(--body-scale))`, lineHeight: 1.28, letterSpacing: 0.6, color: '#1f130b', textAlign: 'center' }}>
        {children}
      </div>
      <ScrollBar x={track.x} y={track.y} frac={frac} onDrag={drag} />
    </>
  )
}

/** Champ de saisie posé sur le papier du design. */
export function PaperInput({ x, y, value, onChange, placeholder, onEnter, state = 'idle', autoFocus, maxLength = 16, readOnly }: { x: number; y: number; value: string; onChange: (v: string) => void; placeholder: string; onEnter?: () => void; state?: 'idle' | 'wrong'; autoFocus?: boolean; maxLength?: number; readOnly?: boolean }) {
  return (
    <div className={`paper-input${state === 'wrong' ? ' is-wrong' : ''}`} style={{ position: 'absolute', left: x, top: y, width: 286.086, height: 66.02 }}>
      <img src={state === 'wrong' ? '/img/ui/input-wrong.webp' : '/img/ui/input-paper.webp'} alt="" draggable={false} />
      <input
        value={value}
        maxLength={maxLength}
        readOnly={readOnly}
        autoFocus={autoFocus}
        placeholder={placeholder}
        autoComplete="off"
        autoCapitalize="characters"
        spellCheck={false}
        enterKeyHint="done"
        onChange={(e) => onChange(e.target.value.toUpperCase())}
        onKeyDown={(e) => e.key === 'Enter' && onEnter?.()}
        style={{ letterSpacing: state === 'wrong' ? 2.0006 : 1.0003 }}
      />
    </div>
  )
}
