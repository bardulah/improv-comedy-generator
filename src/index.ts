#!/usr/bin/env node

import { ScenePromptGenerator } from './generators/scenePrompt.js';
import { CharacterGenerator } from './generators/character.js';
import { ScenarioGenerator } from './generators/scenario.js';
import { generateComeback, generatePunchlineFor } from './generators/comeback.js';
import { parseArgs } from './cli-parser.js';
import { Exporter } from './exporter.js';
import { runInteractiveMode } from './interactive.js';
import { CombinationGenerator } from './combination.js';
import { getHistory, clearHistory } from './utils.js';
import { loadConfig } from './config.js';

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  magenta: '\x1b[35m',
  red: '\x1b[31m',
  blue: '\x1b[34m'
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
  ${colors.green}combo${colors.reset}              Generate a combination (scene + characters)
  ${colors.green}random${colors.reset}             Generate a random comedy element
  ${colors.green}all${colors.reset}                Generate everything at once
  ${colors.green}history${colors.reset}            Show generation history
  ${colors.green}help${colors.reset}               Show this help message

${colors.bright}Options:${colors.reset}
  ${colors.cyan}--count, -c <n>${colors.reset}     Generate multiple items
  ${colors.cyan}--no-repeat${colors.reset}         Avoid recently used items
  ${colors.cyan}--save, -s <file>${colors.reset}   Save output to file
  ${colors.cyan}--json, -j${colors.reset}          Output as JSON
  ${colors.cyan}--minimal${colors.reset}           Minimal text output
  ${colors.cyan}--interactive, -i${colors.reset}   Interactive mode
  ${colors.cyan}--theme <name>${colors.reset}      Filter by theme
  ${colors.cyan}--clear-history${colors.reset}     Clear generation history

${colors.bright}Examples:${colors.reset}
  improv scene --count 3
  improv character --no-repeat
  improv combo
  improv scene --save scene.txt
  improv all --json
  improv --interactive
  improv history
`);
}

function printSection(title: string, content: string, color: string = colors.yellow) {
  console.log(`\n${colors.bright}${color}═══ ${title} ═══${colors.reset}\n`);
  console.log(content);
  console.log();
}

async function handleSceneCommand(parsed: any) {
  const generator = new ScenePromptGenerator();
  const count = parsed.options.count || 1;

  if (count > 1) {
    console.log(`${colors.cyan}Generating ${count} scene prompts...${colors.reset}\n`);
  }

  const results = [];
  for (let i = 0; i < count; i++) {
    const result = generator.generateWithHistory(parsed.options);
    if (count > 1) {
      printSection(`🎬 SCENE ${i + 1}`, result.formatted, colors.cyan);
    } else {
      printSection('🎬 SCENE PROMPT', result.formatted, colors.cyan);
    }
    results.push(result);
  }

  if (parsed.exportOptions) {
    Exporter.export(count === 1 ? results[0] : results, parsed.exportOptions);
  }
}

async function handleCharacterCommand(parsed: any) {
  const generator = new CharacterGenerator();
  const count = parsed.options.count || 1;

  if (count > 1) {
    console.log(`${colors.magenta}Generating ${count} characters...${colors.reset}\n`);
  }

  const results = [];
  for (let i = 0; i < count; i++) {
    const result = generator.generateWithHistory(parsed.options);
    if (count > 1) {
      printSection(`🎭 CHARACTER ${i + 1}`, result.formatted, colors.magenta);
    } else {
      printSection('🎭 CHARACTER', result.formatted, colors.magenta);
    }
    results.push(result);
  }

  if (parsed.exportOptions) {
    Exporter.export(count === 1 ? results[0] : results, parsed.exportOptions);
  }
}

async function handleScenarioCommand(parsed: any) {
  const generator = new ScenarioGenerator();
  const count = parsed.options.count || 1;

  if (count > 1) {
    console.log(`${colors.yellow}Generating ${count} scenarios...${colors.reset}\n`);
  }

  const results = [];
  for (let i = 0; i < count; i++) {
    const result = generator.generateWithHistory(parsed.options);
    if (count > 1) {
      printSection(`📖 SCENARIO ${i + 1}`, result.formatted, colors.yellow);
    } else {
      printSection('📖 SCENARIO', result.formatted, colors.yellow);
    }
    results.push(result);
  }

  if (parsed.exportOptions) {
    Exporter.export(count === 1 ? results[0] : results, parsed.exportOptions);
  }
}

async function handleComebackCommand(parsed: any, setup?: string) {
  const comeback = generateComeback(setup);
  if (setup) {
    printSection('💬 SETUP', `"${setup}"`, colors.green);
  }
  printSection('🔥 COMEBACK', comeback, colors.red);

  if (parsed.exportOptions) {
    Exporter.export({ setup, comeback, formatted: comeback }, parsed.exportOptions);
  }
}

async function handlePunchlineCommand(parsed: any, setup: string) {
  if (!setup) {
    console.log(`${colors.red}Error: Please provide a setup for the punchline${colors.reset}`);
    console.log(`Example: improv punchline "Why did the chicken cross the road?"`);
    return;
  }
  const punchline = generatePunchlineFor(setup);
  printSection('💬 SETUP', `"${setup}"`, colors.green);
  printSection('🎯 PUNCHLINE', punchline, colors.yellow);

  if (parsed.exportOptions) {
    Exporter.export({ setup, punchline, formatted: `Setup: ${setup}\n\nPunchline: ${punchline}` }, parsed.exportOptions);
  }
}

async function handleComboCommand(parsed: any) {
  const combo = new CombinationGenerator();
  const numChars = parsed.options.count || 2;

  console.log(`${colors.cyan}Generating complete improv setup with ${numChars} characters...${colors.reset}\n`);

  const result = combo.generateComplete(numChars, parsed.options);
  console.log(result.formatted);

  if (parsed.exportOptions) {
    Exporter.export(result, parsed.exportOptions);
  }
}

async function handleRandomCommand(parsed: any) {
  const generators = [
    { name: 'scene', fn: handleSceneCommand },
    { name: 'character', fn: handleCharacterCommand },
    { name: 'scenario', fn: handleScenarioCommand },
    { name: 'comeback', fn: (p: any) => handleComebackCommand(p) }
  ];

  const random = generators[Math.floor(Math.random() * generators.length)];
  console.log(`${colors.bright}${colors.cyan}✨ Random generator: ${random.name}${colors.reset}\n`);
  await random.fn(parsed);
}

async function handleAllCommand(parsed: any) {
  await handleSceneCommand(parsed);
  await handleCharacterCommand({ ...parsed, options: { ...parsed.options, count: 2 } });
  await handleScenarioCommand(parsed);
  await handleComebackCommand(parsed);
}

async function handleHistoryCommand() {
  const history = getHistory();

  if (history.length === 0) {
    console.log(`${colors.yellow}No history yet. Start generating some comedy!${colors.reset}`);
    return;
  }

  printSection('📜 GENERATION HISTORY', '', colors.blue);
  history.slice(-10).forEach((entry, i) => {
    console.log(`${colors.dim}${i + 1}. [${entry.type}] ${entry.timestamp.toLocaleTimeString()}${colors.reset}`);
    console.log(`   ${entry.content.substring(0, 100)}${entry.content.length > 100 ? '...' : ''}\n`);
  });
}

async function main() {
  try {
    const parsed = parseArgs(process.argv);

    // Load config
    const config = loadConfig();

    // Handle special flags
    if (parsed.flags.clearHistory) {
      clearHistory();
      console.log(`${colors.green}✓ History cleared${colors.reset}`);
      return;
    }

    if (parsed.flags.interactive) {
      await runInteractiveMode();
      return;
    }

    if (parsed.flags.history) {
      await handleHistoryCommand();
      return;
    }

    // If no command, show banner and help
    if (!parsed.command) {
      printBanner();
      printHelp();
      return;
    }

    if (parsed.flags.help) {
      printBanner();
      printHelp();
      return;
    }

    // Apply config defaults
    if (!parsed.options.noRepeat && config.history_enabled) {
      parsed.options.noRepeat = true;
    }

    // Execute command
    switch (parsed.command.toLowerCase()) {
      case 'scene':
      case 's':
        await handleSceneCommand(parsed);
        break;

      case 'character':
      case 'char':
      case 'c':
        await handleCharacterCommand(parsed);
        break;

      case 'scenario':
      case 'sc':
        await handleScenarioCommand(parsed);
        break;

      case 'comeback':
      case 'cb':
        const comebackSetup = parsed.args.join(' ') || undefined;
        await handleComebackCommand(parsed, comebackSetup);
        break;

      case 'punchline':
      case 'punch':
      case 'p':
        const punchlineSetup = parsed.args.join(' ');
        await handlePunchlineCommand(parsed, punchlineSetup);
        break;

      case 'combo':
      case 'combination':
        await handleComboCommand(parsed);
        break;

      case 'random':
      case 'r':
        await handleRandomCommand(parsed);
        break;

      case 'all':
      case 'a':
        await handleAllCommand(parsed);
        break;

      case 'history':
      case 'hist':
        await handleHistoryCommand();
        break;

      case 'help':
      case 'h':
        printBanner();
        printHelp();
        break;

      default:
        console.log(`${colors.red}Unknown command: ${parsed.command}${colors.reset}\n`);
        printHelp();
        break;
    }
  } catch (error: any) {
    console.error(`${colors.red}Error: ${error.message}${colors.reset}`);
    process.exit(1);
  }
}

main();
