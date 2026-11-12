import { useAudio } from '../audio/AudioProvider'
import { IconButton } from './IconButton'

export function SoundButton() {
  const { muted, toggleMuted } = useAudio()
  return <IconButton icon="/ui/btn-sound.webp" label={muted ? 'Activer le son' : 'Couper le son'} dimmed={muted} onClick={toggleMuted} />
}
