import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useAudio } from '../audio/AudioProvider'
import { CASE_COUNT, isCorrect } from '../game/data'
import { useGame } from '../game/GameContext'
import { useI18n } from '../i18n'
import { Box, Header, Paper, PaperInput, Plaque, Screen, Txt } from '../ui/layout'
import { PuzzleViewer } from './puzzles'

function ActionCard({ x, y, label, onClick }: { x: number; y: number; label: string; onClick: () => void }) {
  const { play } = useAudio()
  return (
    <button
      type="button"
      className="action"
      aria-label={label}
      onClick={() => {
        play('button')
        onClick()
      }}
      style={{ position: 'absolute', left: x, top: y, width: 174.052, height: 102.031, padding: 0, border: 0, background: 'none', filter: 'drop-shadow(0 4.001px 6.002px rgba(0,0,0,.5))' }}
    >
      <img src="/img/ui/action-card.webp" alt="" draggable={false} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' }} />
      <Txt size={19.006} ls={0.057} cx={87.03} y={29.01} w={150.045}>
        {label}
      </Txt>
    </button>
  )
}

export function InvestigationScreen({ n }: { n: number }) {
  const { go, openHint } = useGame()
  const { play } = useAudio()
  const { ui } = useI18n()
  return (
    <Screen bg="/img/bg/board.webp">
      <Header ribbon={ui.fileRibbon(n)} />
      <ActionCard
        x={40.01}
        y={301.09}
        label={ui.hint}
        onClick={() => {
          openHint(n)
          go({ name: 'hint', n })
        }}
      />
      <ActionCard x={213.06} y={301.09} label={ui.clue} onClick={() => go({ name: 'puzzle', n })} />
      <button
        type="button"
        className="action"
        aria-label={ui.revealSolution}
        onClick={() => {
          play('button')
          go({ name: 'confirm', n })
        }}
        style={{ position: 'absolute', left: 38.01, top: 415.12, width: 350.105, height: 120.036, padding: 0, border: 0, background: 'none', filter: 'drop-shadow(0 4.001px 2.001px rgba(0,0,0,.25))' }}
      >
        <img src="/img/ui/action-reveal.webp" alt="" draggable={false} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' }} />
        <Txt size={16.005} ls={0.8002} color="#0b0e13" cx={174.55} cy={33.01} w={115.035}>
          {ui.reveal}
        </Txt>
      </button>
      <Plaque label={ui.insertSolution} y={605.18} onClick={() => go({ name: 'solution', n })} />
      <Plaque label={ui.back} y={675.2} onClick={() => go({ name: 'story', n })} />
    </Screen>
  )
}

export function HintScreen({ n }: { n: number }) {
  const { go } = useGame()
  const { ui, content } = useI18n()
  return (
    <Screen bg="/img/bg/board.webp">
      <Header ribbon={ui.fileRibbon(n)} />
      <Paper y={88.03} />
      <Txt font="cinzel" size={42.013} ls={0.8403} lh={1.12} cx={213.06} y={197.06} w={180.054}>
        {ui.hint}
      </Txt>
      <Box cx={213.06} cy={396.62} w={278.084} h={295.089} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Txt size={23.007} ls={0.069} w={278.084} style={{ position: 'static' }}>
          {content.cases[n - 1].hint}
        </Txt>
      </Box>
      <Plaque label={ui.enterSolution} y={605.18} onClick={() => go({ name: 'solution', n })} />
      <Plaque label={ui.back} y={675.2} onClick={() => go({ name: 'invest', n })} />
    </Screen>
  )
}

export function PuzzleScreen({ n }: { n: number }) {
  const { go } = useGame()
  const { ui } = useI18n()
  return (
    <Screen bg="/img/bg/board.webp">
      <Header ribbon={ui.fileRibbon(n)} />
      <Paper y={82.02} />
      <PuzzleViewer n={n} />
      <Plaque label={ui.enterSolution} y={605.18} onClick={() => go({ name: 'solution', n })} />
      <Plaque label={ui.back} y={675.2} onClick={() => go({ name: 'invest', n })} />
    </Screen>
  )
}

/** Mallette ouverte (confirmation de la révélation, dossier résolu). */
function OpenCase({ y, children }: { y: number; children: ReactNode }) {
  return (
    <>
      <img src="/img/ui/case-open.webp" alt="" draggable={false} style={{ position: 'absolute', left: 22.01, top: y, width: 382.115, height: 520.157, objectFit: 'contain', pointerEvents: 'none' }} />
      {children}
    </>
  )
}

export function ConfirmScreen({ n }: { n: number }) {
  const { state, go, reveal } = useGame()
  const { ui } = useI18n()
  const already = state.revealed.includes(n)
  return (
    <Screen bg="/img/bg/board.webp">
      <Header ribbon={ui.fileRibbon(n)} />
      <OpenCase y={98.03}>
        <Txt font="cinzel" size={31.009} ls={0.6202} color="#f0deb2" lh={1.12} cx={213.07} y={231.07} w={300.09} pre>
          {ui.revealQuestion}
        </Txt>
        <Txt size={18.005} ls={0.054} cx={213.07} cy={447.64} w={182.055}>
          {already ? ui.revealPaid : ui.revealCost}
        </Txt>
      </OpenCase>
      <Plaque
        label={ui.revealSolution}
        y={605.18}
        onClick={() => {
          reveal(n)
          go({ name: 'solution', n })
        }}
      />
      <Plaque label={ui.back} y={675.2} onClick={() => go({ name: 'invest', n })} />
    </Screen>
  )
}

export function SolutionScreen({ n }: { n: number }) {
  const { state, go, solve } = useGame()
  const { play } = useAudio()
  const { ui, content } = useI18n()
  const c = content.cases[n - 1]
  const [value, setValue] = useState(state.revealed.includes(n) ? c.answer : '')
  const [status, setStatus] = useState<'idle' | 'wrong' | 'good'>('idle')
  const timer = useRef<number>(0)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  const submit = () => {
    if (status === 'good') return
    if (value.trim() && isCorrect(c, value)) {
      play('correct')
      setStatus('good')
      solve(n)
      timer.current = window.setTimeout(() => go({ name: 'solved', n }), 1100)
    } else {
      play('wrong')
      setStatus('wrong')
    }
  }

  return (
    <Screen bg="/img/bg/board.webp">
      <Header ribbon={ui.fileRibbon(n)} />
      <PaperInput
        x={70.02}
        y={321.1}
        value={value}
        placeholder={ui.insertSolution}
        state={status === 'wrong' ? 'wrong' : 'idle'}
        readOnly={status === 'good'}
        autoFocus
        onChange={(v) => {
          setStatus('idle')
          setValue(v)
        }}
        onEnter={submit}
      />
      <Plaque label={ui.insertSolution} y={605.18} sound={null} disabled={status === 'good'} onClick={submit} />
      <Plaque label={ui.back} y={675.2} disabled={status === 'good'} onClick={() => go({ name: 'invest', n })} />
    </Screen>
  )
}

export function SolvedScreen({ n }: { n: number }) {
  const { go } = useGame()
  const { ui, content } = useI18n()
  const c = content.cases[n - 1]
  return (
    <Screen bg="/img/bg/solved.webp" overlay={0}>
      <OpenCase y={155.05}>
        <Txt font="cinzel" size={32.01} ls={0.6402} color="#f0deb2" lh={1.12} cx={213.07} y={288.09} w={300.09} pre>
          {ui.brilliant}
        </Txt>
        <Txt size={16.005} ls={0.048} cx={213.07} cy={504.66} w={182.055}>
          {c.solved}
        </Txt>
      </OpenCase>
      <Txt size={16.005} ls={0.048} color="#e59a4a" cx={213.06} y={257.08} w={250.075}>
        {ui.fileSolved(n)}
      </Txt>
      <Plaque label={ui.next} y={675.2} onClick={() => go(n === CASE_COUNT ? { name: 'epilogue' } : { name: 'files' })} />
    </Screen>
  )
}
