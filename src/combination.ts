/**
 * Combination generator - mix multiple generators
 */

import { ScenePromptGenerator } from './generators/scenePrompt.js';
import { CharacterGenerator } from './generators/character.js';
import { ScenarioGenerator } from './generators/scenario.js';
import { GeneratorOptions } from './types.js';

export interface CombinedResult {
  scene?: any;
  characters: any[];
  scenario?: any;
  formatted: string;
}

export class CombinationGenerator {
  private sceneGen = new ScenePromptGenerator();
  private charGen = new CharacterGenerator();
  private scenarioGen = new ScenarioGenerator();

  /**
   * Generate a complete improv setup with scene, characters, and scenario
   */
  generateComplete(numCharacters: number = 2, options?: GeneratorOptions): CombinedResult {
    const scene = this.sceneGen.generate(options);
    const characters: any[] = [];

    for (let i = 0; i < numCharacters; i++) {
      characters.push(this.charGen.generate(options));
    }

    const scenario = this.scenarioGen.generate(options);

    const formatted = this.formatCombination(scene, characters, scenario);

    return {
      scene: scene.data,
      characters: characters.map(c => c.data),
      scenario: scenario.data,
      formatted
    };
  }

  /**
   * Generate scene with characters
   */
  generateSceneWithCharacters(numCharacters: number = 2, options?: GeneratorOptions): CombinedResult {
    const scene = this.sceneGen.generate(options);
    const characters: any[] = [];

    for (let i = 0; i < numCharacters; i++) {
      characters.push(this.charGen.generate(options));
    }

    const formatted = `🎬 SCENE
${'='.repeat(50)}
${scene.formatted}

🎭 CHARACTERS
${'='.repeat(50)}
${characters.map((c, i) => `Character ${i + 1}: ${c.formatted}`).join('\n\n')}
`;

    return {
      scene: scene.data,
      characters: characters.map(c => c.data),
      formatted
    };
  }

  /**
   * Generate characters for a scenario
   */
  generateCharactersForScenario(numCharacters: number = 2, options?: GeneratorOptions): CombinedResult {
    const characters: any[] = [];

    for (let i = 0; i < numCharacters; i++) {
      characters.push(this.charGen.generate(options));
    }

    const scenario = this.scenarioGen.generate(options);

    const formatted = `🎭 CHARACTERS
${'='.repeat(50)}
${characters.map((c, i) => `Character ${i + 1}: ${c.formatted}`).join('\n\n')}

📖 SCENARIO
${'='.repeat(50)}
${scenario.formatted}
`;

    return {
      characters: characters.map(c => c.data),
      scenario: scenario.data,
      formatted
    };
  }

  private formatCombination(scene: any, characters: any[], scenario: any): string {
    return `🎬 SCENE
${'='.repeat(50)}
${scene.formatted}

🎭 CHARACTERS
${'='.repeat(50)}
${characters.map((c, i) => `Character ${i + 1}: ${c.formatted}`).join('\n\n')}

📖 SCENARIO
${'='.repeat(50)}
${scenario.formatted}
`;
  }
}
