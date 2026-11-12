# Enigmarena — The Shadow Riddle

Web app React (Vite + TypeScript) de l'escape game « The Shadow Riddle », construite depuis le Figma
*Printable escape game* (page **FULL WEB APP**).

```bash
npm install
npm run dev      # développement
npm run build    # production (dist/)
```

## Parcours
Titre → équipe → instructions → règles → chargement → prologue → hub des 14 dossiers →
(histoire → enquête → indice / énigme / révélation → solution → dossier résolu) × 14 → épilogue → rapport → fin.

- **Chrono** : 90 min, lancé à « START THE GAME ». Indice −2:00 (une fois par dossier), révélation −5:00. Score = secondes restantes.
- **Sauvegarde** : la partie est conservée dans le `localStorage` (clé `enigmarena:game:v1`).
- **Son** : ambiance + SFX (`src/audio`), bouton gramophone ; bouton plein écran. Curseur main sur toute l'app.

## Structure
- `src/game/data.ts` — textes, indices, réponses des 14 dossiers (modifiable).
- `src/game/GameContext.tsx` — état, navigation, chrono, pénalités.
- `src/screens/` — un composant par écran du Figma ; `puzzles.tsx` pour les 14 énigmes (zoom/déplacement).
- `src/ui/layout.tsx` — primitives : les coordonnées sont celles du Figma (écran 430×932, mis à l'échelle).
- `public/img` — visuels exportés du Figma (WebP / SVG).
