import { AudioProvider } from './audio/AudioProvider'
import { FullscreenButton } from './components/FullscreenButton'
import { SoundButton } from './components/SoundButton'

export default function App() {
  return (
    <AudioProvider>
      <main className="stage">
        <div className="toolbar">
          <SoundButton />
          <FullscreenButton />
        </div>
        {/* Écrans du jeu : en attente d'accès au design Figma */}
      </main>
    </AudioProvider>
  )
}
