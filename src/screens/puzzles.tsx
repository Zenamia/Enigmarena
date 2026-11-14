import { useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { useI18n, type Lang } from '../i18n'
import { Box, Txt } from '../ui/layout'

const P = (name: string) => `/img/puzzle/${name}`

/** Image positionnée aux coordonnées du design (taille naturelle ou imposée). */
function Pic({ src, x, y, w, h, style }: { src: string; x: number; y: number; w?: number; h?: number; style?: CSSProperties }) {
  return <img src={src} alt="" draggable={false} style={{ position: 'absolute', left: x, top: y, width: w, height: h, maxWidth: 'none', display: 'block', ...style }} />
}

/** Boîte dont l'image déborde (ombres) selon les « inset » du design, en %. */
function Bleed({ src, x, y, w, h, inset }: { src: string; x: number; y: number; w: number; h: number; inset: [number, number, number, number] }) {
  const [t, r, b, l] = inset
  return (
    <Box x={x} y={y} w={w} h={h}>
      <div style={{ position: 'absolute', top: `${t}%`, right: `${r}%`, bottom: `${b}%`, left: `${l}%` }}>
        <img src={src} alt="" draggable={false} style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>
    </Box>
  )
}

const INK = '#1f130b'
/** Le Figma affiche ces « − » avec une police de repli : de simples barres de 12×3 px. */
const Bar = ({ cx, cy, w, h }: { cx: number; cy: number; w: number; h: number }) => <Box cx={cx} cy={cy} w={w} h={h} style={{ background: INK, borderRadius: 0.6, pointerEvents: 'none' }} />
const Dash = ({ cx }: { cx: number }) => <Bar cx={cx} cy={347} w={12} h={3} />

const p2icons: [string, number, number, number][] = [
  ['515', 283.67, 364.3, 37], ['534', 325.45, 364.3, 26], ['546', 192.33, 364.3, 41], ['597', 238.46, 364.3, 40], ['619', 107.57, 364.3, 51], ['641', 196.14, 271.9, 26],
  ['653', 167, 271.9, 24], ['659', 163.19, 364.3, 24], ['665', 109.54, 271.9, 53], ['685', 247.34, 210.95, 33], ['730', 225.96, 210.95, 17], ['733', 197.24, 210.95, 24],
  ['745', 172.8, 210.95, 20], ['762', 108.37, 210.95, 30], ['773', 143.27, 210.95, 25],
]

const tag = (key: string, x: number, y: number, w: number, h: number, inset: [number, number, number, number], text: string, cx: number, cy: number, tw: number) => (
  <div key={key}>
    <Bleed src={P(`p06-tag-${key}.svg`)} x={x} y={y} w={w} h={h} inset={inset} />
    <Txt size={16} ls={0.04} color="#000" lh="normal" cx={cx} cy={cy - 1.3} w={tw}>
      {text}
    </Txt>
  </div>
)

const fingerprints: [string, number, number][] = [
  ['e978d', 114.15, 199], ['db0fe', 260.46, 268.12], ['219b2', 260.46, 199], ['41e70', 114.15, 347.23], ['f85c4', 189.8, 268.12],
]

const numbered: [string, number, string][] = [
  ['1.', 199.5, ''], ['2.', 236.5, ''], ['3.', 272.5, ''], ['4.', 309.5, ''], ['5.', 345.5, ''], ['6.', 381.5, ''], ['7.', 418.5, ''],
]
const BOOK_Y = [193, 229, 265, 301, 337, 373, 409]

const circles: [string, number][] = [['#000000', 79.2], ['#7d0278', 148.4], ['#009c2c', 217.6], ['#750000', 286.8]]

/** Contenu graphique de chaque énigme (coordonnées du Figma). */
const PUZZLES: Record<number, ReactNode> = {
  1: <Pic src={P('p01-dots.svg')} x={114} y={317} w={197.592} h={59.166} />,
  2: (
    <>
      {[['1', 82, 225.5], ['2', 84.18, 300.7], ['3', 83.1, 385.21]].map(([t, cx, cy]) => (
        <Txt key={t as string} size={29.491} ls={1.4746} lh="normal" cx={cx as number} cy={(cy as number) - 1.7}>
          {t as string}
        </Txt>
      ))}
      {p2icons.map(([id, x, y, w]) => (
        <Pic key={id} src={P(`p02-${id}.svg`)} x={x} y={y} w={w} />
      ))}
      <Pic src={P('p02-785.svg')} x={108.55} y={451.9} w={89} />
    </>
  ),
  3: (
    <>
      {[98, 122, 193, 218, 291, 317].map((cx) => (
        <Dash key={cx} cx={cx} />
      ))}
      <Txt size={46.343} ls={2.3172} lh="normal" cx={206.78} cy={305.6} nowrap>
        01 : 05 : 03
      </Txt>
    </>
  ),
  5: (
    <Box x={99.75} y={186.02} w={247.006} h={247.472} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ flex: 'none', transform: 'rotate(12.22deg)', width: 207.642, height: 208.25, position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: '-0.86%' }}>
          <img src={P('p05-lines.svg')} alt="" draggable={false} style={{ width: '100%', height: '100%', display: 'block' }} />
        </div>
      </div>
    </Box>
  ),
  8: (
    <>
      <Bleed src={P('p08-arrow.svg')} x={121} y={452} w={174.915} h={23.992} inset={[-42.81, -5.72, -41.97, -5.72]} />
      {fingerprints.map(([id, x, y]) => (
        <img key={id} src={P(`p08-${id}.webp`)} alt="" draggable={false} style={{ position: 'absolute', left: x, top: y, width: 52.227, height: 51.843, objectFit: 'cover', boxShadow: '0 0.768px 11.521px rgba(209,188,153,.03)' }} />
      ))}
    </>
  ),
  10: <Pic src={P('p10-921.svg')} x={136.78} y={191} w={154} />,
  12: (
    <>
      {circles.map(([c, x]) => (
        <Box key={c} x={x} y={294} w={59.2} h={59.2} style={{ background: c, borderRadius: '50%' }} />
      ))}
    </>
  ),
  13: <Pic src={P('p13-1302.webp')} x={70} y={283.69} w={280} h={68} />,
}

function P4({ lines, size }: { lines: string[]; size: number }) {
  const ys = [236.54, 306.51, 383.49]
  return (
    <>
      <Pic src={P('p04-840.svg')} x={72} y={215} w={49} />
      <Pic src={P('p04-815.svg')} x={75.15} y={294.65} w={43} />
      <Pic src={P('p04-827.svg')} x={75.15} y={365.09} w={43} />
      {lines.map((t, i) => (
        <Txt key={i} size={size} lh="normal" align="left" x={129} y={ys[i] - 1.6} nowrap>
          {t}
        </Txt>
      ))}
    </>
  )
}

const P6_TAGS: [string, number, number, number, number, [number, number, number, number], number, number, number][] = [
  ['e9c8f', 107.59, 201.33, 211.793, 28.972, [-20.71, -4.72, -48.32, -4.72], 212.39, 215.85, 203.358],
  ['e9667', 128.79, 267.38, 169.092, 28.714, [-20.9, -5.91, -48.76, -5.91], 212.39, 281.34, 203.358],
  ['cf726', 159.63, 332.25, 108.474, 28.714, [-20.9, -9.22, -48.76, -9.22], 212.39, 346.37, 203.358],
  ['67ae2', 87.32, 396.06, 250.98, 28.714, [-20.9, -3.98, -48.76, -3.98], 213.3, 410.49, 264.185],
]
function P6({ lines }: { lines: string[] }) {
  return <>{P6_TAGS.map(([key, x, y, w, h, inset, cx, cy, tw], i) => tag(key, x, y, w, h, inset, lines[i], cx, cy, tw))}</>
}

function P7({ text, w }: { text: string; w: number }) {
  return (
    <Txt size={27.699} ls={0.0692} lh="38.778px" cx={212.77} cy={329.1} w={w} pre>
      {text}
    </Txt>
  )
}

/** Sept livres : les mots écrits sont les catégories ; les cases vides sont à trouver sur les livres réels. */
function P11({ words }: { words: string[] }) {
  return (
    <>
      {numbered.map(([t, y]) => (
        <Txt key={t} size={20} lh="normal" align="left" x={90} y={y - 2.6}>
          {t}
        </Txt>
      ))}
      {words.map((t, i) => {
        const y = BOOK_Y[i]
        return t === '' ? (
          <Box key={y} x={140} y={y + 33.5} w={160} h={1.6} style={{ background: INK }} />
        ) : (
          <Txt key={y} size={25.448} lh="normal" align="left" x={140} y={y + 4}>
            {t}
          </Txt>
        )
      })}
    </>
  )
}

function P14({ text }: { text: string }) {
  return (
    <Txt size={35.063} lh="49.09px" x={83.7} y={213.7} w={259.1}>
      {text}
    </Txt>
  )
}

/** Énigmes dont le contenu change selon la langue (textes affichés sur le papier). */
const LOCALIZED: Record<number, Record<Lang, ReactNode>> = {
  4: {
    en: <P4 lines={['Advisor age = 64', 'Planner age = 25', 'Mayor = Advisor - Planner']} size={18} />,
    fr: <P4 lines={["Âge du conseiller = 64", "Âge de l'urbaniste = 25", 'Maire = Conseiller − Urbaniste']} size={16} />,
  },
  6: {
    en: <P6 lines={['He has this sixth sense', 'This red suit', 'This insect', 'And this strange tingling.']} />,
    fr: <P6 lines={['Il a ce sixième sens', 'Ce costume rouge', 'Cet insecte', 'Et ce curieux picotement.']} />,
  },
  7: {
    en: <P7 text={'NO CLUES\nFOR YOU'} w={199.962} />,
    fr: <P7 text={"PAS D'INDICE\nPOUR VOUS"} w={300} />,
  },
  9: {
    // En anglais, l'élève est français : les objets sont à traduire (drapeau). En français, ils forment directement le mot.
    en: (
      <>
        <Txt size={23.85} lh="33.39px" x={88.5} y={201.8} w={249} pre>
          {'Here are the items belonging to Patrique, the FRENCH student.\n\n\nEach item corresponds to a letter.'}
        </Txt>
        <Pic src={P('p09-909.svg')} x={189.41} y={311.56} w={48} />
      </>
    ),
    fr: (
      <Txt size={23.85} lh="33.39px" cx={214.99} cy={335.25} w={248.66} pre>
        {'Voici les objets appartenant au petit Patrique.\nChaque objet correspond à une lettre.'}
      </Txt>
    ),
  },
  11: {
    en: <P11 words={['', 'Innovation', 'Thriller', '', 'History', '', 'Novels']} />,
    fr: <P11 words={['', 'Univers', 'Investigation', '', 'Ingéniosité', '', 'Education']} />,
  },
  14: {
    en: <P14 text="First letters of the 3 masked ones discovered" />,
    fr: <P14 text="Premières lettres des 3 masqués découverts" />,
  },
}

// Zone du papier où l'énigme est visible (coordonnées de l'écran).
const CLIP = { x: 40, y: 112, w: 346, h: 372 }
const CENTER = { x: CLIP.x + CLIP.w / 2, y: CLIP.y + CLIP.h / 2 }
const MIN = 0.6
const MAX = 3.2

/** Énigme + loupe (− / + / réinitialiser). */
export function PuzzleViewer({ n }: { n: number }) {
  const { lang, ui } = useI18n()
  const [z, setZ] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [drag, setDrag] = useState(false)
  const start = useRef<{ x: number; y: number; px: number; py: number } | null>(null)

  const zoom = (f: number) =>
    setZ((cur) => {
      const next = Math.min(MAX, Math.max(MIN, cur * f))
      if (next <= 1) setPan({ x: 0, y: 0 })
      return next
    })
  const reset = () => {
    setZ(1)
    setPan({ x: 0, y: 0 })
  }

  return (
    <>
      <div
        className="puzzle-clip"
        style={{ left: CLIP.x, top: CLIP.y, width: CLIP.w, height: CLIP.h }}
        onWheel={(e) => zoom(e.deltaY < 0 ? 1.12 : 1 / 1.12)}
        onPointerDown={(e) => {
          if (z <= 1) return
          ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
          start.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y }
          setDrag(true)
        }}
        onPointerMove={(e) => {
          if (!start.current) return
          const k = (e.currentTarget as HTMLElement).getBoundingClientRect().width / CLIP.w // échelle de la scène
          const lim = ((z - 1) * Math.max(CLIP.w, CLIP.h)) / 2 + 40
          setPan({
            x: Math.max(-lim, Math.min(lim, start.current.px + (e.clientX - start.current.x) / k)),
            y: Math.max(-lim, Math.min(lim, start.current.py + (e.clientY - start.current.y) / k)),
          })
        }}
        onPointerUp={() => {
          start.current = null
          setDrag(false)
        }}
        onPointerCancel={() => {
          start.current = null
          setDrag(false)
        }}
      >
        <div
          className={`puzzle-inner${drag ? ' is-dragging' : ''}`}
          style={{ left: -CLIP.x, top: -CLIP.y, width: 430, height: 932, transformOrigin: `${CENTER.x}px ${CENTER.y}px`, transform: `translate(${pan.x}px, ${pan.y}px) scale(${z})`, cursor: z > 1 ? (drag ? 'grabbing' : 'grab') : undefined }}
        >
          {LOCALIZED[n]?.[lang] ?? PUZZLES[n]}
        </div>
      </div>
      <ZoomControls onOut={() => zoom(1 / 1.25)} onIn={() => zoom(1.25)} onReset={reset} labels={[ui.zoomOut, ui.zoomIn, ui.zoomReset]} />
    </>
  )
}

function ZoomControls({ onOut, onIn, onReset, labels }: { onOut: () => void; onIn: () => void; onReset: () => void; labels: [string, string, string] }) {
  const btn = (left: number, label: string, onClick: () => void) => (
    <button type="button" className="zoom-btn" aria-label={label} onClick={onClick} style={{ left, top: 15 }}>
      <img src="/img/ui/zoom-ellipse.svg" alt="" draggable={false} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />
    </button>
  )
  return (
    <Box cx={215.06} y={486.15} w={300.09} h={88.026}>
      <img src="/img/ui/zoom-controls.webp" alt="" draggable={false} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', pointerEvents: 'none' }} />
      {btn(46.01, labels[0], onOut)}
      {btn(101.03, labels[1], onIn)}
      {btn(156.05, labels[2], onReset)}
      <Bar cx={67.8} cy={37.9} w={12} h={3} />
      <Bar cx={122.8} cy={37.9} w={12} h={3} />
      <Bar cx={122.8} cy={37.9} w={3} h={11} />
      <img src="/img/ui/zoom-vector.svg" alt="" draggable={false} style={{ position: 'absolute', left: 167.07, top: 29, width: 19.53, height: 17.92, pointerEvents: 'none' }} />
    </Box>
  )
}
