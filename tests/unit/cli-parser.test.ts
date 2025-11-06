import { describe, it, expect } from '@jest/globals';
import { parseArgs } from '../../src/cli-parser.js';

describe('CLI Parser', () => {
  describe('parseArgs', () => {
    it('should parse basic command', () => {
      const argv = ['node', 'index.js', 'scene'];
      const parsed = parseArgs(argv);

      expect(parsed.command).toBe('scene');
      expect(parsed.args).toEqual([]);
    });

    it('should parse command with arguments', () => {
      const argv = ['node', 'index.js', 'punchline', 'Why', 'did', 'the', 'chicken'];
      const parsed = parseArgs(argv);

      expect(parsed.command).toBe('punchline');
      expect(parsed.args).toEqual(['Why', 'did', 'the', 'chicken']);
    });

    it('should parse --count flag', () => {
      const argv = ['node', 'index.js', 'scene', '--count', '5'];
      const parsed = parseArgs(argv);

      expect(parsed.options.count).toBe(5);
    });

    it('should parse -c short flag', () => {
      const argv = ['node', 'index.js', 'scene', '-c', '3'];
      const parsed = parseArgs(argv);

      expect(parsed.options.count).toBe(3);
    });

    it('should parse --no-repeat flag', () => {
      const argv = ['node', 'index.js', 'scene', '--no-repeat'];
      const parsed = parseArgs(argv);

      expect(parsed.flags.noRepeat).toBe(true);
      expect(parsed.options.noRepeat).toBe(true);
    });

    it('should parse --save flag', () => {
      const argv = ['node', 'index.js', 'scene', '--save', 'output.txt'];
      const parsed = parseArgs(argv);

      expect(parsed.flags.save).toBe('output.txt');
      expect(parsed.exportOptions).toBeDefined();
      expect(parsed.exportOptions?.filePath).toBe('output.txt');
    });

    it('should parse --json flag', () => {
      const argv = ['node', 'index.js', 'scene', '--json'];
      const parsed = parseArgs(argv);

      expect(parsed.flags.json).toBe(true);
      expect(parsed.exportOptions?.format).toBe('json');
    });

    it('should parse --minimal flag', () => {
      const argv = ['node', 'index.js', 'scene', '--minimal'];
      const parsed = parseArgs(argv);

      expect(parsed.flags.minimal).toBe(true);
      expect(parsed.exportOptions?.format).toBe('minimal');
    });

    it('should parse --help flag', () => {
      const argv = ['node', 'index.js', '--help'];
      const parsed = parseArgs(argv);

      expect(parsed.flags.help).toBe(true);
    });

    it('should parse -h short flag', () => {
      const argv = ['node', 'index.js', '-h'];
      const parsed = parseArgs(argv);

      expect(parsed.flags.help).toBe(true);
    });

    it('should parse --interactive flag', () => {
      const argv = ['node', 'index.js', '--interactive'];
      const parsed = parseArgs(argv);

      expect(parsed.flags.interactive).toBe(true);
    });

    it('should parse --clear-history flag', () => {
      const argv = ['node', 'index.js', '--clear-history'];
      const parsed = parseArgs(argv);

      expect(parsed.flags.clearHistory).toBe(true);
    });

    it('should parse --theme flag', () => {
      const argv = ['node', 'index.js', 'scene', '--theme', 'workplace'];
      const parsed = parseArgs(argv);

      expect(parsed.options.theme).toBe('workplace');
    });

    it('should handle multiple flags', () => {
      const argv = ['node', 'index.js', 'scene', '--count', '3', '--no-repeat', '--json'];
      const parsed = parseArgs(argv);

      expect(parsed.command).toBe('scene');
      expect(parsed.options.count).toBe(3);
      expect(parsed.flags.noRepeat).toBe(true);
      expect(parsed.flags.json).toBe(true);
    });

    it('should handle no command', () => {
      const argv = ['node', 'index.js'];
      const parsed = parseArgs(argv);

      expect(parsed.command).toBe('');
      expect(parsed.args).toEqual([]);
    });
  });
});
