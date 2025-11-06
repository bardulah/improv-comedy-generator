#!/usr/bin/env node

import chalk from 'chalk';
import { ScenePromptGenerator } from './generators/scenePrompt.js';
import { CharacterGenerator } from './generators/character.js';
import { ScenarioGenerator } from './generators/scenario.js';
import { generateComeback, generatePunchlineFor } from './generators/comeback.js';
import { parseArgs, ParsedArgs } from './cli-parser.js';
import { Exporter } from './exporter.js';
import { runInteractiveMode } from './interactive.js';
import { CombinationGenerator } from './combination.js';
import { getHistory, clearHistory } from './utils.js';
import { loadConfig } from './config.js';
import { printBanner, printSection, printSuccess, printError, printInfo } from './formatter.js';

function printHelp(): void {
  console.log(`${chalk.bold('Usage:')}
  improv [command] [options]

${chalk.bold('Commands:')}
  ${chalk.green('scene')}              Generate an absurd scene prompt
  ${chalk.green('character')}          Generate a quirky character description
  ${chalk.green('scenario')}           Generate a full comedic scenario
  ${chalk.green('comeback [setup]')}   Generate a comeback line (optional setup)
  ${chalk.green('punchline <setup>')}  Generate a punchline for your setup
  ${chalk.green('combo')}              Generate a combination (scene + characters)
  ${chalk.green('random')}             Generate a random comedy element
  ${chalk.green('all')}                Generate everything at once
  ${chalk.green('history')}            Show generation history
  ${chalk.green('help')}               Show this help message

${chalk.bold('Options:')}
  ${chalk.cyan('--count, -c <n>')}     Generate multiple items (1-100)
  ${chalk.cyan('--no-repeat')}         Avoid recently used items
  ${chalk.cyan('--save, -s <file>')}   Save output to file
  ${chalk.cyan('--json, -j')}          Output as JSON
  ${chalk.cyan('--minimal')}           Minimal text output
  ${chalk.cyan('--interactive, -i')}   Interactive mode
  ${chalk.cyan('--theme <name>')}      Filter by theme
  ${chalk.cyan('--clear-history')}     Clear generation history

${chalk.bold('Examples:')}
  improv scene --count 3
  improv character --no-repeat
  improv combo
  improv scene --save scene.txt
  improv all --json
  improv --interactive
  improv history
`);
}

async function handleSceneCommand(parsed: ParsedArgs): Promise<void> {
  const generator = new ScenePromptGenerator();
  const count = parsed.options.count || 1;

  if (count > 1) {
    printInfo(`Generating ${count} scene prompts...\n`);
  }

  const results = [];
  for (let i = 0; i < count; i++) {
    const result = generator.generateWithHistory(parsed.options);
    if (count > 1) {
      printSection(`🎬 SCENE ${i + 1}`, result.formatted, chalk.cyan);
    } else {
      printSection('🎬 SCENE PROMPT', result.formatted, chalk.cyan);
    }
    results.push(result);
  }

  if (parsed.exportOptions) {
    Exporter.export(count === 1 ? results[0] : results, parsed.exportOptions);
  }
}

async function handleCharacterCommand(parsed: ParsedArgs): Promise<void> {
  const generator = new CharacterGenerator();
  const count = parsed.options.count || 1;

  if (count > 1) {
    console.log(chalk.magenta(`Generating ${count} characters...\n`));
  }

  const results = [];
  for (let i = 0; i < count; i++) {
    const result = generator.generateWithHistory(parsed.options);
    if (count > 1) {
      printSection(`🎭 CHARACTER ${i + 1}`, result.formatted, chalk.magenta);
    } else {
      printSection('🎭 CHARACTER', result.formatted, chalk.magenta);
    }
    results.push(result);
  }

  if (parsed.exportOptions) {
    Exporter.export(count === 1 ? results[0] : results, parsed.exportOptions);
  }
}

async function handleScenarioCommand(parsed: ParsedArgs): Promise<void> {
  const generator = new ScenarioGenerator();
  const count = parsed.options.count || 1;

  if (count > 1) {
    console.log(chalk.yellow(`Generating ${count} scenarios...\n`));
  }

  const results = [];
  for (let i = 0; i < count; i++) {
    const result = generator.generateWithHistory(parsed.options);
    if (count > 1) {
      printSection(`📖 SCENARIO ${i + 1}`, result.formatted, chalk.yellow);
    } else {
      printSection('📖 SCENARIO', result.formatted, chalk.yellow);
    }
    results.push(result);
  }

  if (parsed.exportOptions) {
    Exporter.export(count === 1 ? results[0] : results, parsed.exportOptions);
  }
}

async function handleComebackCommand(parsed: ParsedArgs, setup?: string): Promise<void> {
  const comeback = generateComeback(setup);
  if (setup) {
    printSection('💬 SETUP', `"${setup}"`, chalk.green);
  }
  printSection('🔥 COMEBACK', comeback, chalk.red);

  if (parsed.exportOptions) {
    Exporter.export({ setup, comeback, formatted: comeback }, parsed.exportOptions);
  }
}

async function handlePunchlineCommand(parsed: ParsedArgs, setup: string): Promise<void> {
  if (!setup) {
    printError('Please provide a setup for the punchline');
    console.log(`Example: improv punchline "Why did the chicken cross the road?"`);
    return;
  }
  const punchline = generatePunchlineFor(setup);
  printSection('💬 SETUP', `"${setup}"`, chalk.green);
  printSection('🎯 PUNCHLINE', punchline, chalk.yellow);

  if (parsed.exportOptions) {
    Exporter.export({ setup, punchline, formatted: `Setup: ${setup}\n\nPunchline: ${punchline}` }, parsed.exportOptions);
  }
}

async function handleComboCommand(parsed: ParsedArgs): Promise<void> {
  const combo = new CombinationGenerator();
  const numChars = parsed.options.count || 2;

  printInfo(`Generating complete improv setup with ${numChars} characters...\n`);

  const result = combo.generateComplete(numChars, parsed.options);
  console.log(result.formatted);

  if (parsed.exportOptions) {
    Exporter.export(result, parsed.exportOptions);
  }
}

async function handleRandomCommand(parsed: ParsedArgs): Promise<void> {
  const generators = [
    { name: 'scene', fn: handleSceneCommand },
    { name: 'character', fn: handleCharacterCommand },
    { name: 'scenario', fn: handleScenarioCommand },
    { name: 'comeback', fn: (p: ParsedArgs) => handleComebackCommand(p) }
  ];

  const random = generators[Math.floor(Math.random() * generators.length)];
  console.log(chalk.bold.cyan(`✨ Random generator: ${random.name}\n`));
  await random.fn(parsed);
}

async function handleAllCommand(parsed: ParsedArgs): Promise<void> {
  await handleSceneCommand(parsed);
  await handleCharacterCommand({ ...parsed, options: { ...parsed.options, count: 2 } });
  await handleScenarioCommand(parsed);
  await handleComebackCommand(parsed);
}

async function handleHistoryCommand(): Promise<void> {
  const history = getHistory();

  if (history.length === 0) {
    console.log(chalk.yellow('No history yet. Start generating some comedy!'));
    return;
  }

  printSection('📜 GENERATION HISTORY', '', chalk.blue);
  history.slice(-10).forEach((entry, i) => {
    console.log(chalk.dim(`${i + 1}. [${entry.type}] ${entry.timestamp.toLocaleTimeString()}`));
    console.log(`   ${entry.content.substring(0, 100)}${entry.content.length > 100 ? '...' : ''}\n`);
  });
}

async function main(): Promise<void> {
  try {
    const parsed = parseArgs(process.argv);

    // Load config
    const config = loadConfig();

    // Handle special flags
    if (parsed.flags.clearHistory) {
      clearHistory();
      printSuccess('History cleared');
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
        printError(`Unknown command: ${parsed.command}`);
        console.log();
        printHelp();
        break;
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    printError(message);
    process.exit(1);
  }
}

main();
