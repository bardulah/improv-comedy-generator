import { describe, it, expect } from '@jest/globals';
import { CharacterGenerator } from '../../src/generators/character.js';

describe('CharacterGenerator', () => {
  const generator = new CharacterGenerator();

  describe('generate', () => {
    it('should generate a complete character', () => {
      const result = generator.generate();

      expect(result.data).toBeDefined();
      expect(result.data.profession).toBeDefined();
      expect(result.data.personality).toBeDefined();
      expect(result.data.quirk).toBeDefined();
      expect(result.data.secret).toBeDefined();
      expect(result.formatted).toBeDefined();
    });

    it('should include metadata', () => {
      const result = generator.generate();

      expect(result.metadata).toBeDefined();
      expect(result.metadata?.generatedAt).toBeInstanceOf(Date);
      expect(result.metadata?.options).toBeDefined();
    });

    it('should respect noRepeat option', () => {
      const results = new Set<string>();

      for (let i = 0; i < 5; i++) {
        const result = generator.generate({ noRepeat: true });
        results.add(result.data.profession);
      }

      // Should have at least 3 different professions
      expect(results.size).toBeGreaterThanOrEqual(3);
    });

    it('should format character correctly', () => {
      const result = generator.generate();
      const formatted = result.formatted;

      expect(formatted).toContain('You are');
      expect(formatted).toContain(result.data.profession);
      expect(formatted).toContain(result.data.personality);
      expect(formatted).toContain(result.data.quirk);
      expect(formatted).toContain('Secret:');
      expect(formatted).toContain(result.data.secret);
    });
  });

  describe('generateMultiple', () => {
    it('should generate multiple characters', () => {
      const results = generator.generateMultiple(3);

      expect(results).toHaveLength(3);
      results.forEach(result => {
        expect(result.data.profession).toBeDefined();
        expect(result.formatted).toBeDefined();
      });
    });
  });

  describe('getType', () => {
    it('should return correct type', () => {
      expect(generator.getType()).toBe('character');
    });
  });
});
