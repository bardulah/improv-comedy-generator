import { BaseGenerator } from './BaseGenerator.js';
import { ScenePrompt, GeneratorOptions, GeneratorResult } from '../types.js';

export class ScenePromptGenerator extends BaseGenerator<ScenePrompt> {
  generate(options?: GeneratorOptions): GeneratorResult<ScenePrompt> {
    const noRepeat = options?.noRepeat ?? false;

    const location = this.getRandomItem('locations.json', noRepeat);
    const situation = this.getRandomItem('situations.json', noRepeat);
    const objective = this.getRandomItem('objectives.json', noRepeat);

    const data: ScenePrompt = {
      location,
      situation,
      objective,
      formatted: this.format({ location, situation, objective, formatted: '' })
    };

    return {
      data,
      formatted: data.formatted,
      metadata: {
        generatedAt: new Date(),
        options: options || {}
      }
    };
  }

  format(data: ScenePrompt): string {
    return `You are in ${data.location}, ${data.situation}. Your goal is to ${data.objective}.`;
  }

  getType(): string {
    return 'scene';
  }
}

// Legacy function for backward compatibility
export function generateScenePrompt(): string {
  const generator = new ScenePromptGenerator();
  return generator.generate().formatted;
}
