import { BaseGenerator } from './BaseGenerator.js';
import { Character, GeneratorOptions, GeneratorResult } from '../types.js';

export class CharacterGenerator extends BaseGenerator<Character> {
  generate(options?: GeneratorOptions): GeneratorResult<Character> {
    const noRepeat = options?.noRepeat ?? false;

    const profession = this.getRandomItem('professions.json', noRepeat);
    const personality = this.getRandomItem('personalities.json', noRepeat);
    const quirk = this.getRandomItem('quirks.json', noRepeat);
    const secret = this.getRandomItem('secrets.json', noRepeat);

    const data: Character = {
      profession,
      personality,
      quirk,
      secret,
      formatted: this.format({ profession, personality, quirk, secret, formatted: '' })
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

  format(data: Character): string {
    return `You are ${data.profession}. You are ${data.personality} and ${data.quirk}. Secret: ${data.secret}`;
  }

  getType(): string {
    return 'character';
  }
}

// Legacy function for backward compatibility
export function generateCharacter(): string {
  const generator = new CharacterGenerator();
  return generator.generate().formatted;
}
