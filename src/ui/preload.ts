import { PRELOAD } from './assets.generated'
import { isScreenLoading } from './layout'

// On garde une référence aux images : le navigateur ne les évince pas de sa mémoire.
const kept: HTMLImageElement[] = []

/** Charge toutes les images du jeu en arrière-plan (quelques-unes à la fois) pour que chaque écran apparaisse d'un coup. */
export function preloadAll(concurrency = 2) {
  // Police de l'écran « The End » : utile seulement à la fin, on la charge en arrière-plan.
  void document.fonts.load('400 40px "Great Vibes"').catch(() => null)
  let i = 0
  const next = () => {
    if (i >= PRELOAD.length) return
    // Un écran est en train de charger ses propres images : on lui laisse la bande passante.
    if (isScreenLoading()) return void setTimeout(next, 250)
    const img = new Image()
    img.decoding = 'async'
    img.onload = img.onerror = next
    img.src = PRELOAD[i++]
    kept.push(img)
  }
  for (let n = 0; n < concurrency; n++) next()
}
