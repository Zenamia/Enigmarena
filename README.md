# Enigmarena — The Shadow Riddle

Web app React (Vite + TypeScript) de l'escape game « The Shadow Riddle », construite depuis le Figma
*Printable escape game* (page **FULL WEB APP**).

```bash
npm install
npm run dev      # développement
npm run build    # production (dist/)
```

## Parcours
Titre (**NEW GAME** / **CONTINUE**) → (nouvelle partie : **choix de la langue**, drapeaux FR / EN) → équipe → instructions → règles → chargement → prologue → hub des 14 dossiers →
(histoire → enquête → indice / énigme / révélation → solution → dossier résolu) × 14 → épilogue → rapport → fin.

- **CONTINUE** : on tape le nom d'équipe (= code de connexion) et on retrouve directement les dossiers. **NEW GAME** refuse un nom déjà utilisé (sauf le code de test). Le code de test `ZENAMIAGMD1005` ouvre les 14 dossiers, aussi bien par NEW GAME que par CONTINUE (même sans sauvegarde existante).
- **Langues** : français et anglais. La langue se choisit au lancement d'une NOUVELLE PARTIE, puis elle est enregistrée avec la partie (CONTINUE la retrouve). Les énigmes 9 et 11 ont une version française propre (réponses : 9 = `DIX`, 11 = `CUISINE`) ; l'énigme 10 accepte `VEST` et `VESTE`.
- **Fin** : sur l'écran « The End », le texte défile en boucle comme un générique de fin de film (appui prolongé = pause).
- **Chrono** : 90 min, lancé à « START THE GAME ». Indice −2:00 (une fois par dossier), révélation −5:00. Score = secondes restantes.
- **Sauvegarde par nom d'équipe** : la progression est enregistrée en ligne sous le nom d'équipe (`api/save.ts`, base Redis Upstash). Se reconnecter avec le même nom, sur n'importe quel appareil, retrouve la partie. Une copie locale (`localStorage`) ne sert qu'à reprendre la session en cours ; sans la base, le jeu fonctionne en local.
- **Son** : ambiance + SFX (`src/audio`), bouton gramophone ; bouton plein écran. Curseur main sur toute l'app.

## Structure
- `src/game/content.en.ts` / `content.fr.ts` — histoires, indices, réponses et textes de résolution des 14 dossiers, par langue (modifiables).
- `src/i18n/ui.ts` — boutons, titres et messages de l'interface, par langue. `useI18n()` donne la langue et les textes de la partie.
- `src/game/data.ts` — règles (chrono, pénalités), clé d'équipe, vérification des réponses.
- `src/game/GameContext.tsx` — état, navigation, chrono, pénalités.
- `src/screens/` — un composant par écran du Figma ; `puzzles.tsx` pour les 14 énigmes (zoom/déplacement).
- `src/ui/layout.tsx` — primitives : les coordonnées sont celles du Figma (écran 430×932, mis à l'échelle).
- `public/img` — visuels exportés du Figma (WebP / SVG).

## Activer la sauvegarde en ligne (Vercel)
1. Projet Vercel → **Storage** → **Create Database** → **Upstash for Redis** (offre gratuite) → connecter au projet.
2. Vercel ajoute seul les variables `KV_REST_API_URL` et `KV_REST_API_TOKEN`.
3. **Redeploy** le projet. Sans cela, `/api/save` répond `501` et le jeu reste en sauvegarde locale.

## Images
Les images sont préchargées en arrière-plan et chaque écran n'apparaît qu'une fois ses images décodées. La liste vient de `public/` (`npm run assets`, lancé automatiquement avant `npm run build`). Cache navigateur : `vercel.json` (1 h, revalidation en arrière-plan).
