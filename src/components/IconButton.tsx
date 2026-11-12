import type { ButtonHTMLAttributes } from 'react'
import { useAudio } from '../audio/AudioProvider'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string
  label: string
  dimmed?: boolean
}

/** Bouton illustré (cuir + laiton) avec SFX au clic. */
export function IconButton({ icon, label, dimmed, onClick, ...rest }: Props) {
  const { play } = useAudio()
  return (
    <button
      type="button"
      className={`icon-btn${dimmed ? ' icon-btn--dimmed' : ''}`}
      aria-label={label}
      title={label}
      onClick={(e) => {
        play('button')
        onClick?.(e)
      }}
      {...rest}
    >
      <img src={icon} alt="" draggable={false} />
    </button>
  )
}
