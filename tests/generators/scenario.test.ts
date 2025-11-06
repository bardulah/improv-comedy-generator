import { describe, it, expect } from '@jest/globals';
import { ScenarioGenerator } from '../../src/generators/scenario.js';

describe('ScenarioGenerator', () => {
  const generator = new ScenarioGenerator();

  describe('generate', () => {
    it('should generate a complete scenario', () => {
      const result = generator.generate();

      expect(result.data).toBeDefined();
      expect(result.data.opening).toBeDefined();
      expect(result.data.protagonist).toBeDefined();
      expect(result.data.discovery).toBeDefined();
      expect(result.data.complication).toBeDefined();
      expect(result.data.helper).toBeDefined();
      expect(result.data.twist).toBeDefined();
      expect(result.formatted).toBeDefined();
    });

    it('should format scenario with proper grammar', () => {
      const result = generator.generate();
      const formatted = result.formatted;

      expect(formatted).toContain(result.data.opening);
      expect(formatted).toContain(result.data.protagonist);
      expect(formatted).toContain(result.data.discovery);
      expect(formatted).toContain(result.data.twist);
      expect(formatted).toContain('Now improvise this scene!');
    });

    it('should integrate helper correctly when needed', () => {
      // Mock data to test helper integration
      const result = generator.generate();
      const formatted = result.formatted;

      // Helper should appear in the text
      expect(formatted).toContain(result.data.helper);
    });

    it('should include metadata', () => {
      const result = generator.generate();

      expect(result.metadata).toBeDefined();
      expect(result.metadata?.generatedAt).toBeInstanceOf(Date);
    });

    it('should respect noRepeat option', () => {
      const openings = new Set<string>();

      for (let i = 0; i < 5; i++) {
        const result = generator.generate({ noRepeat: true });
        openings.add(result.data.opening);
      }

      // Should have at least 3 different openings
      expect(openings.size).toBeGreaterThanOrEqual(3);
    });
  });

  describe('getType', () => {
    it('should return correct type', () => {
      expect(generator.getType()).toBe('scenario');
    });
  });
});
