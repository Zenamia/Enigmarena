import type { Content } from './types'

/** Textes du jeu en anglais (version d'origine du Figma « AN WEB APP »). */
const WELCOME = {
  title: 'Welcome to Wonder Town',
  text: 'Wonder Town, a magical village where Halloween is all about friendship. This year, families were mixed into new teams to help neighbors connect. But when David discovers eight children in his group instead of five, a mysterious Halloween adventure begins.',
}

const CASES: Content['cases'] = [
  {
    n: 1,
    title: 'The Agenda',
    story: "Doubt and questions hung in the air as David spoke with Eric, the city advisor, about the unexpected guests. Eric, also puzzled, assured him that the other groups had the correct number of children. The strange situation worried both men.\nShortly after, David received an email titled \"Agenda,\" which immediately caught his attention. On closer inspection, he felt Eric was trying to send him a discreet message.\nDavid realized he needed to be cautious. He began to observe every detail carefully while following the mysterious instructions he found in the message.\nThe attached file was locked... Your mission: find the hidden code somewhere in the message.",
    hint: '"Gather the letters of the same color and follow the order indicated by Eric the First. Observe carefully; a number may appear."',
    answer: '681',
    solved: 'The hidden order is clear now. Keep moving; the first trail has only just appeared',
  },
  {
    n: 2,
    title: 'The Board',
    story: "The \"Agenda\" file revealed a troubling message:\n\"Thieving dwarfs have infiltrated the Halloween events, quietly sowing chaos in homes and disturbing the residents' lives.\"\nDavid immediately understood the seriousness of the situation. He had to act as if nothing was wrong, to avoid frightening the children or alerting the culprits. Calm and smiling on the surface, he secretly began a real investigation.\nShortly after, he received a message from Eric containing a geolocation: Adrian's house, the party organizer. Trusting Eric, who seemed to be helping him track down the thieves, David went there without delay. Upon arrival, he was warmly welcomed by Adrian's parents and a few children already present.\nTaking advantage of a moment of distraction, he slipped quietly into the young organizer's room. There he discovered an investigation board covered with photos and documents related to the Halloween preparations.\nOn closer inspection, David had a hunch: this board was not just a decoration... it probably hid essential clues about the strange case of the thieving dwarfs.",
    hint: '"With a pen or your finger, connect the elements of each series. Look closely at the shapes formed. What numbers appear?"',
    answer: '215',
    // Le Figma reprend ici le texte du dossier 1.
    solved: 'The hidden order is clear now. Keep moving; the first trail has only just appeared',
  },
  {
    n: 3,
    title: 'The Frozen\nClock',
    story: "Slowly, David opened the back of the board, hoping to find something that would rekindle his hope. Inside, he found an object confirming the promising lead he had been following from the start: a briefcase locked with two codes.\nMeanwhile, the house echoed with children's laughter and the cheerful voices of parents. David knew he had to stay focused and act quickly.\nHis gaze fell on a digital wall clock. Its numbers, frozen at a precise time, seemed to hide a mystery.\nOn the wall, he noticed several drawn lines, grouped into five sets and intersecting at many points. They formed a strange geometric structure, full of hidden meanings and promises of puzzles.",
    hint: '"Five groups of lines decorate the wall. Choose those indicated by the clock and count the intersections."',
    answer: '324',
    solved: 'The clock has selected the right crossings. One lock opens; another puzzle waits.',
  },
  {
    n: 4,
    title: 'Blue Light',
    story: "After solving the digital clock challenge, David finally managed to decode the first briefcase code. A slight click sounded: the mechanism partially opened, revealing a first success... but also the promise of tougher trials.\nBarely savoring it, he felt doubt return, as the second part of the puzzle resisted him. The tension rose, time flew, and the children's laughter echoed in the distance like a cruel reminder: he had to stay calm.\nThen a trivial detail caught his eye. On a dusty shelf rested a simple flashlight. Nothing unusual, except for the strange blue glow faintly coming from its bulb.\nDriven by instinct, David grabbed it and shone it on the clue board. Under the light, the room changed. Invisible shapes slowly appeared on the board: symbols, numbers and glowing traces blended into a secret message, as if the puzzle itself had just awakened.\nDavid understood he had crossed a new threshold. The mystery deepened, but the truth had never seemed so close.",
    hint: '"Find the mayor\'s age, then the six-digit code that corresponds. Be careful: only three digits are useful."',
    answer: '435',
    solved: 'The blue light exposes the three useful digits. The briefcase can finally be opened.',
  },
  {
    n: 5,
    title: "Catty's Diary",
    story: "David entered the second code into the lock and slowly turned the mechanism. A discreet click sounded: the briefcase finally opened, revealing its carefully hidden contents. Inside lay perfectly organized files and a few scattered photographs.\nAmong these discoveries, David came across a diary belonging to a young girl named Catty. One detail struck him immediately: no child had worn a cat costume that night.\nThe notebook was protected by a four-digit combination, but two valuable clues came with it... Enough to hope to uncover Catty's well-guarded secret.",
    hint: '"The intersection of each pair of lines indicates one digit among nine. Read between the crossings to discover the sequence."',
    answer: '8693',
    solved: 'The four crossings resolve into a code. Open the diary and examine what Catty left behind.',
  },
  {
    n: 6,
    title: 'The Zombie\nGirl',
    story: "David finally managed to open the diary's lock. As he flipped through the pages, his gaze was immediately drawn to a photograph of a young girl dressed as a zombie. Relief washed over him: he recognized one of the costumes worn by the children in his group. A first lead, one that would let him rule out some children and identify the impostors.\nAmong the worn pages, he discovered a sheet covered in scribbles, written by the girl in the zombie costume. He turned the page and began to read carefully. The passage was both funny and touching: the girl expressed her frustration at being paired with another child she did not find very nice.",
    hint: '"Reread the description of the girl in the newspaper, and remember your neighborhood superhero. The key is in the link between them."',
    answer: 'SPIDER-MAN',
    solved: 'The description points to Spider-Man. Record the disguise; the impostors are coming into focus.',
  },
  {
    n: 7,
    title: 'Riddle\nof Shadows',
    story: "David gathered the clues and prepared to leave Adrian's house. Before departing, he decided to take one last look around, determined to see whether he could identify another intruder among the children.\nHis attention was drawn to a boy sitting near the coffee table, absorbed in an abandoned coloring sheet. Intrigued, David approached slowly, observing the boy's every movement. The child was drawing with surprising ease, focused and calm, as if he had no idea what was going on.\nLeaning in for a better look at the drawing, David noticed, to his left, a strange map lying on the table.",
    hint: '"Each symbol corresponds to a letter of the alphabet. Decode their message; it is the riddle of shadows."',
    answer: 'CLOWN',
    solved: 'The symbols spell CLOWN. Keep the name close; the kidnappers are already moving.',
  },
  {
    n: 8,
    title: 'The Changed Password',
    story: "Suddenly, from the office window, David spotted three figures pedaling at full speed toward the city exit. On their bikes, they were carrying unconscious children. No doubt about it: they were the dwarfs, the kidnappers.\nWithout thinking, David took off after them. To his surprise, Eric, the advisor who had been helping him from the beginning, was also running in the same direction to catch the thieves. While running, Eric tried to give him new information about the case, but David hardly listened: urgency took precedence over everything else, and Eric struggled to keep up.\nOut of breath, David finally reached the place where the children should have been. It was empty. Not a sound, not a trace.\nHe took out his phone to call for help... and realized, stunned, that the dwarfs had changed his password while he was distracted. A new trap. Another proof that the enemy was always one step ahead.",
    hint: '"The first contact on the screen is the one you barely see. Look closely; sometimes the invisible holds the key."',
    answer: '61753',
    solved: 'The faint contact carries the password. Unlock the phone; every second now matters.',
  },
  {
    n: 9,
    title: 'Angel Street',
    story: "Thanks to his careful observation, David managed to unlock his phone using the new code left by the kidnappers. Finally, he could call for help and resume the search for the missing children.\nWithout wasting a second, he contacted Eric for reinforcements. The two men combined their efforts to analyze the clues that might lead them to the children. David shared everything he had discovered about Adrian, including the photos from the briefcase. By cross-referencing the information, they determined a new direction to follow.\nGuided by these deductions, David headed to a strange alley called Angel Street. There he found several objects abandoned by the children, each seeming to hold a clue. He realized they had been intentionally left by one of the children, as a message pointing the way.",
    hint: '"Each item corresponds to a letter. Put them together to form a word, then translate it to uncover the secret."',
    answer: 'DIX',
    solved: 'The objects form DIX. The trail points onward, and someone is trying to guide you from inside.',
  },
  {
    n: 10,
    title: 'The Stopped\nHands',
    story: "The first thing Claudette did was go to the living room clock. She removed the battery, set the time to a specific moment, and then stuck a post-it next to it.",
    hint: '"The post-it reveals the end of the word, while the clock indicates its first letter. Assemble them."',
    answer: 'VEST',
    solved: 'Clock and note combine into VEST. Claudette has another message waiting.',
  },
  {
    n: 11,
    title: 'Seven Books',
    story: "After the first clue, Claudette headed to the small library near the entrance hall. She selected seven books from the many volumes lined up on the shelves and, one by one, placed them carefully in a very specific order. Each book had a color and engravings on its cover, making each of them easily recognizable.\nDavid, attentive to her every gesture, tried to memorize the exact sequence of her movements.",
    hint: '"Focus only on the category of each book, and remember their first letters. They are waiting, discreet but essential."',
    answer: 'KITCHEN',
    solved: 'The categories spell KITCHEN. Follow her instructions before Eric notices.',
  },
  {
    n: 12,
    title: 'Marks on the Calendar',
    story: "Continuing her mysterious gestures, Claudette turned to the calendar hanging on the wall, not far from the small library. She traced strange symbols on the upcoming days, hiding clues between the dates as if each day concealed a message.\nHer strokes were precise, almost invisible, leaving discreet marks on the paper, where time itself seemed to carry a hidden meaning.",
    hint: '"Connect each group of symbols with lines. When everything is connected, the hidden word will appear."',
    answer: 'CAVE',
    solved: 'The connected marks form CAVE. Claudette is pointing below the house.',
  },
  {
    n: 13,
    title: 'The Old\nNumerals',
    story: "Claudette was not finished. Beneath the marks on the calendar, she left a second layer of signs: short strokes, upright and flat, arranged with the patience of someone counting in secret.\nDavid studied their angles. They looked older than the calendar, older perhaps than the manor itself. These were not letters at all. They belonged to an ancient counting system, and they hid the combination to the door below.",
    hint: '"The signs you form are older than they appear. You are about to create Roman numerals."',
    answer: '349',
    solved: 'The Roman numerals resolve to 349. Take the combination downstairs; the end is close.',
  },
  {
    n: 14,
    title: 'The Trapdoor',
    story: "David finally understood what Claudette was trying to tell him. She had shown him everything without a word; now he only had to follow the thread.\nIn the kitchen, under the old frayed rug, he discovered a metal trapdoor. His instinct had not been wrong: this was where everything would unfold. On his knees, he pulled on the trapdoor's ring. Locked. Not one lock, but three.\nThe first was a heavy metal lock, almost symbolic, like a signature; he found its key in Eric's jacket. The second was a combination lock. David entered the combination Claudette had left him on the calendar. A sharp click confirmed he was right.\nBut just as he thought the way was clear, a final obstacle appeared: a three-letter lock. One that, he knew, had not been left to chance.\nIt was then that Eric burst into muffled laughter.\nEric: “Oh, I probably deserve this, don't I? Whether you open this cellar or not, my dear David, the end remains the same.”\nDavid: “Enough, Eric! Stop your circus! Give me the code, now!”\nEric: “Still so passionate... You know, I've always loved watching you chase after my riddles. You think you're conducting an investigation? You've only been playing my game, from start to finish.”\nDavid: “Give me that damn code!”\nThe police officers tried to calm him: “David, breathe. Let us handle this.” But he was no longer listening. His fists trembled, his eyes burning with rage, fixed on Eric.\nEric (sarcastically, raising his hands): “What a funny coincidence, really... The code? It corresponds to the initials of the first three costumes you so brilliantly discovered. A wink to your obsession with details.”\nAnger rose within David like a wave. But there was no time for rage. He had to open this lock.",
    hint: '"Remember the three costumes discovered first. They hold the last answer to your investigation."',
    answer: 'ZSC',
    solved: 'The initials are ZSC. The trapdoor is open now, and the children are waiting below.',
  },
]

const EPILOGUE =
  "The last lock surrendered with a metallic cry. Beneath the kitchen, David found the missing children wrapped in blankets, frightened but unharmed. Eric's smile finally vanished as the officers led him through the rain. By dawn, the manor's windows had gone dark and the fog began to lift. Yet on the evidence board, one red thread still trembled although no window was open. David left it untouched. Some riddles, he knew, do not end when the case is closed."

const INSTRUCTIONS =
  'Fourteen sealed case files stand between you and the children taken into the fog. Open them in order. Each file contains a chapter of the investigation, one essential clue, and one optional hint.\n' +
  'The clock begins at ninety minutes. A hint costs two minutes. Revealing a solution costs five. Wrong answers cost nothing, so trust your deductions. Your final score is every second left when File 14 closes.'

const END =
  'You cracked the codes, followed the trail, and uncovered the truth behind the shadows of Wonder Town.\nThe children are safe, thanks to you.\n\nBut remember... not every mystery ends where you think it does.\nSome riddles linger. Some shadows return.\n\nReady for your next case?'

export const EN: Content = { welcome: WELCOME, cases: CASES, epilogue: EPILOGUE, instructions: INSTRUCTIONS, end: END }
