import type { Content } from './types'

/**
 * Textes du jeu en français.
 * Les noms propres suivent l'eBook français du Figma (David, Eric, Adrian, Claudette, Catty, Wonder Town).
 * Réponses : l'énigme 9 (objets → mot français) et l'énigme 11 (catégories de livres) ont été refaites pour le français.
 */

const WELCOME = {
  title: 'Bienvenue à Wonder Town',
  text: "Wonder Town, un village magique où Halloween rime avec amitié. Cette année, les familles ont été réparties en nouvelles équipes pour aider les voisins à faire connaissance. Mais lorsque David découvre huit enfants dans son groupe au lieu de cinq, une mystérieuse aventure d'Halloween commence.",
}

const CASES: Content['cases'] = [
  {
    n: 1,
    title: "L'Agenda",
    story:
      "Le doute et les questions flottaient dans l'air tandis que David parlait avec Eric, le conseiller municipal, de ces invités inattendus. Eric, tout aussi perplexe, lui assura que les autres groupes comptaient le bon nombre d'enfants. Cette étrange situation inquiétait les deux hommes.\nPeu après, David reçut un e-mail intitulé « Agenda », qui attira immédiatement son attention. En y regardant de plus près, il eut le sentiment qu'Eric essayait de lui faire passer un message discret.\nDavid comprit qu'il devait rester prudent. Il se mit à observer chaque détail avec soin, tout en suivant les mystérieuses instructions du message.\nLe fichier joint était verrouillé... Votre mission : trouver le code caché quelque part dans le message.",
    hint: '« Rassemblez les lettres de la même couleur et suivez l\'ordre indiqué par Eric Premier. Observez attentivement : un nombre peut apparaître. »',
    answer: '681',
    solved: "L'ordre caché est clair à présent. Avancez : la première piste vient tout juste d'apparaître.",
  },
  {
    n: 2,
    title: 'Le Tableau',
    story:
      "Le fichier « Agenda » révélait un message troublant :\n« Des nains voleurs se sont infiltrés dans les festivités d'Halloween, semant discrètement le chaos dans les maisons et perturbant la vie des habitants. »\nDavid comprit aussitôt la gravité de la situation. Il devait faire comme si de rien n'était, pour ne pas effrayer les enfants ni alerter les coupables. Calme et souriant en apparence, il commença en secret une véritable enquête.\nPeu après, il reçut un message d'Eric contenant une géolocalisation : la maison d'Adrian, l'organisateur de la fête. Faisant confiance à Eric, qui semblait l'aider à traquer les voleurs, David s'y rendit sans tarder. À son arrivée, il fut chaleureusement accueilli par les parents d'Adrian et quelques enfants déjà présents.\nProfitant d'un instant d'inattention, il se glissa discrètement dans la chambre du jeune organisateur. Il y découvrit un tableau d'enquête couvert de photos et de documents liés aux préparatifs d'Halloween.\nEn y regardant de plus près, David eut une intuition : ce tableau n'était pas qu'une simple décoration... Il cachait sans doute des indices essentiels sur l'étrange affaire des nains voleurs.",
    hint: '« Avec un stylo ou votre doigt, reliez les éléments de chaque série. Observez bien les formes obtenues. Quels nombres apparaissent ? »',
    answer: '215',
    // Le Figma reprend ici le texte du dossier 1.
    solved: "L'ordre caché est clair à présent. Avancez : la première piste vient tout juste d'apparaître.",
  },
  {
    n: 3,
    title: "L'Horloge\nfigée",
    story:
      "Lentement, David ouvrit le dos du tableau, espérant y trouver de quoi raviver son espoir. À l'intérieur, il découvrit un objet confirmant la piste prometteuse qu'il suivait depuis le début : une mallette verrouillée par deux codes.\nPendant ce temps, la maison résonnait des rires des enfants et des voix joyeuses des parents. David savait qu'il devait rester concentré et agir vite.\nSon regard se posa sur une horloge numérique murale. Ses chiffres, figés sur une heure précise, semblaient cacher un mystère.\nSur le mur, il remarqua plusieurs lignes tracées, regroupées en cinq ensembles qui se croisaient en de nombreux points. Elles formaient une étrange structure géométrique, pleine de sens cachés et de promesses d'énigmes.",
    hint: "« Cinq groupes de lignes ornent le mur. Choisissez ceux indiqués par l'horloge et comptez les intersections. »",
    answer: '324',
    solved: "L'horloge a désigné les bons croisements. Une serrure s'ouvre ; une autre énigme attend.",
  },
  {
    n: 4,
    title: 'Lumière bleue',
    story:
      "Après avoir résolu l'énigme de l'horloge numérique, David parvint enfin à décoder le premier code de la mallette. Un léger déclic retentit : le mécanisme s'entrouvrit, révélant une première réussite... mais aussi la promesse d'épreuves plus difficiles.\nÀ peine eut-il le temps de savourer ce succès que le doute revint, car la seconde partie de l'énigme lui résistait. La tension montait, le temps filait, et les rires des enfants résonnaient au loin comme un cruel rappel : il devait garder son calme.\nC'est alors qu'un détail anodin attira son regard. Sur une étagère poussiéreuse reposait une simple lampe de poche. Rien d'inhabituel, sauf l'étrange lueur bleue qui filtrait faiblement de son ampoule.\nPoussé par son instinct, David s'en saisit et en dirigea le faisceau sur le tableau d'indices. Sous la lumière, la pièce changea. Des formes invisibles apparurent peu à peu sur le tableau : symboles, chiffres et traces lumineuses se fondaient en un message secret, comme si l'énigme elle-même venait de s'éveiller.\nDavid comprit qu'il avait franchi un nouveau seuil. Le mystère s'épaississait, mais la vérité n'avait jamais semblé si proche.",
    hint: "« Trouvez l'âge du maire, puis le code à six chiffres qui lui correspond. Attention : seuls trois chiffres sont utiles. »",
    answer: '435',
    solved: "La lumière bleue révèle les trois chiffres utiles. La mallette peut enfin s'ouvrir.",
  },
  {
    n: 5,
    title: 'Le Journal\nde Catty',
    story:
      "David entra le second code dans la serrure et tourna lentement le mécanisme. Un déclic discret retentit : la mallette s'ouvrit enfin, dévoilant son contenu soigneusement dissimulé. À l'intérieur reposaient des dossiers parfaitement rangés et quelques photographies éparses.\nParmi ces découvertes, David trouva le journal intime d'une jeune fille prénommée Catty. Un détail le frappa aussitôt : aucun enfant n'avait porté de costume de chat ce soir-là.\nLe carnet était protégé par une combinaison à quatre chiffres, mais deux précieux indices l'accompagnaient... De quoi espérer percer le secret bien gardé de Catty.",
    hint: "« L'intersection de chaque paire de lignes indique un chiffre parmi neuf. Lisez entre les croisements pour découvrir la suite. »",
    answer: '8693',
    solved: 'Les croisements forment un code. Ouvrez le journal et lisez ce que Catty a laissé.',
  },
  {
    n: 6,
    title: 'La Fille\nzombie',
    story:
      "David parvint enfin à ouvrir le cadenas du journal. En feuilletant les pages, son regard fut aussitôt attiré par une photographie d'une petite fille déguisée en zombie. Un soulagement l'envahit : il reconnaissait l'un des costumes portés par les enfants de son groupe. Une première piste, qui lui permettrait d'écarter certains enfants et d'identifier les imposteurs.\nParmi les pages usées, il découvrit une feuille couverte de griffonnages, écrite par la fille au costume de zombie. Il tourna la page et se mit à lire attentivement. Le passage était à la fois drôle et touchant : la fillette y exprimait sa frustration d'avoir été associée à un autre enfant qu'elle ne trouvait pas très sympathique.",
    hint: '« Relisez la description de la fille dans le journal, et pensez à votre super-héros de quartier. La clé se trouve dans le lien entre les deux. »',
    answer: 'SPIDER-MAN',
    solved: 'La description mène à Spider-Man. Notez ce déguisement : les imposteurs se précisent.',
  },
  {
    n: 7,
    title: "L'Énigme\ndes ombres",
    story:
      "David rassembla les indices et s'apprêta à quitter la maison d'Adrian. Avant de partir, il décida de jeter un dernier coup d'œil autour de lui, bien décidé à voir s'il pouvait repérer un autre intrus parmi les enfants.\nSon attention fut attirée par un garçon assis près de la table basse, absorbé par un coloriage abandonné. Intrigué, David s'approcha lentement, observant chacun de ses gestes. L'enfant dessinait avec une aisance surprenante, concentré et calme, comme s'il ignorait tout de ce qui se passait.\nEn se penchant pour mieux voir le dessin, David remarqua, à sa gauche, une étrange carte posée sur la table.",
    hint: "« Chaque symbole correspond à une lettre de l'alphabet. Décodez leur message : c'est l'énigme des ombres. »",
    answer: 'CLOWN',
    solved: 'Les symboles forment CLOWN. Gardez ce nom en tête : les ravisseurs sont déjà en mouvement.',
  },
  {
    n: 8,
    title: 'Le Mot de passe\nchangé',
    story:
      "Soudain, depuis la fenêtre du bureau, David aperçut trois silhouettes qui pédalaient à toute vitesse vers la sortie de la ville. Sur leurs vélos, elles transportaient des enfants inconscients. Aucun doute : c'étaient les nains, les ravisseurs.\nSans réfléchir, David se lança à leur poursuite. À sa grande surprise, Eric, le conseiller qui l'aidait depuis le début, courait lui aussi dans la même direction pour rattraper les voleurs. Tout en courant, Eric essaya de lui donner de nouvelles informations sur l'affaire, mais David l'écoutait à peine : l'urgence primait sur tout, et Eric peinait à le suivre.\nÀ bout de souffle, David atteignit enfin l'endroit où les enfants auraient dû se trouver. Il était vide. Pas un bruit, pas une trace.\nIl sortit son téléphone pour appeler à l'aide... et réalisa, stupéfait, que les nains avaient changé son mot de passe pendant qu'il était distrait. Un nouveau piège. Une preuve de plus que l'ennemi avait toujours une longueur d'avance.",
    hint: "« Le premier contact à l'écran est celui que l'on distingue à peine. Observez bien : parfois, l'invisible détient la clé. »",
    answer: '61753',
    solved: 'Le contact discret cache le mot de passe. Déverrouillez le téléphone : chaque seconde compte.',
  },
  {
    n: 9,
    title: 'Angel Street',
    story:
      "Grâce à son sens de l'observation, David réussit à déverrouiller son téléphone avec le nouveau code laissé par les ravisseurs. Il pouvait enfin appeler à l'aide et reprendre la recherche des enfants disparus.\nSans perdre une seconde, il contacta Eric pour obtenir du renfort. Les deux hommes unirent leurs efforts pour analyser les indices susceptibles de les mener aux enfants. David partagea tout ce qu'il avait découvert sur Adrian, y compris les photos de la mallette. En recoupant les informations, ils déterminèrent une nouvelle direction à suivre.\nGuidé par ces déductions, David se rendit dans une étrange ruelle appelée Angel Street. Il y trouva plusieurs objets abandonnés par les enfants, chacun semblant détenir un indice. Il comprit qu'ils avaient été laissés volontairement par l'un d'eux, comme un message indiquant le chemin.",
    // Version française du Figma : plus de traduction à faire, les objets forment directement le mot.
    hint: '« Chaque objet correspond à une lettre. Assemblez-les pour former un mot. »',
    answer: 'DIX',
    solved: "Les objets forment DIX. La piste se poursuit, et quelqu'un tente de vous guider de l'intérieur.",
  },
  {
    n: 10,
    title: 'Les Aiguilles\narrêtées',
    story:
      "La première chose que fit Claudette fut de se rendre à l'horloge du salon. Elle en retira la pile, régla l'heure sur un moment précis, puis colla un post-it à côté.",
    hint: "« Le post-it révèle la fin du mot, tandis que l'horloge indique sa première lettre. Assemblez-les. »",
    answer: 'VEST',
    alt: ['VESTE'],
    solved: "L'horloge et la note forment VEST. Claudette a un autre message en réserve.",
  },
  {
    n: 11,
    title: 'Sept livres',
    story:
      "Après le premier indice, Claudette se dirigea vers la petite bibliothèque près du vestibule. Elle choisit sept livres parmi les nombreux volumes alignés sur les étagères et, un à un, les disposa avec soin dans un ordre bien précis. Chaque livre avait une couleur et des gravures sur sa couverture, ce qui le rendait facilement reconnaissable.\nDavid, attentif à chacun de ses gestes, tenta de mémoriser la séquence exacte de ses mouvements.",
    hint: '« Concentrez-vous uniquement sur la catégorie de chaque livre et retenez leur première lettre. Ils attendent, discrets mais essentiels. »',
    // Version française du Figma : les catégories visibles (Univers, Investigation, Ingéniosité, Education) donnent U-I-I-E.
    answer: 'CUISINE',
    solved: "Les catégories forment CUISINE. Suivez ses instructions avant qu'Eric ne s'en aperçoive.",
  },
  {
    n: 12,
    title: 'Marques sur le\ncalendrier',
    story:
      "Poursuivant ses gestes mystérieux, Claudette se tourna vers le calendrier accroché au mur, non loin de la petite bibliothèque. Elle traça d'étranges symboles sur les jours à venir, dissimulant des indices entre les dates comme si chaque jour cachait un message.\nSes traits étaient précis, presque invisibles, laissant de discrètes marques sur le papier, où le temps lui-même semblait porter un sens caché.",
    hint: '« Reliez chaque groupe de symboles par des lignes. Quand tout sera relié, le mot caché apparaîtra. »',
    answer: 'CAVE',
    solved: 'Les marques reliées forment CAVE. Claudette désigne le sous-sol de la maison.',
  },
  {
    n: 13,
    title: 'Les Anciens\nchiffres',
    story:
      "Claudette n'avait pas terminé. Sous les marques du calendrier, elle avait laissé une seconde couche de signes : de courts traits, droits et plats, disposés avec la patience de quelqu'un qui compte en secret.\nDavid étudia leurs angles. Ils semblaient plus anciens que le calendrier, plus anciens peut-être que le manoir lui-même. Ce n'étaient pas des lettres. Ils appartenaient à un très ancien système de numération, et ils cachaient la combinaison de la porte du dessous.",
    hint: "« Les signes que vous formez sont plus anciens qu'il n'y paraît. Vous êtes sur le point de créer des chiffres romains. »",
    answer: '349',
    solved: 'Les chiffres romains donnent 349. Descendez avec la combinaison : la fin est proche.',
  },
  {
    n: 14,
    title: 'La Trappe',
    story:
      "David comprit enfin ce que Claudette essayait de lui dire. Elle lui avait tout montré sans un mot ; il ne lui restait plus qu'à suivre le fil.\nDans la cuisine, sous le vieux tapis élimé, il découvrit une trappe métallique. Son instinct ne l'avait pas trompé : c'était ici que tout allait se jouer. À genoux, il tira sur l'anneau de la trappe. Verrouillée. Non pas une serrure, mais trois.\nLa première était un lourd cadenas métallique, presque symbolique, comme une signature ; il en trouva la clé dans la veste d'Eric. La deuxième était une serrure à combinaison. David y entra la combinaison que Claudette lui avait laissée sur le calendrier. Un déclic net confirma qu'il avait raison.\nMais alors qu'il croyait la voie libre, un dernier obstacle apparut : une serrure à trois lettres. Une serrure qui, il le savait, n'avait rien laissé au hasard.\nC'est alors qu'Eric éclata d'un rire étouffé.\nEric : « Oh, je le mérite sûrement, n'est-ce pas ? Que vous ouvriez cette cave ou non, mon cher David, la fin reste la même. »\nDavid : « Assez, Eric ! Cessez votre cirque ! Donnez-moi le code, maintenant ! »\nEric : « Toujours aussi passionné... Vous savez, j'ai toujours adoré vous regarder courir après mes énigmes. Vous pensez mener une enquête ? Vous n'avez fait que jouer mon jeu, du début à la fin. »\nDavid : « Donnez-moi ce maudit code ! »\nLes policiers tentèrent de le calmer : « David, respirez. Laissez-nous faire. » Mais il n'écoutait plus. Ses poings tremblaient, ses yeux brûlaient de rage, fixés sur Eric.\nEric (sarcastique, levant les mains) : « Quelle drôle de coïncidence, vraiment... Le code ? Il correspond aux initiales des trois premiers costumes que vous avez si brillamment découverts. Un clin d'œil à votre obsession du détail. »\nLa colère monta en David comme une vague. Mais ce n'était pas le moment de s'y abandonner. Il devait ouvrir cette serrure.",
    hint: '« Rappelez-vous les trois costumes découverts en premier. Ils détiennent la dernière réponse de votre enquête. »',
    answer: 'ZSC',
    solved: "Les initiales sont ZSC. La trappe est ouverte à présent, et les enfants vous attendent en bas.",
  },
]

const EPILOGUE =
  "La dernière serrure céda dans un cri métallique. Sous la cuisine, David retrouva les enfants disparus, enveloppés dans des couvertures, effrayés mais indemnes. Le sourire d'Eric s'effaça enfin tandis que les policiers l'emmenaient sous la pluie. À l'aube, les fenêtres du manoir s'étaient éteintes et la brume commençait à se lever. Pourtant, sur le tableau d'indices, un fil rouge tremblait encore alors qu'aucune fenêtre n'était ouverte. David n'y toucha pas. Certaines énigmes, il le savait, ne s'achèvent pas quand l'affaire est classée."

const INSTRUCTIONS =
  "Quatorze dossiers scellés se dressent entre vous et les enfants emportés par la brume. Ouvrez-les dans l'ordre. Chaque dossier contient un chapitre de l'enquête, une piste essentielle et un indice facultatif.\n" +
  "Le chronomètre démarre à quatre-vingt-dix minutes. Un indice coûte deux minutes. Révéler une solution en coûte cinq. Les mauvaises réponses ne coûtent rien : fiez-vous à vos déductions. Votre score final est le nombre de secondes restantes à la clôture du dossier 14."

const END =
  "Vous avez déchiffré les codes, suivi la piste et découvert la vérité derrière les ombres de Wonder Town.\nLes enfants sont sains et saufs, grâce à vous.\n\nMais souvenez-vous... tous les mystères ne s'achèvent pas là où l'on croit.\nCertaines énigmes persistent. Certaines ombres reviennent.\n\nPrêts pour votre prochaine affaire ?"

export const FR: Content = { welcome: WELCOME, cases: CASES, epilogue: EPILOGUE, instructions: INSTRUCTIONS, end: END }
