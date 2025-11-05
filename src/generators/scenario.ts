import { randomChoice, randomChoices } from '../utils.js';

const openings = [
  'It all started when',
  'Nobody expected that',
  'The day began normally until',
  'Everything changed when',
  'The strangest thing happened:',
  'Against all odds,',
  'In a shocking turn of events,',
  'It seemed impossible, but',
  'Just when you thought it couldn\'t get weirder,'
];

const protagonists = [
  'a pizza delivery driver',
  'a professional dog walker',
  'a kindergarten teacher',
  'a billionaire tech CEO',
  'a retired spy',
  'a struggling magician',
  'a paranoid librarian',
  'a motivational speaker',
  'a wedding photographer',
  'an overly confident intern',
  'a sleep-deprived parent',
  'a competitive chess player',
  'a food truck owner',
  'a mall Santa',
  'a social media influencer'
];

const discoveries = [
  'discovered their reflection was living a completely different life',
  'realized they could only communicate through song',
  'found a portal to an alternate dimension in their closet',
  'learned they were allergic to their own profession',
  'accidentally became famous for the wrong reason',
  'discovered their pet could talk (and had a lot of opinions)',
  'found out they had a superpower that only works on Tuesdays',
  'realized everyone else could see their thoughts as subtitles',
  'learned they were actually a robot but nobody told them',
  'discovered they had a long-lost evil twin',
  'found out they were living in a simulation (a very buggy one)',
  'realized they were the villain in someone else\'s story',
  'discovered they had been mispronouncing their own name their whole life',
  'learned they were the subject of a reality TV show',
  'found out time moves backwards for them'
];

const complications = [
  'but they had to keep it secret from their roommate',
  'while planning a surprise party',
  'during the worst possible moment',
  'and nobody believed them',
  'while being chased by',
  'but they kept forgetting about it',
  'and had only 24 hours to fix it',
  'while trying to impress their crush',
  'but their phone kept autocorrecting everything wrong',
  'during a job interview',
  'while their mother-in-law was visiting',
  'and had to team up with their nemesis',
  'but they were terrible at keeping secrets',
  'while competing on a reality show',
  'and the only person who could help was'
];

const helpers = [
  'a very unhelpful AI assistant',
  'their judgmental cat',
  'a motivational poster that came to life',
  'a time traveler who only speaks in puns',
  'a ghost with terrible advice',
  'their overly enthusiastic neighbor',
  'a fortune teller who can only see mundane futures',
  'a talking vending machine',
  'a retired superhero with memory problems',
  'a child who thinks they\'re an adult',
  'an alien disguised as a houseplant',
  'their past self (who disagrees with everything)',
  'a very sarcastic parrot',
  'a life coach who\'s terrible at their job',
  'a conspiracy theorist who\'s accidentally always right'
];

const twists = [
  'Plot twist: The whole thing was being broadcast live.',
  'Plot twist: They were in the wrong building the entire time.',
  'Plot twist: Everything was cake. Literally everything.',
  'Plot twist: They had been speaking to the wrong person all along.',
  'Plot twist: It was all a training exercise (or was it?).',
  'Plot twist: The solution was obvious but everyone overlooked it.',
  'Plot twist: The real treasure was the enemies they made along the way.',
  'Plot twist: They accidentally solved a completely different problem.',
  'Plot twist: Their arch-nemesis was actually their biggest fan.',
  'Plot twist: None of this actually happened - they fell asleep in a meeting.',
  'Plot twist: They were the chosen one, but for the wrong prophecy.',
  'Plot twist: The instructions were upside down the whole time.',
  'Plot twist: Everyone else was a time traveler except them.',
  'Plot twist: They were actually the bad guy.',
  'Plot twist: The whole world was playing along with their delusion.'
];

export function generateScenario(): string {
  const opening = randomChoice(openings);
  const protagonist = randomChoice(protagonists);
  const discovery = randomChoice(discoveries);
  const complication = randomChoice(complications);
  const helper = randomChoice(helpers);
  const twist = randomChoice(twists);

  return `${opening} ${protagonist} ${discovery}, ${complication} ${helper}.

${twist}

Now improvise this scene!`;
}
