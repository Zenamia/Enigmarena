import { useAudio } from '../audio/AudioProvider'
import { useI18n } from '../i18n'
import { IconButton } from './IconButton'

export function SoundButton() {
  const { muted, toggleMuted } = useAudio()
  const { ui } = useI18n()
  return <IconButton icon="/ui/btn-sound.webp" label={muted ? ui.soundOn : ui.soundOff} dimmed={muted} onClick={toggleMuted} />
}
