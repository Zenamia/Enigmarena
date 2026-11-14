/** Règles du jeu et utilitaires communs aux langues (les textes sont dans content.*.ts). */
import type { CaseData } from './types'

export type { CaseData }

export const CASE_COUNT = 14
export const TOTAL_SECONDS = 90 * 60
export const HINT_PENALTY = 2 * 60
export const REVEAL_PENALTY = 5 * 60

/** Nom d'équipe spécial : ouvre une sauvegarde où tous les dossiers sont accessibles (tests). */
export const UNLOCK_CODE = 'ZENAMIAGMD1005'

const strip = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '')

/** Clé d'équipe : sans accents, majuscules, lettres et chiffres (identique côté serveur). */
export const teamKey = (name: string) => strip(name).toUpperCase().replace(/[^A-Z0-9]/g, '')

export const normalize = (s: string) => strip(s).toUpperCase().replace(/[^A-Z0-9]/g, '')
export const isCorrect = (c: CaseData, input: string) => {
  const v = normalize(input)
  return v === normalize(c.answer) || (c.alt ?? []).some((a) => v === normalize(a))
}

export const pad2 = (n: number) => String(n).padStart(2, '0')
export const mmss = (sec: number) => `${pad2(Math.floor(sec / 60))}:${pad2(Math.floor(sec % 60))}`
