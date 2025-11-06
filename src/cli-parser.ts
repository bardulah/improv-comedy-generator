/**
 * CLI argument parser
 */

import { GeneratorOptions, OutputFormat, ExportOptions } from './types.js';

export interface ParsedArgs {
  command: string;
  args: string[];
  options: GeneratorOptions;
  exportOptions?: ExportOptions;
  flags: {
    help: boolean;
    interactive: boolean;
    noRepeat: boolean;
    save?: string;
    json: boolean;
    minimal: boolean;
    history: boolean;
    clearHistory: boolean;
  };
}

export function parseArgs(argv: string[]): ParsedArgs {
  const args = argv.slice(2);
  const parsed: ParsedArgs = {
    command: '',
    args: [],
    options: {},
    flags: {
      help: false,
      interactive: false,
      noRepeat: false,
      json: false,
      minimal: false,
      history: false,
      clearHistory: false
    }
  };

  let i = 0;
  while (i < args.length) {
    const arg = args[i];

    if (arg.startsWith('--')) {
      // Long flags
      const flag = arg.slice(2);
      switch (flag) {
        case 'help':
          parsed.flags.help = true;
          break;
        case 'interactive':
        case 'i':
          parsed.flags.interactive = true;
          break;
        case 'no-repeat':
          parsed.flags.noRepeat = true;
          parsed.options.noRepeat = true;
          break;
        case 'count': {
          const countValue = args[++i];
          if (!countValue) {
            throw new Error('--count requires a value');
          }
          const count = parseInt(countValue, 10);
          if (isNaN(count) || count < 1 || count > 100) {
            throw new Error('--count must be a number between 1 and 100');
          }
          parsed.options.count = count;
          break;
        }
        case 'theme': {
          const theme = args[++i];
          if (!theme) {
            throw new Error('--theme requires a value');
          }
          parsed.options.theme = theme;
          break;
        }
        case 'difficulty': {
          const diffValue = args[++i];
          if (!diffValue) {
            throw new Error('--difficulty requires a value');
          }
          const difficulty = parseInt(diffValue, 10);
          if (isNaN(difficulty) || difficulty < 1 || difficulty > 10) {
            throw new Error('--difficulty must be a number between 1 and 10');
          }
          parsed.options.difficulty = difficulty;
          break;
        }
        case 'save': {
          const savePath = args[++i];
          if (!savePath) {
            throw new Error('--save requires a file path');
          }
          parsed.flags.save = savePath;
          break;
        }
        case 'json':
          parsed.flags.json = true;
          break;
        case 'minimal':
          parsed.flags.minimal = true;
          break;
        case 'history':
          parsed.flags.history = true;
          break;
        case 'clear-history':
          parsed.flags.clearHistory = true;
          break;
      }
    } else if (arg.startsWith('-') && arg.length === 2) {
      // Short flags
      const flag = arg[1];
      switch (flag) {
        case 'h':
          parsed.flags.help = true;
          break;
        case 'i':
          parsed.flags.interactive = true;
          break;
        case 'c': {
          const countValue = args[++i];
          if (!countValue) {
            throw new Error('-c requires a value');
          }
          const count = parseInt(countValue, 10);
          if (isNaN(count) || count < 1 || count > 100) {
            throw new Error('-c must be a number between 1 and 100');
          }
          parsed.options.count = count;
          break;
        }
        case 's': {
          const savePath = args[++i];
          if (!savePath) {
            throw new Error('-s requires a file path');
          }
          parsed.flags.save = savePath;
          break;
        }
        case 'j':
          parsed.flags.json = true;
          break;
      }
    } else {
      // Command or argument
      if (!parsed.command) {
        parsed.command = arg;
      } else {
        parsed.args.push(arg);
      }
    }

    i++;
  }

  // Set up export options if needed
  if (parsed.flags.save || parsed.flags.json || parsed.flags.minimal) {
    let format: OutputFormat = 'text';
    if (parsed.flags.json) format = 'json';
    else if (parsed.flags.minimal) format = 'minimal';

    parsed.exportOptions = {
      format,
      filePath: parsed.flags.save,
      includeMetadata: parsed.flags.json
    };
  }

  return parsed;
}
