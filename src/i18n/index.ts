import { useGame } from '../game/GameContext'
import { EN } from '../game/content.en'
import { FR } from '../game/content.fr'
import type { Content } from '../game/types'
import type { Lang } from './lang'
import { UI, type Ui } from './ui'

export type { Lang } from './lang'
export { LANGS, isLang } from './lang'

export const CONTENT: Record<Lang, Content> = { en: EN, fr: FR }

/** Langue, textes d'interface et textes narratifs de la partie en cours. */
export function useI18n(): { lang: Lang; ui: Ui; content: Content } {
  const { state } = useGame()
  return { lang: state.lang, ui: UI[state.lang], content: CONTENT[state.lang] }
}
