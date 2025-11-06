/**
 * Interactive mode for step-by-step comedy generation
 */

import * as readline from 'readline';
import { ScenePromptGenerator } from './generators/scenePrompt.js';
import { CharacterGenerator } from './generators/character.js';
import { ScenarioGenerator } from './generators/scenario.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer.trim());
    });
  });
}

export async function runInteractiveMode(): Promise<void> {
  console.log('\n🎭 Welcome to Interactive Comedy Generator!\n');
  console.log('Let\'s build your improv prompt step by step.\n');

  // Ask what they want to generate
  console.log('What would you like to generate?');
  console.log('1. Scene prompt');
  console.log('2. Character');
  console.log('3. Full scenario');
  console.log('4. Everything (scene + characters + scenario)');

  const choice = await question('\nYour choice (1-4): ');

  const noRepeat = (await question('\nAvoid recent repeats? (y/n): ')).toLowerCase() === 'y';
  const options = { noRepeat };

  console.log('\n' + '='.repeat(50) + '\n');

  switch (choice) {
    case '1':
      await generateInteractiveScene(options);
      break;
    case '2':
      await generateInteractiveCharacter(options);
      break;
    case '3':
      await generateInteractiveScenario(options);
      break;
    case '4':
      await generateEverything(options);
      break;
    default:
      console.log('Invalid choice. Exiting.');
  }

  // Ask if they want to save
  const save = await question('\nSave to file? (y/n): ');
  if (save.toLowerCase() === 'y') {
    const filename = await question('Filename: ');
    if (filename) {
      console.log(`\n(Note: Actual save functionality would be implemented here)`);
      console.log(`Would save to: ${filename}`);
    }
  }

  rl.close();
}

async function generateInteractiveScene(options: any): Promise<void> {
  const generator = new ScenePromptGenerator();
  const result = generator.generate(options);

  console.log('🎬 SCENE PROMPT\n');
  console.log(result.formatted);

  const regenerate = await question('\nGenerate another? (y/n): ');
  if (regenerate.toLowerCase() === 'y') {
    console.log('\n' + '='.repeat(50) + '\n');
    await generateInteractiveScene(options);
  }
}

async function generateInteractiveCharacter(options: any): Promise<void> {
  const count = await question('How many characters? (1-5): ');
  const numChars = Math.min(5, Math.max(1, parseInt(count) || 1));

  const generator = new CharacterGenerator();

  for (let i = 0; i < numChars; i++) {
    console.log(`\n🎭 CHARACTER ${i + 1}\n`);
    const result = generator.generate(options);
    console.log(result.formatted);
  }

  const regenerate = await question('\nGenerate more? (y/n): ');
  if (regenerate.toLowerCase() === 'y') {
    console.log('\n' + '='.repeat(50) + '\n');
    await generateInteractiveCharacter(options);
  }
}

async function generateInteractiveScenario(options: any): Promise<void> {
  const generator = new ScenarioGenerator();
  const result = generator.generate(options);

  console.log('📖 SCENARIO\n');
  console.log(result.formatted);

  const regenerate = await question('\nGenerate another? (y/n): ');
  if (regenerate.toLowerCase() === 'y') {
    console.log('\n' + '='.repeat(50) + '\n');
    await generateInteractiveScenario(options);
  }
}

async function generateEverything(options: any): Promise<void> {
  const sceneGen = new ScenePromptGenerator();
  const charGen = new CharacterGenerator();
  const scenarioGen = new ScenarioGenerator();

  console.log('🎬 SCENE\n');
  console.log(sceneGen.generate(options).formatted);

  const numChars = await question('\n\nHow many characters for this scene? (1-5): ');
  const count = Math.min(5, Math.max(1, parseInt(numChars) || 2));

  for (let i = 0; i < count; i++) {
    console.log(`\n🎭 CHARACTER ${i + 1}\n`);
    console.log(charGen.generate(options).formatted);
  }

  console.log('\n📖 SCENARIO\n');
  console.log(scenarioGen.generate(options).formatted);
}
