import { BaseGenerator } from './BaseGenerator.js';
import { Scenario, GeneratorOptions, GeneratorResult } from '../types.js';
import { randomChoice } from '../utils.js';

export class ScenarioGenerator extends BaseGenerator<Scenario> {
  generate(options?: GeneratorOptions): GeneratorResult<Scenario> {
    const noRepeat = options?.noRepeat ?? false;

    const opening = this.getRandomItem('scenario-openings.json', noRepeat);
    const protagonist = this.getRandomItem('scenario-protagonists.json', noRepeat);
    const discovery = this.getRandomItem('scenario-discoveries.json', noRepeat);
    const complication = this.getRandomItem('scenario-complications.json', noRepeat);
    const helper = this.getRandomItem('scenario-helpers.json', noRepeat);
    const twist = this.getRandomItem('scenario-twists.json', noRepeat);

    const data: Scenario = {
      opening,
      protagonist,
      discovery,
      complication,
      helper,
      twist,
      formatted: this.format({ opening, protagonist, discovery, complication, helper, twist, formatted: '' })
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

  format(data: Scenario): string {
    // Check if complication needs helper integrated
    const needsHelper = data.complication.includes('chased by') ||
                       data.complication.includes('help was');

    let scenario: string;
    if (needsHelper) {
      // Integrate helper into complication
      scenario = `${data.opening} ${data.protagonist} ${data.discovery}, ${data.complication} ${data.helper}.`;
    } else {
      // Helper comes later
      scenario = `${data.opening} ${data.protagonist} ${data.discovery}, ${data.complication}. The only one who could help them was ${data.helper}.`;
    }

    return `${scenario}

${data.twist}

Now improvise this scene!`;
  }

  getType(): string {
    return 'scenario';
  }
}

// Legacy function for backward compatibility
export function generateScenario(): string {
  const generator = new ScenarioGenerator();
  return generator.generate().formatted;
}
