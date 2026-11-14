export interface CaseData {
  n: number
  title: string
  story: string
  hint: string
  /** Réponse attendue (comparée sans casse, sans accents ni ponctuation). */
  answer: string
  /** Autres écritures acceptées. */
  alt?: string[]
  solved: string
}

/** Tous les textes narratifs d'une langue. */
export interface Content {
  welcome: { title: string; text: string }
  cases: CaseData[]
  epilogue: string
  instructions: string
  /** Texte du générique de fin (écran « The End »). */
  end: string
}
