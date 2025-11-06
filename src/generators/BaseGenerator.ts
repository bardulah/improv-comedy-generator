/**
 * Base generator class for all comedy generators
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { GeneratorOptions, GeneratorResult } from '../types.js';
import { randomChoice, randomChoiceNoRepeat, addToHistory } from '../utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export abstract class BaseGenerator<T> {
  protected dataCache: Map<string, any[]> = new Map();

  /**
   * Load data from JSON file
   */
  protected loadData(filename: string): any[] {
    // Check cache first
    if (this.dataCache.has(filename)) {
      return this.dataCache.get(filename)!;
    }

    try {
      const filePath = path.join(__dirname, '..', 'data', filename);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      this.dataCache.set(filename, data);
      return data;
    } catch (error) {
      console.error(`Error loading ${filename}:`, error);
      return [];
    }
  }

  /**
   * Get a random item from a data file
   */
  protected getRandomItem(filename: string, noRepeat = false): string {
    const data = this.loadData(filename);
    if (data.length === 0) {
      throw new Error(`No data available in ${filename}`);
    }

    if (noRepeat) {
      return randomChoiceNoRepeat(data, filename);
    }
    return randomChoice(data);
  }

  /**
   * Generate the comedy content
   */
  abstract generate(options?: GeneratorOptions): GeneratorResult<T>;

  /**
   * Format the result for display
   */
  abstract format(data: T): string;

  /**
   * Get the generator type name
   */
  abstract getType(): string;

  /**
   * Generate and save to history
   */
  generateWithHistory(options?: GeneratorOptions): GeneratorResult<T> {
    const result = this.generate(options);
    addToHistory(this.getType(), result.formatted);
    return result;
  }

  /**
   * Generate multiple results
   */
  generateMultiple(count: number, options?: GeneratorOptions): GeneratorResult<T>[] {
    const results: GeneratorResult<T>[] = [];
    for (let i = 0; i < count; i++) {
      results.push(this.generate(options));
    }
    return results;
  }
}
