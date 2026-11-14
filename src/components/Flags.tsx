import type { ReactNode } from 'react'
import type { Lang } from '../i18n'

/** Drapeaux dessinés en vectoriel (pas d'image à charger). */
export function FlagFr() {
  return (
    <svg viewBox="0 0 3 2" preserveAspectRatio="none" aria-hidden="true">
      <rect width="1" height="2" fill="#1f3f8f" />
      <rect x="1" width="1" height="2" fill="#f4efe4" />
      <rect x="2" width="1" height="2" fill="#c3262e" />
    </svg>
  )
}

export function FlagEn() {
  return (
    <svg viewBox="0 0 60 40" preserveAspectRatio="none" aria-hidden="true">
      <rect width="60" height="40" fill="#1f3a78" />
      <path d="M0 0L60 40M60 0L0 40" stroke="#f4efe4" strokeWidth="7" />
      <path d="M0 0L60 40M60 0L0 40" stroke="#c3262e" strokeWidth="2.4" />
      <path d="M30 0V40M0 20H60" stroke="#f4efe4" strokeWidth="12" />
      <path d="M30 0V40M0 20H60" stroke="#c3262e" strokeWidth="7" />
    </svg>
  )
}

export const flagFor = (l: Lang): ReactNode => (l === 'fr' ? <FlagFr /> : <FlagEn />)
export const flagName = (l: Lang) => (l === 'fr' ? 'FRANÇAIS' : 'ENGLISH')

/** Drapeau encadré de laiton, comme les plaques du jeu. `small` + `selected` pour le réglage de la langue. */
export function FlagButton({ x, y, language, onPick, small, selected }: { x: number; y: number; language: Lang; onPick: () => void; small?: boolean; selected?: boolean }) {
  return (
    <button
      type="button"
      className={`flag-btn${small ? ' flag-btn--sm' : ''}${selected ? ' is-selected' : ''}`}
      lang={language}
      aria-label={flagName(language)}
      aria-pressed={selected}
      onClick={onPick}
      style={{ left: x, top: y }}
    >
      <span className="flag-frame">{flagFor(language)}</span>
      <span className="flag-label">{flagName(language)}</span>
    </button>
  )
}
