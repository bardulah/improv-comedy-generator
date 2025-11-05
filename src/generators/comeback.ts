import { randomChoice, randomChoices } from '../utils.js';

const comebackTemplates = [
  (setup: string) => `Oh really? Well ${absurdComparison()}!`,
  (setup: string) => `That's cute. ${randomChoice(playfulInsults())}`,
  (setup: string) => `Says the person who ${randomActivity()}.`,
  (setup: string) => `I'd agree with you, but ${randomExcuse()}.`,
  (setup: string) => `That's the most ${randomAdjective()} thing I've heard since ${randomHistoricalEvent()}.`,
  (setup: string) => `At least I'm not ${randomEmbarrassingTrait()}.`,
  (setup: string) => `Is that what you learned at ${randomFakeSchool()}?`,
  (setup: string) => `My ${randomRelative()} has more ${randomQuality()} than that.`,
  (setup: string) => `That's rich coming from ${randomCharacterization()}.`,
  (setup: string) => `Sure, and I'm the ${randomRoyalty()}.`
];

function absurdComparison(): string {
  const comparisons = [
    'at least I don\'t iron my socks',
    'I\'ve seen more convincing arguments from a fortune cookie',
    'my houseplant has better opinions',
    'you couldn\'t convince water to be wet',
    'that makes about as much sense as a screen door on a submarine',
    'I\'ve heard better ideas from a magic 8-ball',
    'you have the confidence of a toddler with a knife'
  ];
  return randomChoice(comparisons);
}

function playfulInsults(): string[] {
  return [
    'You have the energy of a dial-up modem.',
    'Your personality is like unsalted crackers.',
    'You\'re like a software update - nobody asked for you.',
    'You have the charisma of a parking ticket.',
    'You\'re about as useful as a waterproof tea bag.',
    'You have the wit of a broken calculator.'
  ];
}

function randomActivity(): string {
  const activities = [
    'alphabetizes their spice rack',
    'brings a clipboard to parties',
    'still uses Internet Explorer',
    'eats pizza with a fork and knife',
    'unironically wears a fanny pack',
    'takes selfies at funerals',
    'claps when the plane lands',
    'posts inspirational quotes at 6 AM'
  ];
  return randomChoice(activities);
}

function randomExcuse(): string {
  const excuses = [
    'then we\'d both be wrong',
    'I promised myself I\'d be nice today',
    'my therapist says I should pick my battles',
    'that would make one of us confused',
    'I don\'t have the crayons to explain this to you',
    'I left my patience in my other pants'
  ];
  return randomChoice(excuses);
}

function randomAdjective(): string {
  const adjectives = [
    'confidently incorrect',
    'impressively wrong',
    'aggressively mediocre',
    'spectacularly unnecessary',
    'hilariously misguided',
    'fascinatingly absurd'
  ];
  return randomChoice(adjectives);
}

function randomHistoricalEvent(): string {
  const events = [
    'my cat tried to eat a houseplant',
    'someone tried to sell me a timeshare',
    'I watched a toddler negotiate',
    'I read YouTube comments',
    'I listened to elevator music',
    'someone explained NFTs to me'
  ];
  return randomChoice(events);
}

function randomEmbarrassingTrait(): string {
  const traits = [
    'the person who says "you too" when the waiter says enjoy your meal',
    'someone who waves back at someone waving at the person behind you',
    'the one who laughs at their own jokes before the punchline',
    'that person who claps at the movie theater',
    'someone who microwaves fish in the office',
    'the person who pulls on a door that clearly says push'
  ];
  return randomChoice(traits);
}

function randomFakeSchool(): string {
  const schools = [
    'the University of Wrong Opinions',
    'the School of Bad Takes',
    'Clown College (wait, that\'s real)',
    'the Academy of Mild Inconveniences',
    'the Institute of Missing the Point',
    'the College of Confidently Incorrect'
  ];
  return randomChoice(schools);
}

function randomRelative(): string {
  const relatives = [
    'pet rock',
    'imaginary friend',
    'Roomba',
    'house plant',
    'WiFi router',
    'Magic 8-Ball'
  ];
  return randomChoice(relatives);
}

function randomQuality(): string {
  const qualities = [
    'common sense',
    'self-awareness',
    'social skills',
    'good taste',
    'timing',
    'dignity'
  ];
  return randomChoice(qualities);
}

function randomCharacterization(): string {
  const characterizations = [
    'someone who peaked in high school',
    'a human participation trophy',
    'the embodiment of a group project where one person did all the work',
    'a walking red flag convention',
    'someone whose personality is "I listen to podcasts"',
    'a sentient LinkedIn post'
  ];
  return randomChoice(characterizations);
}

function randomRoyalty(): string {
  const royalty = [
    'Queen of England',
    'Prince of Bel-Air',
    'Duke of Earl',
    'Sultan of Swing',
    'Emperor of Ice Cream',
    'Princess of Power'
  ];
  return randomChoice(royalty);
}

const punchlineSetups = [
  'Why did the {subject} {action}?',
  'What do you call a {adjective} {subject}?',
  'How many {subject}s does it take to {action}?',
  'What\'s the difference between a {subject} and a {subject2}?',
  'A {subject} walks into a bar...'
];

function generatePunchline(setup: string): string {
  const punchlines = [
    'To get to the other side... of their existential crisis!',
    'Because {reason}!',
    'The same reason your phone always dies at 20%!',
    'Nobody knows, they\'re still figuring it out!',
    'Because someone told them not to!',
    'The universe wasn\'t ready for that answer!',
    'Plot twist: they were the same person all along!',
    'Because they read it on the internet!',
    'Tax purposes!',
    'That\'s classified information!',
    'Because they failed at everything else!',
    'The prophecy demanded it!'
  ];

  const reasons = [
    'they believed in themselves (their first mistake)',
    'Mercury was in retrograde',
    'they googled it but only read the headline',
    'someone on TikTok said it was a good idea',
    'they had nothing better to do',
    'peer pressure from inanimate objects',
    'they were trying to avoid their responsibilities',
    'the warranty expired'
  ];

  let punchline = randomChoice(punchlines);
  if (punchline.includes('{reason}')) {
    punchline = punchline.replace('{reason}', randomChoice(reasons));
  }

  return punchline;
}

export function generateComeback(userSetup?: string): string {
  if (userSetup) {
    const template = randomChoice(comebackTemplates);
    return template(userSetup);
  }

  // If no setup provided, generate a generic punchline
  return generatePunchline('');
}

export function generatePunchlineFor(setup: string): string {
  return generatePunchline(setup);
}
