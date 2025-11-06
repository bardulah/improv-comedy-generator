import { describe, it, expect, beforeEach } from '@jest/globals';
import {
  randomChoice,
  randomChoices,
  randomChoiceNoRepeat,
  randomChoiceWeighted,
  addToHistory,
  getHistory,
  clearHistory
} from '../../src/utils.js';

describe('Utils', () => {
  describe('randomChoice', () => {
    it('should return an item from the array', () => {
      const items = ['a', 'b', 'c'];
      const result = randomChoice(items);
      expect(items).toContain(result);
    });

    it('should throw error for empty array', () => {
      expect(() => randomChoice([])).toThrow('Cannot choose from empty array');
    });

    it('should handle single item array', () => {
      const result = randomChoice(['only']);
      expect(result).toBe('only');
    });
  });

  describe('randomChoices', () => {
    it('should return correct number of items', () => {
      const items = ['a', 'b', 'c', 'd', 'e'];
      const result = randomChoices(items, 3);
      expect(result).toHaveLength(3);
    });

    it('should return all items if count exceeds array length', () => {
      const items = ['a', 'b'];
      const result = randomChoices(items, 10);
      expect(result).toHaveLength(2);
    });

    it('should return unique items', () => {
      const items = ['a', 'b', 'c', 'd', 'e'];
      const result = randomChoices(items, 5);
      const unique = new Set(result);
      expect(unique.size).toBe(5);
    });
  });

  describe('randomChoiceNoRepeat', () => {
    beforeEach(() => {
      clearHistory();
    });

    it('should not repeat recently used items', () => {
      const items = ['a', 'b', 'c', 'd', 'e', 'f'];
      const results = new Set<string>();

      for (let i = 0; i < 5; i++) {
        const result = randomChoiceNoRepeat(items, 'test-category');
        results.add(result);
      }

      // Should have 5 different items
      expect(results.size).toBe(5);
    });

    it('should reset when all items exhausted', () => {
      const items = ['a', 'b'];

      // Use both items
      randomChoiceNoRepeat(items, 'test-small');
      randomChoiceNoRepeat(items, 'test-small');

      // Should still work (reset and allow repeats)
      const result = randomChoiceNoRepeat(items, 'test-small');
      expect(items).toContain(result);
    });

    it('should work with different categories independently', () => {
      const items = ['a', 'b', 'c'];

      const result1 = randomChoiceNoRepeat(items, 'category1');
      const result2 = randomChoiceNoRepeat(items, 'category2');

      // Both should work fine
      expect(items).toContain(result1);
      expect(items).toContain(result2);
    });
  });

  describe('randomChoiceWeighted', () => {
    it('should return an item from the array', () => {
      const items = ['a', 'b', 'c'];
      const weights = [1, 1, 1];
      const result = randomChoiceWeighted(items, weights);
      expect(items).toContain(result);
    });

    it('should throw error for mismatched lengths', () => {
      expect(() => randomChoiceWeighted(['a', 'b'], [1])).toThrow(
        'Items and weights must have same length'
      );
    });

    it('should favor higher weighted items', () => {
      const items = ['a', 'b'];
      const weights = [100, 1]; // 'a' is much more likely

      const results: string[] = [];
      for (let i = 0; i < 50; i++) {
        results.push(randomChoiceWeighted(items, weights));
      }

      const aCount = results.filter(r => r === 'a').length;
      // With 100:1 odds, we expect at least 40 'a's out of 50
      expect(aCount).toBeGreaterThan(40);
    });
  });

  describe('History', () => {
    beforeEach(() => {
      clearHistory();
    });

    it('should add entries to history', () => {
      addToHistory('test', 'content1');
      addToHistory('test', 'content2');

      const history = getHistory();
      expect(history).toHaveLength(2);
      expect(history[0].content).toBe('content1');
      expect(history[1].content).toBe('content2');
    });

    it('should filter history by type', () => {
      addToHistory('type1', 'content1');
      addToHistory('type2', 'content2');
      addToHistory('type1', 'content3');

      const filtered = getHistory('type1');
      expect(filtered).toHaveLength(2);
      expect(filtered.every(entry => entry.type === 'type1')).toBe(true);
    });

    it('should clear history', () => {
      addToHistory('test', 'content');
      clearHistory();

      const history = getHistory();
      expect(history).toHaveLength(0);
    });

    it('should limit history to 100 entries', () => {
      for (let i = 0; i < 150; i++) {
        addToHistory('test', `content${i}`);
      }

      const history = getHistory();
      expect(history).toHaveLength(100);
      // Should keep the most recent ones
      expect(history[history.length - 1].content).toBe('content149');
    });

    it('should include timestamp in history entries', () => {
      addToHistory('test', 'content');
      const history = getHistory();

      expect(history[0].timestamp).toBeInstanceOf(Date);
    });
  });
});
