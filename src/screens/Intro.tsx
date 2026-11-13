import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useAudio } from '../audio/AudioProvider'
import { loadCloud } from '../game/cloud'
import { INSTRUCTIONS, CASES, UNLOCK_CODE, teamKey } from '../game/data'
import { useGame } from '../game/GameContext'
import { Box, Paper, PaperInput, Plaque, Screen, ScrollText, Txt, useAssetsReady } from '../ui/layout'

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
      <Plaque label="NEW GAME" y={717.2} center onClick={() => go({ name: 'signin' })} />
      <Plaque label="CONTINUE" y={787.24} center onClick={() => go({ name: 'continue' })} />
    </Screen>
  )
}

type Notice = { mode: 'new' | 'offline' }

/** Taille du nom d'équipe dans la fenêtre, selon sa longueur. */
const nameSize = (name: string) => (name.length <= 10 ? 31 : name.length <= 14 ? 26 : name.length <= 18 ? 21.5 : 18)

const NOTICE_TEXT: Record<Notice['mode'], { label: string; body: string }> = {
  new: {
    label: 'YOUR TEAM NAME',
    body: 'Keep this name: it lets you continue your game at any time.',
  },
  offline: {
    label: 'YOUR TEAM NAME',
    body: 'Online saving is unavailable: your progress stays on this device.',
  },
}

/** Fenêtre « nom d'équipe » (mallette du jeu) : rappelle que ce nom permet de se reconnecter. */
function TeamNotice({ name, notice, onContinue, onBack }: { name: string; notice: Notice; onContinue: () => void; onBack: () => void }) {
  const t = NOTICE_TEXT[notice.mode]
  const ref = useRef<HTMLDivElement>(null)
  const ready = useAssetsReady(ref)
  return (
    <div ref={ref} className={`modal${ready ? ' is-ready' : ''}`} role="dialog" aria-modal="true" aria-label={t.label}>
      <img src="/img/ui/case-open.webp" alt="" draggable={false} style={{ position: 'absolute', left: 22.01, top: 98.03, width: 382.115, height: 520.157, objectFit: 'contain', pointerEvents: 'none' }} />
      <Txt size={16} ls={1} color="#e59a4a" cx={213.07} y={199} w={250}>
        {t.label}
      </Txt>
      <Box cx={213.07} y={231.07} w={300.09} h={96} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Txt font="cinzel" size={nameSize(name)} ls={0.6} color="#f0deb2" lh={1.12} w={300.09} style={{ position: 'static', overflowWrap: 'anywhere' }}>
          {name}
        </Txt>
      </Box>
      <Txt size={17} ls={0.05} cx={209} cy={447.64} w={190} lh={1.3}>
        {t.body}
      </Txt>
      <Plaque label="CONTINUE" y={605.18} onClick={onContinue} />
      <Plaque label="BACK" y={675.2} onClick={onBack} />
    </div>
  )
}

/** Message d'erreur sous le champ de nom. */
function FieldMessage({ children }: { children: ReactNode }) {
  return (
    <Txt size={15.5} ls={0.05} color="#8f0f0e" cx={213.06} y={590} w={262} lh={1.3}>
      {children}
    </Txt>
  )
}

const cleanName = (s: string) => s.trim().replace(/\s+/g, ' ')

/** NOUVELLE PARTIE : choisir un nom d'équipe, puis le parcours habituel. */
export function SignInScreen() {
  const { state, setTeam, newTeam, go } = useGame()
  const { play } = useAudio()
  const [bad, setBad] = useState<null | 'empty' | 'taken'>(null)
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState<Notice | null>(null)
  const name = cleanName(state.team)

  const submit = async () => {
    if (busy) return
    if (teamKey(name).length < 2) {
      play('wrong')
      setBad('empty')
      return
    }
    play('button')
    setBusy(true)
    const r = await loadCloud(name)
    setBusy(false)
    if (r.status === 'found' && teamKey(name) !== teamKey(UNLOCK_CODE)) {
      // Ce nom appartient déjà à une équipe : on ne l'écrase pas.
      play('wrong')
      setBad('taken')
      return
    }
    setNotice({ mode: r.status === 'unavailable' ? 'offline' : 'new' })
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
        readOnly={busy}
        onChange={(v) => {
          setBad(null)
          setTeam(v)
        }}
        onEnter={submit}
      />
      {bad === 'taken' && <FieldMessage>This name is already taken. Choose another one, or go back and press CONTINUE.</FieldMessage>}
      {/* Les boutons de l'écran sont retirés quand la fenêtre est ouverte, pour ne pas transparaître derrière. */}
      {!notice && (
        <>
          <Plaque label={busy ? '...' : 'CONTINUE'} y={722} center sound={null} disabled={busy} onClick={submit} />
          <Plaque label="BACK" y={792} center onClick={() => go({ name: 'title' })} />
        </>
      )}
      {notice && <TeamNotice name={name} notice={notice} onContinue={() => newTeam(name, teamKey(name) === teamKey(UNLOCK_CODE))} onBack={() => setNotice(null)} />}
    </Screen>
  )
}

/** CONTINUER : le nom d'équipe sert de code de connexion et ramène directement aux dossiers. */
export function ContinueScreen() {
  const { state, restore, go } = useGame()
  const { play } = useAudio()
  const [name, setName] = useState('')
  const [busy, setBusy] = useState(false)
  const [problem, setProblem] = useState<null | 'empty' | 'unknown' | 'offline'>(null)

  const submit = async () => {
    if (busy) return
    const clean = cleanName(name)
    if (teamKey(clean).length < 2) {
      play('wrong')
      setProblem('empty')
      return
    }
    play('button')
    setBusy(true)
    const r = await loadCloud(clean)
    setBusy(false)
    if (r.status === 'found') {
      restore(r.state) // retrouve la partie de cette équipe et ouvre directement les dossiers
      return
    }
    if (r.status === 'unavailable' && state.confirmed && teamKey(state.team) === teamKey(clean)) {
      go({ name: state.startedAt ? 'files' : 'instructions' }) // hors ligne : la partie de cet appareil
      return
    }
    play('wrong')
    setProblem(r.status === 'none' ? 'unknown' : 'offline')
  }

  return (
    <Screen bg="/img/bg/paper-room.webp">
      <Paper y={193.06} />
      <Txt font="cinzel" size={30.009} ls={0.6002} color="#8f0f0e" lh={1.12} cx={213.06} cy={298.89} w={286.086}>
        CONTINUE
      </Txt>
      <Txt size={20.006} ls={0.6002} cx={213.06} y={401.12} w={270.081} pre>
        {'Enter your team name\nto resume your investigation.'}
      </Txt>
      <PaperInput
        x={70.02}
        y={505.15}
        value={name}
        placeholder="INSERT NAME"
        maxLength={22}
        state={problem ? 'wrong' : 'idle'}
        readOnly={busy}
        autoFocus
        onChange={(v) => {
          setProblem(null)
          setName(v)
        }}
        onEnter={submit}
      />
      {problem === 'unknown' && <FieldMessage>No saved game found for this name. Check the spelling, or start a NEW GAME.</FieldMessage>}
      {problem === 'offline' && <FieldMessage>Could not reach the saved games. Check your connection and try again.</FieldMessage>}
      <Plaque label={busy ? '...' : 'CONTINUE'} y={722} center sound={null} disabled={busy} onClick={submit} />
      <Plaque label="BACK" y={792} center onClick={() => go({ name: 'title' })} />
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
