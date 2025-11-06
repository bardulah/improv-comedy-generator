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
  // Static cache shared across all instances for better performance
  private static dataCache: Map<string, any[]> = new Map();

  /**
   * Load data from JSON file with proper error handling
   */
  protected loadData(filename: string): any[] {
    // Check cache first
    if (BaseGenerator.dataCache.has(filename)) {
      return BaseGenerator.dataCache.get(filename)!;
    }

    const filePath = path.join(__dirname, '..', 'data', filename);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      throw new Error(
        `Data file not found: ${filename}\n` +
        `Expected location: ${filePath}\n` +
        `Please ensure you've run 'npm run build' to compile the project.`
      );
    }

    try {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(fileContent);

      if (!Array.isArray(data)) {
        throw new Error(`Data file ${filename} must contain an array`);
      }

      if (data.length === 0) {
        throw new Error(`Data file ${filename} is empty`);
      }

      BaseGenerator.dataCache.set(filename, data);
      return data;
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new Error(`Invalid JSON in ${filename}: ${error.message}`);
      }
      throw error;
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
