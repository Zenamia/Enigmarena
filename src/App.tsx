import { useEffect, useState } from 'react'
import { AudioProvider } from './audio/AudioProvider'
import { FullscreenButton } from './components/FullscreenButton'
import { SoundButton } from './components/SoundButton'
import { GameProvider, useGame, type Screen } from './game/GameContext'
import { ConfirmScreen, HintScreen, InvestigationScreen, PuzzleScreen, SolutionScreen, SolvedScreen } from './screens/Case'
import { EndScreen, EpilogueScreen, ScoreScreen } from './screens/Finale'
import { FilesScreen, StoryScreen, WelcomeScreen } from './screens/Hub'
import { InstructionsScreen, LoadingScreen, RulesScreen, SignInScreen, TitleScreen } from './screens/Intro'
import { STAGE_H, STAGE_W } from './ui/layout'

function renderScreen(s: Screen) {
  switch (s.name) {
    case 'title': return <TitleScreen />
    case 'signin': return <SignInScreen />
    case 'instructions': return <InstructionsScreen />
    case 'rules': return <RulesScreen />
    case 'loading': return <LoadingScreen />
    case 'welcome': return <WelcomeScreen />
    case 'files': return <FilesScreen />
    case 'story': return <StoryScreen n={s.n} />
    case 'invest': return <InvestigationScreen n={s.n} />
    case 'hint': return <HintScreen n={s.n} />
    case 'puzzle': return <PuzzleScreen n={s.n} />
    case 'confirm': return <ConfirmScreen n={s.n} />
    case 'solution': return <SolutionScreen n={s.n} />
    case 'solved': return <SolvedScreen n={s.n} />
    case 'epilogue': return <EpilogueScreen />
    case 'score': return <ScoreScreen />
    case 'end': return <EndScreen />
  }
}

/** Les écrans du Figma font 430×932 : on les met à l'échelle pour remplir la fenêtre. */
function useStageScale() {
  const calc = () => Math.min(2.2, window.innerWidth / STAGE_W, window.innerHeight / STAGE_H)
  const [s, setS] = useState(calc)
  useEffect(() => {
    const on = () => setS(calc())
    window.addEventListener('resize', on)
    window.addEventListener('orientationchange', on)
    return () => {
      window.removeEventListener('resize', on)
      window.removeEventListener('orientationchange', on)
    }
  }, [])
  return s
}

function Stage() {
  const { state } = useGame()
  const s = useStageScale()
  const screen = state.screen
  const key = 'n' in screen ? `${screen.name}-${screen.n}` : screen.name
  return (
    <div className="viewport">
      <div className="stage-box" style={{ width: STAGE_W * s, height: STAGE_H * s }}>
        <div className="stage" style={{ transform: `scale(${s})` }}>
          <div key={key} style={{ position: 'absolute', inset: 0 }}>
            {renderScreen(screen)}
          </div>
          <div className="toolbar">
            <SoundButton />
            <FullscreenButton />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AudioProvider>
      <GameProvider>
        <Stage />
      </GameProvider>
    </AudioProvider>
  )
}
