import { useEffect, useRef } from 'react'
import { useAudio } from '../audio/AudioProvider'
import { mmss } from '../game/data'
import { reportFor, useGame } from '../game/GameContext'
import { useI18n } from '../i18n'
import { Paper, Plaque, Screen, ScrollText, Txt, posStyle } from '../ui/layout'
import { TitleBlock } from './Intro'

export function EpilogueScreen() {
  const { go } = useGame()
  const { ui, content } = useI18n()
  return (
    <Screen bg="/img/bg/epilogue.webp">
      <Paper y={88.03} />
      <Txt font="cinzel" size={38.011} ls={0.7602} lh={1.12} cx={213.06} y={173.05} w={260.078}>
        {ui.epilogue}
      </Txt>
      <ScrollText box={{ x: 68, y: 244, w: 290, h: 289 }} track={{ x: 364.68, y: 151.9 }}>
        <p>{content.epilogue}</p>
      </ScrollText>
      <Plaque label={ui.continue} y={683.21} center onClick={() => go({ name: 'score' })} />
    </Screen>
  )
}

export function ScoreScreen() {
  const { state, go } = useGame()
  const { ui } = useI18n()
  const r = reportFor(state)
  const rows: [string, string][] = [
    [ui.timeUsed, mmss(r.timeUsed)],
    [ui.hintsOpened, String(r.hints)],
    [ui.solutionsRevealed, String(r.reveals)],
    [ui.penalty, mmss(r.penalty)],
    [ui.timeLeft, mmss(r.timeLeft)],
  ]
  return (
    <Screen bg="/img/bg/epilogue.webp">
      <Paper y={68.02} />
      <Txt font="cinzel" size={25.669} ls={0.5134} lh={1.12} cx={213.06} y={152.05} w={231.018} pre>
        {ui.report}
      </Txt>
      {rows.map(([label, value], i) => {
        const y = 244.39 + i * 34.84
        return (
          <div key={i}>
            <Txt size={17.418} ls={0.0523} align="left" x={84.72} y={y} w={165} nowrap>
              {label}
            </Txt>
            <Txt size={17.418} ls={0.0523} color="#8f0f0e" align="right" x={341.41 - 80} y={y} w={80}>
              {value}
            </Txt>
          </div>
        )
      })}
      <Txt font="cinzel" size={22.918} ls={0.0688} color="#8f0f0e" cx={213.06} cy={449.16} w={210.85}>
        {ui.finalScore}
      </Txt>
      <Txt font="cinzel" size={73.339} ls={1.4668} color="#8f0f0e" lh={1.12} cx={213.06} y={466.58} w={256.687}>
        {r.score}
      </Txt>
      <Plaque label={ui.continue} y={683.21} center onClick={() => go({ name: 'end' })} />
    </Screen>
  )
}

/** Vitesse du générique (px/s) : lent, comme un défilement de fin de film. */
const CREDITS_SPEED = 26
/** Attente avant le premier défilement (ms). */
const CREDITS_DELAY = 900

/**
 * Générique de fin « années 80 » : le texte monte lentement du bas de l'écran, centré, et s'estompe en haut et en bas.
 * Il boucle sans fin ; un appui prolongé le met en pause. Sans animation (réglage d'accessibilité), le texte reste lisible et défilable.
 */
function CreditsRoll({ text, box }: { text: string; box: { x: number; y: number; w: number; h: number } }) {
  const frame = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const anim = useRef<Animation | null>(null)
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const f = frame.current
    const el = inner.current
    if (!f || !el || reduced) return
    let alive = true
    const start = () => {
      if (!alive) return
      const H = f.clientHeight
      const h = el.scrollHeight
      anim.current?.cancel()
      anim.current = el.animate([{ transform: `translateY(${H}px)` }, { transform: `translateY(${-h}px)` }], {
        duration: ((H + h) / CREDITS_SPEED) * 1000,
        delay: CREDITS_DELAY,
        iterations: Infinity,
        easing: 'linear',
        fill: 'backwards',
      })
    }
    void document.fonts.ready.then(start)
    return () => {
      alive = false
      anim.current?.cancel()
    }
  }, [reduced])

  return (
    <div
      ref={frame}
      className={`credits${reduced ? ' credits--still' : ''}`}
      style={posStyle(box)}
      onPointerDown={() => anim.current?.pause()}
      onPointerUp={() => anim.current?.play()}
      onPointerCancel={() => anim.current?.play()}
      onPointerLeave={() => anim.current?.play()}
    >
      <div ref={inner} className="credits-text">
        {text.split('\n').map((line, i) => (
          <p key={i}>{line || '\u00a0'}</p>
        ))}
      </div>
    </div>
  )
}

export function EndScreen() {
  const { go } = useGame()
  const { setScene } = useAudio()
  const { ui, content } = useI18n()
  // Musique de fin pendant « The End », puis retour à l'ambiance.
  useEffect(() => {
    setScene('end')
    return () => setScene('ambient')
  }, [setScene])
  return (
    <Screen bg="/img/bg/end.webp">
      <TitleBlock />
      <Txt font="script" size={74} color="#f0deb2" lh={1} cx={213.06} cy={293} w={300} weight={400} style={{ textShadow: '0 2px 10px rgba(0,0,0,.4)' }}>
        {ui.theEnd}
      </Txt>
      <CreditsRoll text={content.end} box={{ x: 54, y: 338, w: 322, h: 380 }} />
      <Plaque label={ui.backToFiles} y={733.22} center onClick={() => go({ name: 'files' })} />
    </Screen>
  )
}
