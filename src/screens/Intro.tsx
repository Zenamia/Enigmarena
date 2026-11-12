import { useEffect, useRef, useState } from 'react'
import { useAudio } from '../audio/AudioProvider'
import { INSTRUCTIONS, CASES } from '../game/data'
import { useGame } from '../game/GameContext'
import { Box, Paper, PaperInput, Plaque, Screen, ScrollText, Txt } from '../ui/layout'

/** « THE SHADOW RIDDLE » : titre en trois lignes, commun au titre, au chargement et à la fin. */
export function TitleBlock() {
  return (
    <>
      <Txt font="cinzel" size={30.009} ls={0.6002} color="#f0deb2" lh={1.12} cx={215.07} y={102.03} w={350.105}>
        THE
      </Txt>
      <Txt font="cinzel" size={48.014} ls={0.9603} color="#f0deb2" lh={1.12} cx={215.07} y={132.04} w={340.102}>
        SHADOW
      </Txt>
      <Txt font="cinzel" size={35.011} ls={0.7002} color="#e2984a" lh={1.12} cx={215.07} y={183.06} w={340.102}>
        RIDDLE
      </Txt>
    </>
  )
}

export function TitleScreen() {
  const { go } = useGame()
  return (
    <Screen bg="/img/bg/title.webp" overlay={0.16}>
      <TitleBlock />
      <Txt size={22.007} ls={0.6602} color="#f7f2e5" cx={213.06} y={253.08} w={340.102} pre>
        {'Fourteen files. Ninety minutes.\nOne truth buried beneath the fog.'}
      </Txt>
      <Plaque label="START" y={787.24} center onClick={() => go({ name: 'signin' })} />
    </Screen>
  )
}

export function SignInScreen() {
  const { state, setTeam, go } = useGame()
  const { play } = useAudio()
  const [bad, setBad] = useState(false)
  const submit = () => {
    if (!state.team.trim()) {
      play('wrong')
      setBad(true)
      return
    }
    go({ name: 'instructions' })
  }
  return (
    <Screen bg="/img/bg/paper-room.webp">
      <Paper y={193.06} />
      <Txt font="cinzel" size={30.009} ls={0.6002} color="#8f0f0e" lh={1.12} cx={213.06} cy={298.89} w={286.086}>
        SIGN IN
      </Txt>
      <Txt size={20.006} ls={0.6002} cx={213.06} y={401.12} w={270.081} pre>
        {'What shall we call your\ninvestigation team?'}
      </Txt>
      <PaperInput
        x={70.02}
        y={505.15}
        value={state.team}
        placeholder="INSERT NAME"
        maxLength={22}
        state={bad ? 'wrong' : 'idle'}
        onChange={(v) => {
          setBad(false)
          setTeam(v)
        }}
        onEnter={submit}
      />
      <Plaque label="CONTINUE" y={787.24} center sound={null} onClick={submit} />
    </Screen>
  )
}

export function InstructionsScreen() {
  const { go } = useGame()
  return (
    <Screen bg="/img/bg/paper-room.webp">
      <Paper y={193.06} />
      <Txt font="cinzel" size={27.008} ls={0.5402} color="#8f0f0e" lh={1.12} cx={213.06} cy={295.09} w={320.096}>
        INSTRUCTIONS
      </Txt>
      <ScrollText box={{ x: 67.67, y: 339.88, w: 290, h: 178 }} track={{ x: 364.35, y: 276.88 }}>
        {INSTRUCTIONS.split('\n').map((p) => (
          <p key={p}>{p}</p>
        ))}
      </ScrollText>
      <Txt font="cinzel" size={80} ls={1.6} color="#8f0f0e" lh={1.12} cx={212.67} y={537.88} w={170}>
        14
      </Txt>
      <Txt size={18.005} ls={0.054} cx={213.06} y={625.18} w={240.072} pre>
        {'SEALED FILES\nOPENED IN ORDER'}
      </Txt>
      <Plaque label="CONTINUE" y={787.24} center onClick={() => go({ name: 'rules' })} />
    </Screen>
  )
}

export function RulesScreen() {
  const { go, start } = useGame()
  const cost = (y: number, cy: number, bg: string, label: string) => (
    <>
      <Box x={72.02} y={y} w={286.086} h={72.022} style={{ background: bg, borderRadius: 12.004 }} />
      <Txt size={24.007} ls={0.072} color="#f0deb2" cx={215.07} cy={cy} w={246.074} lh={1.28} style={{ whiteSpace: 'pre' }}>
        {label}
      </Txt>
    </>
  )
  return (
    <Screen bg="/img/bg/paper-room.webp">
      <Paper y={193.06} />
      <Txt font="cinzel" size={27.008} ls={0.5402} color="#8f0f0e" lh={1.12} cx={213.06} cy={314.59} w={270.081}>
        THE CLOCK IS LISTENING
      </Txt>
      <Txt size={21.006} ls={0.6302} cx={213.06} y={368.11} w={270.081} pre>
        {'Every request for help costs precious time.\nChoose carefully, the shadows are counting too.'}
      </Txt>
      {cost(503.15, 536.96, 'rgba(102,20,14,0.94)', 'HINT      −2:00')}
      {cost(593.18, 626.99, 'rgba(46,20,14,0.96)', 'REVEAL   −5:00')}
      <Plaque
        label="START THE GAME"
        y={787.24}
        center
        onClick={() => {
          start()
          go({ name: 'loading' })
        }}
      />
    </Screen>
  )
}

export function LoadingScreen() {
  const { go } = useGame()
  const [pct, setPct] = useState(0)
  const done = useRef(false)

  useEffect(() => {
    // Préchargement réel des visuels lourds pendant l'animation.
    ;['/img/bg/desk.webp', '/img/bg/board.webp', '/img/bg/solved.webp', ...CASES.slice(0, 2).map((c) => `/img/story/${String(c.n).padStart(2, '0')}.webp`), '/img/story/00.webp'].forEach((src) => {
      const i = new Image()
      i.src = src
    })
    const t0 = performance.now()
    const DURATION = 2600
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / DURATION)
      setPct(Math.round((1 - Math.pow(1 - p, 2.2)) * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else if (!done.current) {
        done.current = true
        setTimeout(() => go({ name: 'welcome' }), 350)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [go])

  return (
    <Screen bg="/img/bg/title.webp" overlay={0.34}>
      <TitleBlock />
      <Txt font="cinzel" size={70.021} ls={1.4004} color="#f0deb2" lh={1.12} cx={213.06} y={403.12} w={250.075}>
        {pct}%
      </Txt>
      <Box x={55.02} y={500.15} w={320.096} h={18.005} style={{ background: 'rgba(31,20,13,0.96)', borderRadius: 9.003, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: '#8f0f0e', borderRadius: 9.003, transition: 'width .1s linear' }} />
      </Box>
    </Screen>
  )
}
