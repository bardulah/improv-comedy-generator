import { randomChoice } from '../utils.js';

const professions = [
  'a professional bubble wrap popper',
  'a competitive eater who only eats salad',
  'a motivational speaker for houseplants',
  'a sock puppet therapist',
  'a professional napper',
  'a fortune cookie writer',
  'a professional line-stander',
  'a ghost tour guide who doesn\'t believe in ghosts',
  'a competitive backward walker',
  'a professional complainer',
  'a ninja accountant',
  'a yoga instructor for cats',
  'a professional high-fiver',
  'a mime translator',
  'a paranoid food critic'
];

const personalities = [
  'overly dramatic',
  'suspiciously optimistic',
  'chronically confused',
  'inappropriately enthusiastic',
  'passive-aggressive',
  'weirdly competitive',
  'constantly hungry',
  'pathologically literal',
  'unnecessarily mysterious',
  'aggressively friendly',
  'perpetually tired',
  'obsessed with conspiracy theories',
  'speaks only in questions',
  'takes everything as a personal challenge',
  'communicates primarily through interpretive dance'
];

const quirks = [
  'can only speak in movie quotes',
  'must rhyme everything they say',
  'is convinced they\'re being filmed for a reality show',
  'has an irrational fear of the color purple',
  'forgets their own name constantly',
  'believes they\'re invisible when they close their eyes',
  'must touch everything exactly three times',
  'speaks in a different accent every sentence',
  'is allergic to common sense',
  'has a soundtrack playing in their head and reacts to it',
  'can only tell lies',
  'must compliment every object they see',
  'thinks they\'re in a different decade',
  'communicates complex emotions through sneezing',
  'is convinced they\'re a medieval knight'
];

const secrets = [
  'They\'re actually three kids in a trench coat',
  'They\'re from the future but terrible at hiding it',
  'They\'re writing a tell-all book about everyone they meet',
  'They\'re convinced they\'re the chosen one (they\'re not)',
  'They\'re on the run from a ridiculous crime',
  'They\'re actually a retired superhero',
  'They can read minds but only boring thoughts',
  'They\'re a prince/princess of a country that doesn\'t exist',
  'They have a twin they don\'t know about who keeps following them',
  'They\'re allergic to their own profession',
  'They\'ve never actually done their job correctly',
  'They\'re secretly terrified of their own success',
  'They think they\'re a vampire but they\'re definitely not',
  'They\'re in witness protection for witnessing something completely mundane',
  'They have a nemesis who doesn\'t know they exist'
];

export function generateCharacter(): string {
  const profession = randomChoice(professions);
  const personality = randomChoice(personalities);
  const quirk = randomChoice(quirks);
  const secret = randomChoice(secrets);

  return `You are ${profession}. You are ${personality} and ${quirk}. Secret: ${secret}`;
}
