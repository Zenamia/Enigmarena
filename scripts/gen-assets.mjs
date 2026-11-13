// Liste les images de public/ dans src/ui/assets.generated.ts (utilisée pour le préchargement).
// Lancé automatiquement avant `npm run build` ; à relancer à la main après avoir ajouté des images : `npm run assets`.
import { readdirSync, writeFileSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'

const root = new URL('../public/', import.meta.url).pathname
const IMG = new Set(['.webp', '.png', '.jpg', '.jpeg', '.svg'])
const walk = (dir) =>
  readdirSync(join(root, dir)).flatMap((name) => {
    const rel = `${dir}/${name}`
    return statSync(join(root, rel)).isDirectory() ? walk(rel) : IMG.has(extname(name)) ? [`/${rel}`] : []
  })

// Ordre = priorité : interface partagée, décors, histoires, puis énigmes.
const order = ['img/ui', 'ui', 'img/bg', 'img/story', 'img/puzzle']
const list = order.flatMap((d) => walk(d).sort())
writeFileSync(new URL('../src/ui/assets.generated.ts', import.meta.url), `// Fichier généré par scripts/gen-assets.mjs : ne pas modifier à la main.\nexport const PRELOAD: string[] = ${JSON.stringify(list, null, 2)}\n`)
console.log(`${list.length} images listées`)
