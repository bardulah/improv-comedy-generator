/**
 * Utility functions for random selection with history tracking
 */

import { HistoryEntry } from './types.js';

// History tracking
const history: HistoryEntry[] = [];
const recentChoices = new Map<string, Set<string>>();
const MAX_RECENT_CHOICES = 5;

/**
 * Get a random choice from an array
 */
export function randomChoice<T>(array: T[]): T {
  if (array.length === 0) throw new Error('Cannot choose from empty array');
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Get multiple random choices from an array using Fisher-Yates shuffle
 * More efficient than sort-based shuffling: O(n) instead of O(n log n)
 */
export function randomChoices<T>(array: T[], count: number): T[] {
  if (count > array.length) count = array.length;
  if (count === 0) return [];

  const result: T[] = [];
  const indices = new Set<number>();

  // For small selections, use random sampling without shuffle
  if (count <= array.length / 2) {
    while (result.length < count) {
      const index = Math.floor(Math.random() * array.length);
      if (!indices.has(index)) {
        indices.add(index);
        result.push(array[index]);
      }
    }
    return result;
  }

  // For large selections, use Fisher-Yates shuffle
  const shuffled = [...array];
  for (let i = 0; i < count; i++) {
    const j = i + Math.floor(Math.random() * (shuffled.length - i));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
}

/**
 * Get a random choice that hasn't been used recently
 */
export function randomChoiceNoRepeat<T>(array: T[], category: string): T {
  if (array.length === 0) throw new Error('Cannot choose from empty array');

  const recent = recentChoices.get(category) || new Set<string>();
  const available = array.filter(item => !recent.has(String(item)));

  // If all items have been used, reset
  if (available.length === 0) {
    recentChoices.delete(category);
    return randomChoice(array);
  }

  const choice = randomChoice(available);

  // Track this choice
  recent.add(String(choice));
  if (recent.size > MAX_RECENT_CHOICES) {
    const first = recent.values().next().value;
    if (first) recent.delete(first);
  }
  recentChoices.set(category, recent);

  return choice;
}

/**
 * Weighted random choice
 */
export function randomChoiceWeighted<T>(items: T[], weights: number[]): T {
  if (items.length !== weights.length) {
    throw new Error('Items and weights must have same length');
  }

  const totalWeight = weights.reduce((sum, w) => sum + w, 0);
  let random = Math.random() * totalWeight;

  for (let i = 0; i < items.length; i++) {
    random -= weights[i];
    if (random <= 0) return items[i];
  }

  return items[items.length - 1];
}

/**
 * Add an entry to history
 */
export function addToHistory(type: string, content: string): void {
  history.push({
    type,
    content,
    timestamp: new Date()
  });

  // Keep history limited
  if (history.length > 100) {
    history.shift();
  }
}

/**
 * Get history entries
 */
export function getHistory(type?: string): HistoryEntry[] {
  if (type) {
    return history.filter(entry => entry.type === type);
  }
  return [...history];
}

/**
 * Clear history
 */
export function clearHistory(): void {
  history.length = 0;
  recentChoices.clear();
}
