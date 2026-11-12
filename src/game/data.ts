/** Contenu du jeu, repris du Figma « FULL WEB APP ». */

export interface CaseData {
  n: number
  title: string
  story: string
  hint: string
  /** Réponse attendue (comparée sans casse ni ponctuation). */
  answer: string
  solved: string
}

export const TOTAL_SECONDS = 90 * 60
export const HINT_PENALTY = 2 * 60
export const REVEAL_PENALTY = 5 * 60

export const WELCOME = {
  title: 'Welcome to Wonder Town',
  text: 'Wonder Town, a magical village where Halloween is all about friendship. This year, families were mixed into new teams to help neighbors connect. But when David discovers eight children in his group instead of five, a mysterious Halloween adventure begins.',
}

export const CASES: CaseData[] = [
  {
    n: 1,
    title: 'The Agenda',
    story:
      'Doubt and questions hung in the air as David spoke with Eric, the city advisor, about the unexpected guests. Eric insisted the other groups had the correct number of children. Soon after, an email titled Agenda arrived. On closer inspection, David felt Eric was sending him a discreet warning. The attached file was locked. Somewhere in the message, a hidden code waited.',
    hint: '"Gather the letters of the same color and follow the order indicated by Eric the First. Observe carefully; a number may appear."',
    answer: '681',
    solved: 'The hidden order is clear now. Keep moving; the first trail has only just appeared',
  },
  {
    n: 2,
    title: 'The Board',
    story:
      "The Agenda revealed a troubling message: thieving dwarfs had infiltrated the Halloween events. David kept smiling for the children while he began a real investigation. Eric sent him Adrian's location. In the young organizer's room, David found a board covered with photos and documents. It was no decoration. Something in its arrangement pointed toward the thieves.",
    hint: '"With a pen or your finger, connect the elements of each series. Look closely at the shapes formed. What numbers appear?"',
    answer: '215',
    // Le Figma reprend ici le texte du dossier 1.
    solved: 'The hidden order is clear now. Keep moving; the first trail has only just appeared',
  },
  {
    n: 3,
    title: 'The Frozen\nClock',
    story:
      "Behind the board, David found a briefcase locked by two codes. Children's laughter echoed through the house while his gaze settled on a digital clock frozen at a precise time. Nearby, five groups of intersecting lines covered the wall. The clock and the geometry were parts of the same mechanism.",
    hint: '"Five groups of lines decorate the wall. Choose those indicated by the clock and count the intersections."',
    answer: '324',
    solved: 'The clock has selected the right crossings. One lock opens; another puzzle waits.',
  },
  {
    n: 4,
    title: 'Blue Light',
    story:
      'The first lock opened, yet the second code resisted. Then David noticed a flashlight casting a strange blue glow. When he swept it across the clue board, invisible symbols and numbers surfaced like ink awakened from sleep. The room had changed, and the mystery with it.',
    hint: '"Find the mayor\'s age, then the six-digit code that corresponds. Be careful: only three digits are useful."',
    answer: '435',
    solved: 'The blue light exposes the three useful digits. The briefcase can finally be opened.',
  },
  {
    n: 5,
    title: "Catty's Diary",
    story:
      'The briefcase opened. Among photographs and carefully filed papers, David found a diary belonging to a girl named Catty. No child at the party had worn a cat costume. The diary was protected by a four-digit lock, and two lines crossed across the evidence like coordinates.',
    hint: '"The intersection of each pair of lines indicates one digit among nine. Read between the crossings to discover the sequence."',
    answer: '8693',
    solved: 'The four crossings resolve into a code. Open the diary and examine what Catty left behind.',
  },
  {
    n: 6,
    title: 'The Zombie\nGirl',
    story:
      'Inside the diary was a photograph of a girl dressed as a zombie, one of the children David recognized. A worn note described her irritation at being paired with someone she disliked. The complaint sounded childish, but the identity hidden inside it could eliminate an impostor.',
    hint: '"Reread the description of the girl in the newspaper, and remember your neighborhood superhero. The key is in the link between them."',
    answer: 'SPIDER-MAN',
    solved: 'The description points to Spider-Man. Record the disguise; the impostors are coming into focus.',
  },
  {
    n: 7,
    title: 'Riddle\nof Shadows',
    story:
      "Before leaving Adrian's house, David noticed a boy calmly coloring beside a coffee table. To his left lay a strange map covered in unfamiliar symbols. The boy's hand moved too confidently. Whatever message the marks contained, it had been designed to travel unnoticed.",
    hint: '"Each symbol corresponds to a letter of the alphabet. Decode their message; it is the riddle of shadows."',
    answer: 'CLOWN',
    solved: 'The symbols spell CLOWN. Keep the name close; the kidnappers are already moving.',
  },
  {
    n: 8,
    title: 'The Changed Password',
    story:
      'Three figures sped toward the city exit with unconscious children on their bicycles. David chased them, Eric struggling beside him. When they reached the rendezvous, the road was empty. David grabbed his phone to call for help and found that the thieves had changed his password while he was distracted.',
    hint: '"The first contact on the screen is the one you barely see. Look closely; sometimes the invisible holds the key."',
    answer: '61753',
    solved: 'The faint contact carries the password. Unlock the phone; every second now matters.',
  },
  {
    n: 9,
    title: 'Angel Street',
    story:
      'With the phone unlocked, David and Eric cross-referenced every photograph and note. Their deductions led to Angel Street, where objects abandoned by the children formed a deliberate trail. Each item offered a letter, and together they pointed somewhere beyond English.',
    hint: '"Each item corresponds to a letter. Put them together to form a word, then translate it to uncover the secret."',
    answer: 'DIX',
    solved: 'The objects form DIX. The trail points onward, and someone is trying to guide you from inside.',
  },
  {
    n: 10,
    title: 'The Stopped\nHands',
    story:
      'Claudette moved first to the living-room clock. She removed its battery, set the hands to an exact moment, and fixed a post-it beside the face. David watched in silence. This was not panic. It was a message constructed under surveillance.',
    hint: '"The post-it reveals the end of the word, while the clock indicates its first letter. Assemble them."',
    answer: 'VEST',
    solved: 'Clock and note combine into VEST. Claudette has another message waiting.',
  },
  {
    n: 11,
    title: 'Seven Books',
    story:
      'Claudette crossed to the small library and chose seven books. Their colors and engravings made each unmistakable. She arranged them in a deliberate order while David memorized every movement. The subjects mattered more than the titles.',
    hint: '"Focus only on the category of each book, and remember their first letters. They are waiting, discreet but essential."',
    answer: 'KITCHEN',
    solved: 'The categories spell KITCHEN. Follow her instructions before Eric notices.',
  },
  {
    n: 12,
    title: 'Marks on the Calendar',
    story:
      "Near the library, Claudette traced faint symbols across the calendar's coming days. Her marks were almost invisible, hidden between the dates as though time itself carried a message. David had only seconds to remember their positions.",
    hint: '"Connect each group of symbols with lines. When everything is connected, the hidden word will appear."',
    answer: 'CAVE',
    solved: 'The connected marks form CAVE. Claudette is pointing below the house.',
  },
  {
    n: 13,
    title: 'The Old\nNumerals',
    story:
      "David studied Claudette's second layer of marks. Their angles looked older than the calendar, older perhaps than the manor itself. The symbols were not letters at all. They belonged to an ancient counting system and hid the combination to the door below.",
    hint: '"The signs you form are older than they appear. You are about to create Roman numerals."',
    answer: '349',
    solved: 'The Roman numerals resolve to 349. Take the combination downstairs; the end is close.',
  },
  {
    n: 14,
    title: 'The Trapdoor',
    story:
      "Under the kitchen rug, David found a metal trapdoor held by three locks. One key came from Eric's jacket. The calendar opened the combination lock. Then Eric laughed. The final three-letter code, he said, was formed from the initials of the first three costumes David had discovered. Rage could wait. The children could not.",
    hint: '"Remember the three costumes discovered first. They hold the last answer to your investigation."',
    answer: 'ZSC',
    solved: 'The initials are ZSC. The trapdoor is open now, and the children are waiting below.',
  },
]

export const EPILOGUE =
  "The last lock surrendered with a metallic cry. Beneath the kitchen, David found the missing children wrapped in blankets, frightened but unharmed. Eric's smile finally vanished as the officers led him through the rain. By dawn, the manor's windows had gone dark and the fog began to lift. Yet on the evidence board, one red thread still trembled although no window was open. David left it untouched. Some riddles, he knew, do not end when the case is closed."

export const INSTRUCTIONS =
  'Fourteen sealed case files stand between you and the children taken into the fog. Open them in order. Each file contains a chapter of the investigation, one essential clue, and one optional hint.\n' +
  'The clock begins at ninety minutes. A hint costs two minutes. Revealing a solution costs five. Wrong answers cost nothing, so trust your deductions. Your final score is every second left when File 14 closes.'

/** Nom d'équipe spécial : ouvre une sauvegarde où tous les dossiers sont accessibles (tests). */
export const UNLOCK_CODE = 'ZENAMIAGMD1005'

export const normalize = (s: string) => s.toUpperCase().replace(/[^A-Z0-9]/g, '')
export const isCorrect = (c: CaseData, input: string) => normalize(input) === normalize(c.answer)

/** Titres de rang selon le score (secondes restantes). Seuils à valider. */
export function rankFor(score: number) {
  if (score >= 300) return 'MASTER OF SHADOWS'
  if (score > 0) return 'SEEKER OF TRUTH'
  return 'SURVIVOR OF THE FOG'
}

export const pad2 = (n: number) => String(n).padStart(2, '0')
export const mmss = (sec: number) => `${pad2(Math.floor(sec / 60))}:${pad2(Math.floor(sec % 60))}`
