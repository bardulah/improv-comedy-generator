import { randomChoice } from '../utils.js';

const locations = [
  'a hot air balloon',
  'an abandoned amusement park',
  'the bottom of the ocean',
  'a cheese factory',
  'the moon',
  'a karaoke bar in space',
  'a library that only has cookbooks',
  'a haunted elevator',
  'a petting zoo',
  'a submarine sandwich shop on an actual submarine',
  'a time machine repair shop',
  'the world\'s worst museum',
  'a yoga class for robots',
  'an underwater post office',
  'a retirement home for superheroes'
];

const situations = [
  'discovering that gravity has reversed',
  'realizing you\'re all speaking different languages but can somehow understand each other',
  'finding out the floor is lava (literally)',
  'learning that everyone else is a time traveler except you',
  'noticing that all the furniture is slowly shrinking',
  'realizing you\'re stuck in a musical and must sing everything',
  'discovering that you\'re all allergic to the same ridiculous thing',
  'finding out you\'re characters in someone\'s dream',
  'learning that objects keep disappearing when no one looks at them',
  'realizing everything is upside down',
  'discovering that you can only move in slow motion',
  'finding out you\'re all secretly the same person',
  'learning that you\'re being narrated by an unreliable narrator',
  'realizing you\'re trapped in a loop',
  'discovering that every word you say summons a tiny goblin'
];

const objectives = [
  'plan a surprise party',
  'solve a mystery',
  'start a business',
  'save the world',
  'order lunch',
  'write a screenplay',
  'audition for a talent show',
  'train for the Olympics',
  'organize a heist',
  'conduct a scientific experiment',
  'plan a wedding',
  'teach a masterclass',
  'host a game show',
  'negotiate a peace treaty',
  'break a world record'
];

export function generateScenePrompt(): string {
  const location = randomChoice(locations);
  const situation = randomChoice(situations);
  const objective = randomChoice(objectives);

  return `You are in ${location}, ${situation}. Your goal is to ${objective}.`;
}
