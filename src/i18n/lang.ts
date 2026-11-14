export type Lang = 'en' | 'fr'
export const LANGS: Lang[] = ['en', 'fr']
export const isLang = (v: unknown): v is Lang => v === 'en' || v === 'fr'
