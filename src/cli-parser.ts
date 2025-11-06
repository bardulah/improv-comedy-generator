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
        case 'count':
          parsed.options.count = parseInt(args[++i] || '1', 10);
          break;
        case 'theme':
          parsed.options.theme = args[++i];
          break;
        case 'difficulty':
          parsed.options.difficulty = parseInt(args[++i] || '5', 10);
          break;
        case 'save':
          parsed.flags.save = args[++i];
          break;
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
        case 'c':
          parsed.options.count = parseInt(args[++i] || '1', 10);
          break;
        case 's':
          parsed.flags.save = args[++i];
          break;
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
