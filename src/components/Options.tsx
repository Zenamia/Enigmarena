import { useEffect, useRef } from 'react'
import { useAudio } from '../audio/AudioProvider'
import { useGame } from '../game/GameContext'
import { useI18n } from '../i18n'
import { Paper, Plaque, Txt, useAssetsReady } from '../ui/layout'
import { FlagButton } from './Flags'
import { IconButton } from './IconButton'

/** Bouton « Options » (engrenage) de la barre du haut : ouvre le réglage du son et de la langue. */
export function OptionsButton({ onClick }: { onClick: () => void }) {
  const { ui } = useI18n()
  return <IconButton icon="/ui/btn-options.webp" label={ui.options} onClick={onClick} />
}

/** Curseur laiton et cuir : valeur de 0 à 1. */
function Slider({ y, label, value, onChange, onRelease }: { y: number; label: string; value: number; onChange: (v: number) => void; onRelease?: () => void }) {
  const pct = Math.round(value * 100)
  return (
    <>
      <Txt size={19} ls={0.3} align="left" x={84} y={y} w={190}>
        {label}
      </Txt>
      <Txt size={17} ls={0.3} color="#8f0f0e" align="right" x={276} y={y + 1} w={70}>
        {pct} %
      </Txt>
      <input
        type="range"
        className="slider"
        min={0}
        max={100}
        step={1}
        value={pct}
        aria-label={label}
        onChange={(e) => onChange(Number(e.target.value) / 100)}
        onPointerUp={onRelease}
        onKeyUp={onRelease}
        style={{ position: 'absolute', left: 84, top: y + 36, width: 262, ['--pct' as string]: `${pct}%` }}
      />
    </>
  )
}

/** Fenêtre des options : musique, bruitages et langue (le changement de langue s'applique tout de suite). */
export function OptionsPanel({ onClose }: { onClose: () => void }) {
  const { ui, lang } = useI18n()
  const { setLang } = useGame()
  const { play, musicVolume, sfxVolume, setMusicVolume, setSfxVolume } = useAudio()
  const ref = useRef<HTMLDivElement>(null)
  const ready = useAssetsReady(ref)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div ref={ref} className={`modal modal--top${ready ? ' is-ready' : ''}`} role="dialog" aria-modal="true" aria-label={ui.options}>
      <Paper y={96} />
      <Txt font="cinzel" size={30} ls={0.6} color="#8f0f0e" lh={1.12} cx={213.06} cy={206} w={286}>
        {ui.options}
      </Txt>
      <Slider y={262} label={ui.music} value={musicVolume} onChange={setMusicVolume} />
      <Slider y={352} label={ui.effects} value={sfxVolume} onChange={setSfxVolume} onRelease={() => play('button')} />
      <Txt size={19} ls={0.3} align="left" x={84} y={446} w={262}>
        {ui.language}
      </Txt>
      {(['fr', 'en'] as const).map((l, i) => (
        <FlagButton
          key={l}
          small
          x={i === 0 ? 100 : 226}
          y={482}
          language={l}
          selected={l === lang}
          onPick={() => {
            play('button')
            setLang(l)
          }}
        />
      ))}
      <Plaque label={ui.close} y={668} center onClick={onClose} />
    </div>
  )
}
