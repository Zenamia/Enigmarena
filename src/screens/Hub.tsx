import { type ReactNode } from 'react'
import { useAudio } from '../audio/AudioProvider'
import { CASE_COUNT } from '../game/data'
import { useGame } from '../game/GameContext'
import { useI18n, type Lang } from '../i18n'
import { Box, Header, Paper, Plaque, Screen, ScrollText, Txt } from '../ui/layout'

/** Page d'histoire (prologue ou chapitre d'un dossier). */
export function StoryPage({ ribbon, title, text, artwork, onNext, onBack }: { ribbon: string; title: string; text: string; artwork: string; onNext: () => void; onBack: () => void }) {
  const { ui } = useI18n()
  return (
    <Screen bg="/img/bg/desk.webp">
      <Header ribbon={ribbon} />
      <Paper y={80.02} />
      <Box cx={212.97} cy={172.35} w={304.592} h={59.594} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Txt font="cinzel" size={27.432} ls={0.5486} lh={1.12} w={304.592} style={{ position: 'static', whiteSpace: 'pre-line' }}>
          {title}
        </Txt>
      </Box>
      {/* L'illustration défile avec le texte : toute la hauteur du papier sert à la lecture. */}
      <ScrollText key={title} className="story-scroll" box={{ x: 68.67, y: 213.5, w: 293, h: 329 }} track={{ x: 364.68, y: 151.55 }}>
        <img className="story-art" src={artwork} alt="" draggable={false} />
        <div className="story-text">
          {text.split('\n').map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </ScrollText>
      <Plaque label={ui.next} y={605.18} onClick={onNext} />
      <Plaque label={ui.back} y={675.2} onClick={onBack} />
    </Screen>
  )
}

export function WelcomeScreen() {
  const { go } = useGame()
  const { ui, content } = useI18n()
  return <StoryPage ribbon={ui.prologue} title={content.welcome.title} text={content.welcome.text} artwork="/img/story/00.webp" onNext={() => go({ name: 'files' })} onBack={() => go({ name: 'rules' })} />
}

export function StoryScreen({ n }: { n: number }) {
  const { go } = useGame()
  const { ui, content } = useI18n()
  const c = content.cases[n - 1]
  return (
    <StoryPage
      ribbon={ui.fileRibbon(n)}
      title={c.title}
      text={c.story}
      artwork={`/img/story/${String(n).padStart(2, '0')}.webp`}
      onNext={() => go({ name: 'invest', n })}
      onBack={() => go({ name: 'files' })}
    />
  )
}

type TileState = 'done' | 'open' | 'locked'
const TILE_X = [16, 118.03, 220.07, 322.1]
const TILE_Y = [188.06, 338.1, 488.15, 638.19]
const tilePos = (i: number) => (i < 12 ? { x: TILE_X[i % 4], y: TILE_Y[Math.floor(i / 4)] } : { x: TILE_X[(i % 12) + 1], y: TILE_Y[3] })

/** Les tampons sont des images contenant le mot : une version par langue. */
const stampSrc = (state: TileState, lang: Lang) => `/img/ui/stamp-${state === 'done' ? 'done' : state === 'open' ? 'open' : 'locked'}${lang === 'fr' ? '-fr' : ''}.webp`

const STAMP: Record<TileState, { box: { l: number | string; t: number; w: number; h: number }; inner: { w: number; h: number; rot: number } }> = {
  done: { box: { l: 13.68, t: 67.99, w: 68.291, h: 38.268 }, inner: { w: 64.409, h: 25.757, rot: -11.68 } },
  open: { box: { l: 'calc(50% + 2.01px)', t: 71.67, w: 71.486, h: 31.303 }, inner: { w: 69.196, h: 23.065, rot: -6.98 } },
  locked: { box: { l: 'calc(50% + 2.27px)', t: 70.39, w: 76.043, h: 35.003 }, inner: { w: 73.232, h: 24.411, rot: -8.53 } },
}
const CASE_ART: Record<TileState, string> = { done: '/img/ui/case-done.webp', open: '/img/ui/case-open.webp', locked: '/img/ui/case-locked.webp' }

function Tile({ n, state, onOpen }: { n: number; state: TileState; onOpen: () => void }) {
  const { ui, lang } = useI18n()
  const i = n - 1
  const { x, y } = tilePos(i)
  const st = STAMP[state]
  const centered = typeof st.box.l === 'string'
  const stamp: ReactNode = (
    <div style={{ position: 'absolute', left: st.box.l, top: st.box.t, width: st.box.w, height: st.box.h, transform: centered ? 'translateX(-50%)' : undefined, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
      <div style={{ flex: 'none', transform: `rotate(${st.inner.rot}deg)`, width: st.inner.w, height: st.inner.h, position: 'relative', boxShadow: '0 4.001px 20.006px rgba(240,222,178,.5)' }}>
        <img src={stampSrc(state, lang)} alt="" draggable={false} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    </div>
  )
  return (
    <button
      type="button"
      className="tile"
      disabled={state === 'locked'}
      aria-label={ui.fileAria(n, state)}
      onClick={onOpen}
      style={{ position: 'absolute', left: x, top: y, width: 92.028, height: 116.035, padding: 0, border: 0, background: 'none' }}
    >
      <img src={CASE_ART[state]} alt="" draggable={false} style={{ position: 'absolute', left: 0, top: 0, width: 96.029, height: 130.72, objectFit: 'contain', pointerEvents: 'none' }} />
      <Txt font="corm" weight={600} size={12.004} ls={0.036} color="#f0deb2" cx={46.01} y={26.01} w={74.022}>
        {ui.file}
      </Txt>
      <Txt font="cinzel" size={15.005} ls={0.3001} color="#f0deb2" lh={1.12} cx={46.01} y={41.01} w={64.019}>
        {String(n).padStart(2, '0')}
      </Txt>
      {stamp}
    </button>
  )
}

export function FilesScreen() {
  const { state, current, go } = useGame()
  const { ui } = useI18n()
  return (
    <Screen bg="/img/bg/desk.webp">
      <Header ribbon={ui.caseFiles} />
      {Array.from({ length: CASE_COUNT }, (_, i) => i + 1).map((n) => {
        const tileState: TileState = state.solved.includes(n) ? 'done' : state.unlockAll || n === current ? 'open' : 'locked'
        return <FileTile key={n} n={n} state={tileState} onOpen={() => go({ name: 'story', n })} />
      })}
    </Screen>
  )
}

function FileTile(props: { n: number; state: TileState; onOpen: () => void }) {
  const { play } = useAudio()
  return (
    <Tile
      {...props}
      onOpen={() => {
        play('fileOpen')
        props.onOpen()
      }}
    />
  )
}
