import { useAudio } from '../audio/AudioProvider'
import { IconButton } from './IconButton'

export function SoundButton() {
  const { muted, toggleMuted } = useAudio()
  return <IconButton icon="/ui/btn-sound.webp" label={muted ? 'Turn sound on' : 'Turn sound off'} dimmed={muted} onClick={toggleMuted} />
}
