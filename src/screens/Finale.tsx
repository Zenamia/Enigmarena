import { useEffect } from 'react'
import { useAudio } from '../audio/AudioProvider'
import { EPILOGUE, mmss } from '../game/data'
import { reportFor, useGame } from '../game/GameContext'
import { Paper, Plaque, Screen, ScrollText, Txt } from '../ui/layout'
import { TitleBlock } from './Intro'

export function EpilogueScreen() {
  const { go } = useGame()
  return (
    <Screen bg="/img/bg/epilogue.webp">
      <Paper y={88.03} />
      <Txt font="cinzel" size={38.011} ls={0.7602} lh={1.12} cx={213.06} y={173.05} w={260.078}>
        EPILOGUE
      </Txt>
      <ScrollText box={{ x: 68, y: 244, w: 290, h: 289 }} track={{ x: 364.68, y: 151.9 }}>
        <p>{EPILOGUE}</p>
      </ScrollText>
      <Plaque label="CONTINUE" y={683.21} center onClick={() => go({ name: 'score' })} />
    </Screen>
  )
}

export function ScoreScreen() {
  const { state, go } = useGame()
  const r = reportFor(state)
  const rows: [string, string][] = [
    ['Time used', mmss(r.timeUsed)],
    ['Hints opened', String(r.hints)],
    ['Solutions revealed', String(r.reveals)],
    ['Penalty time', mmss(r.penalty)],
    ['Time left', mmss(r.timeLeft)],
  ]
  return (
    <Screen bg="/img/bg/epilogue.webp">
      <Paper y={68.02} />
      <Txt font="cinzel" size={25.669} ls={0.5134} lh={1.12} cx={213.06} y={152.05} w={231.018} pre>
        {'OFFICIAL\nCASE REPORT'}
      </Txt>
      {rows.map(([label, value], i) => {
        const y = 244.39 + i * 34.84
        return (
          <div key={label}>
            <Txt size={17.418} ls={0.0523} align="left" x={84.72} y={y} w={155.845}>
              {label}
            </Txt>
            <Txt size={17.418} ls={0.0523} color="#8f0f0e" align="right" x={341.41 - 91.674} y={y} w={91.674}>
              {value}
            </Txt>
          </div>
        )
      })}
      <Txt font="cinzel" size={22.918} ls={0.0688} color="#8f0f0e" cx={213.06} cy={449.16} w={210.85}>
        FINAL SCORE
      </Txt>
      <Txt font="cinzel" size={73.339} ls={1.4668} color="#8f0f0e" lh={1.12} cx={213.06} y={466.58} w={256.687}>
        {r.score}
      </Txt>
      <Plaque label="CONTINUE" y={683.21} center onClick={() => go({ name: 'end' })} />
    </Screen>
  )
}

export function EndScreen() {
  const { go } = useGame()
  const { setScene } = useAudio()
  // Musique de fin pendant « The End », puis retour à l'ambiance.
  useEffect(() => {
    setScene('end')
    return () => setScene('ambient')
  }, [setScene])
  return (
    <Screen bg="/img/bg/end.webp">
      <TitleBlock />
      <Txt font="script" size={74} color="#f0deb2" lh={1} cx={213.06} cy={293} w={300} weight={400} style={{ textShadow: '0 2px 10px rgba(0,0,0,.4)' }}>
        The End
      </Txt>
      <Plaque label="BACK TO FILES" y={733.22} center onClick={() => go({ name: 'files' })} />
    </Screen>
  )
}
