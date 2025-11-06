#!/usr/bin/env node

import { generateScenePrompt } from './generators/scenePrompt.js';
import { generateCharacter } from './generators/character.js';
import { generateScenario } from './generators/scenario.js';
import { generateComeback, generatePunchlineFor } from './generators/comeback.js';

// Colors for terminal output (simple ANSI codes)
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  magenta: '\x1b[35m',
  red: '\x1b[31m'
};

function printBanner() {
  console.log(`${colors.bright}${colors.cyan}
╔═══════════════════════════════════════════════════╗
║      🎭 IMPROV COMEDY GENERATOR 🎭                ║
║   Generate absurd scenes & hilarious scenarios!  ║
╚═══════════════════════════════════════════════════╝
${colors.reset}`);
}

function printHelp() {
  console.log(`${colors.bright}Usage:${colors.reset}
  improv [command] [options]

${colors.bright}Commands:${colors.reset}
  ${colors.green}scene${colors.reset}              Generate an absurd scene prompt
  ${colors.green}character${colors.reset}          Generate a quirky character description
  ${colors.green}scenario${colors.reset}           Generate a full comedic scenario
  ${colors.green}comeback [setup]${colors.reset}   Generate a comeback line (optional setup)
  ${colors.green}punchline <setup>${colors.reset}  Generate a punchline for your setup
  ${colors.green}random${colors.reset}             Generate a random comedy element
  ${colors.green}all${colors.reset}                Generate everything at once
  ${colors.green}help${colors.reset}               Show this help message

${colors.bright}Examples:${colors.reset}
  improv scene
  improv character
  improv comeback "You think you're so smart"
  improv punchline "Why did the programmer quit?"
  improv all
`);
}

function printSection(title: string, content: string, color: string = colors.yellow) {
  console.log(`\n${colors.bright}${color}═══ ${title} ═══${colors.reset}\n`);
  console.log(content);
  console.log();
}

function handleSceneCommand() {
  const scene = generateScenePrompt();
  printSection('🎬 SCENE PROMPT', scene, colors.cyan);
}

function handleCharacterCommand() {
  const character = generateCharacter();
  printSection('🎭 CHARACTER', character, colors.magenta);
}

function handleScenarioCommand() {
  const scenario = generateScenario();
  printSection('📖 SCENARIO', scenario, colors.yellow);
}

function handleComebackCommand(setup?: string) {
  const comeback = generateComeback(setup);
  if (setup) {
    printSection('💬 SETUP', `"${setup}"`, colors.green);
  }
  printSection('🔥 COMEBACK', comeback, colors.red);
}

function handlePunchlineCommand(setup: string) {
  if (!setup) {
    console.log(`${colors.red}Error: Please provide a setup for the punchline${colors.reset}`);
    console.log(`Example: improv punchline "Why did the chicken cross the road?"`);
    return;
  }
  const punchline = generatePunchlineFor(setup);
  printSection('💬 SETUP', `"${setup}"`, colors.green);
  printSection('🎯 PUNCHLINE', punchline, colors.yellow);
}

function handleRandomCommand() {
  const generators = [
    { name: 'scene', fn: handleSceneCommand },
    { name: 'character', fn: handleCharacterCommand },
    { name: 'scenario', fn: handleScenarioCommand },
    { name: 'comeback', fn: () => handleComebackCommand() }
  ];

  const random = generators[Math.floor(Math.random() * generators.length)];
  console.log(`${colors.bright}${colors.cyan}✨ Random generator: ${random.name}${colors.reset}`);
  random.fn();
}

function handleAllCommand() {
  handleSceneCommand();
  handleCharacterCommand();
  handleScenarioCommand();
  handleComebackCommand();
}

function main() {
  const args = process.argv.slice(2);
  const command = args[0]?.toLowerCase();

  // If no command, show banner and help
  if (!command) {
    printBanner();
    printHelp();
    return;
  }

  switch (command) {
    case 'scene':
    case 's':
      handleSceneCommand();
      break;

    case 'character':
    case 'char':
    case 'c':
      handleCharacterCommand();
      break;

    case 'scenario':
    case 'sc':
      handleScenarioCommand();
      break;

    case 'comeback':
    case 'cb':
      const comebackSetup = args.slice(1).join(' ');
      handleComebackCommand(comebackSetup || undefined);
      break;

    case 'punchline':
    case 'punch':
    case 'p':
      const punchlineSetup = args.slice(1).join(' ');
      handlePunchlineCommand(punchlineSetup);
      break;

    case 'random':
    case 'r':
      handleRandomCommand();
      break;

    case 'all':
    case 'a':
      handleAllCommand();
      break;

    case 'help':
    case 'h':
    case '-h':
    case '--help':
      printBanner();
      printHelp();
      break;

    default:
      console.log(`${colors.red}Unknown command: ${command}${colors.reset}\n`);
      printHelp();
      break;
  }
}

main();
