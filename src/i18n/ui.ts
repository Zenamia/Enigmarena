import type { Lang } from './lang'

/** Textes de l'interface (boutons, titres, messages), par langue. Le nom du jeu reste « THE SHADOW RIDDLE ». */
export interface Ui {
  tagline: string
  newGame: string
  continue: string
  back: string
  next: string
  // choix de la langue
  languageHeading: string
  // fenêtre « nom d'équipe »
  teamLabel: string
  noticeNew: string
  noticeOffline: string
  // connexion
  signIn: string
  signInPrompt: string
  insertName: string
  nameTaken: string
  continuePrompt: string
  noSave: string
  offlineSave: string
  // consignes
  instructions: string
  sealed: string
  rulesTitle: string
  rulesText: string
  ruleHint: string
  ruleReveal: string
  startGame: string
  // hub
  prologue: string
  caseFiles: string
  file: string
  fileRibbon: (n: number) => string
  fileAria: (n: number, state: 'done' | 'open' | 'locked') => string
  // dossier
  hint: string
  clue: string
  reveal: string
  insertSolution: string
  enterSolution: string
  revealQuestion: string
  revealCost: string
  revealPaid: string
  revealSolution: string
  brilliant: string
  fileSolved: (n: number) => string
  // fin
  epilogue: string
  report: string
  timeUsed: string
  hintsOpened: string
  solutionsRevealed: string
  penalty: string
  timeLeft: string
  finalScore: string
  theEnd: string
  backToFiles: string
  // accessibilité
  zoomOut: string
  zoomIn: string
  zoomReset: string
  soundOn: string
  soundOff: string
  fullscreen: string
  exitFullscreen: string
}

const pad = (n: number) => String(n).padStart(2, '0')

const en: Ui = {
  tagline: 'Fourteen files. Ninety minutes.\nOne truth buried beneath the fog.',
  newGame: 'NEW GAME',
  continue: 'CONTINUE',
  back: 'BACK',
  next: 'NEXT',
  languageHeading: 'CHOOSE YOUR LANGUAGE',
  teamLabel: 'YOUR TEAM NAME',
  noticeNew: 'Keep this name: it lets you continue your game at any time.',
  noticeOffline: 'Online saving is unavailable: your progress stays on this device.',
  signIn: 'SIGN IN',
  signInPrompt: 'What shall we call your\ninvestigation team?',
  insertName: 'INSERT NAME',
  nameTaken: 'This name is already taken. Choose another one, or go back and press CONTINUE.',
  continuePrompt: 'Enter your team name\nto resume your investigation.',
  noSave: 'No saved game found for this name. Check the spelling, or start a NEW GAME.',
  offlineSave: 'Could not reach the saved games. Check your connection and try again.',
  instructions: 'INSTRUCTIONS',
  sealed: 'SEALED FILES\nOPENED IN ORDER',
  rulesTitle: 'THE CLOCK IS LISTENING',
  rulesText: 'Every request for help costs precious time.\nChoose carefully, the shadows are counting too.',
  ruleHint: 'HINT      −2:00',
  ruleReveal: 'REVEAL   −5:00',
  startGame: 'START THE GAME',
  prologue: 'PROLOGUE',
  caseFiles: 'Case Files',
  file: 'FILE',
  fileRibbon: (n) => `CASE FILE ${pad(n)}`,
  fileAria: (n, s) => `File ${n}, ${s === 'done' ? 'done' : s === 'open' ? 'open' : 'locked'}`,
  hint: 'HINT',
  clue: 'CLUE',
  reveal: 'REVEAL',
  insertSolution: 'INSERT SOLUTION',
  enterSolution: 'ENTER SOLUTION',
  revealQuestion: 'REVEAL THE SOLUTION?',
  revealCost: 'This revelation costs 5 minutes.',
  revealPaid: 'You have already paid for this revelation.',
  revealSolution: 'REVEAL SOLUTION',
  brilliant: 'A BRILLIANT DEDUCTION',
  fileSolved: (n) => `FILE ${pad(n)} SOLVED`,
  epilogue: 'EPILOGUE',
  report: 'OFFICIAL\nCASE REPORT',
  timeUsed: 'Time used',
  hintsOpened: 'Hints opened',
  solutionsRevealed: 'Solutions revealed',
  penalty: 'Penalty time',
  timeLeft: 'Time left',
  finalScore: 'FINAL SCORE',
  theEnd: 'The End',
  backToFiles: 'BACK TO FILES',
  zoomOut: 'Zoom out',
  zoomIn: 'Zoom in',
  zoomReset: 'Reset zoom',
  soundOn: 'Turn sound on',
  soundOff: 'Turn sound off',
  fullscreen: 'Full screen',
  exitFullscreen: 'Exit full screen',
}

const fr: Ui = {
  tagline: 'Quatorze dossiers. 90 minutes.\nUne vérité sous la brume.',
  newGame: 'NOUVELLE PARTIE',
  continue: 'CONTINUER',
  back: 'RETOUR',
  next: 'SUIVANT',
  languageHeading: 'CHOISISSEZ VOTRE LANGUE',
  teamLabel: 'NOM DE VOTRE ÉQUIPE',
  noticeNew: 'Gardez ce nom : il vous permet de reprendre votre partie à tout moment.',
  noticeOffline: 'Sauvegarde en ligne indisponible : votre progression reste sur cet appareil.',
  signIn: 'CONNEXION',
  signInPrompt: "Comment s'appellera votre\néquipe d'enquêteurs ?",
  insertName: 'SAISISSEZ UN NOM',
  nameTaken: 'Ce nom est déjà pris. Choisissez-en un autre, ou revenez en arrière et appuyez sur CONTINUER.',
  continuePrompt: "Entrez le nom de votre équipe\npour reprendre l'enquête.",
  noSave: 'Aucune partie trouvée pour ce nom. Vérifiez l’orthographe, ou lancez une NOUVELLE PARTIE.',
  offlineSave: 'Impossible de joindre les sauvegardes. Vérifiez votre connexion et réessayez.',
  instructions: 'CONSIGNES',
  sealed: "DOSSIERS SCELLÉS\nÀ OUVRIR DANS L'ORDRE",
  rulesTitle: "L'HORLOGE VOUS ÉCOUTE",
  rulesText: "Chaque demande d'aide coûte un temps précieux.\nChoisissez bien : les ombres comptent aussi.",
  ruleHint: 'INDICE    −2:00',
  ruleReveal: 'RÉVÉLER   −5:00',
  startGame: 'LANCER LA PARTIE',
  prologue: 'PROLOGUE',
  caseFiles: 'Dossiers',
  file: 'DOSSIER',
  fileRibbon: (n) => `DOSSIER ${pad(n)}`,
  fileAria: (n, s) => `Dossier ${n}, ${s === 'done' ? 'résolu' : s === 'open' ? 'ouvert' : 'verrouillé'}`,
  hint: 'INDICE',
  clue: 'PISTE',
  reveal: 'RÉVÉLER',
  insertSolution: 'SAISIR LA SOLUTION',
  enterSolution: 'SAISIR LA SOLUTION',
  revealQuestion: 'RÉVÉLER LA\nSOLUTION ?',
  revealCost: 'Cette révélation coûte 5 minutes.',
  revealPaid: 'Vous avez déjà payé cette révélation.',
  revealSolution: 'RÉVÉLER LA SOLUTION',
  brilliant: 'DÉDUCTION\nBRILLANTE',
  fileSolved: (n) => `DOSSIER ${pad(n)} RÉSOLU`,
  epilogue: 'ÉPILOGUE',
  report: 'RAPPORT\nOFFICIEL',
  timeUsed: 'Temps utilisé',
  hintsOpened: 'Indices ouverts',
  solutionsRevealed: 'Solutions révélées',
  penalty: 'Temps de pénalité',
  timeLeft: 'Temps restant',
  finalScore: 'SCORE FINAL',
  theEnd: 'Fin',
  backToFiles: 'RETOUR AUX DOSSIERS',
  zoomOut: 'Zoom arrière',
  zoomIn: 'Zoom avant',
  zoomReset: 'Réinitialiser le zoom',
  soundOn: 'Activer le son',
  soundOff: 'Couper le son',
  fullscreen: 'Plein écran',
  exitFullscreen: 'Quitter le plein écran',
}

export const UI: Record<Lang, Ui> = { en, fr }
