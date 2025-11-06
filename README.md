# 🎭 Improv Comedy Generator

AI-powered improv comedy generator: creates absurd scenes, quirky characters, and hilarious scenarios for playful performances!

## ✨ Features

### Core Generators
- **Scene Prompts**: Generate absurd scene prompts with random locations, situations, and objectives
- **Character Generator**: Create quirky characters with unique professions, personalities, and secrets
- **Scenario Builder**: Generate full comedic scenarios with plot twists and complications
- **Comeback Generator**: Get witty comebacks and roasts (with optional user-provided setups)
- **Punchline Generator**: Create punchlines for your joke setups
- **Combination Generator**: Mix scenes, characters, and scenarios for complete improv setups

### Advanced Features
- 🔄 **No-Repeat Mode**: Avoid recently used content for fresher results
- 📊 **Batch Generation**: Generate multiple items at once with `--count`
- 💾 **Export Options**: Save to file, output as JSON or minimal text
- 🎮 **Interactive Mode**: Step-by-step guided comedy generation
- 📜 **History Tracking**: Review your generation history
- ⚙️ **Configuration File**: Customize defaults via `.improvrc`
- 🎨 **Modular Architecture**: Data separated from logic for easy customization

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/improv-comedy-generator.git
cd improv-comedy-generator

# Install dependencies
npm install

# Build the project
npm run build
```

## 📖 Usage

### Basic Commands

```bash
npm run dev [command] [options]
```

#### Available Commands

| Command | Alias | Description |
|---------|-------|-------------|
| `scene` | `s` | Generate an absurd scene prompt |
| `character` | `char`, `c` | Generate a quirky character |
| `scenario` | `sc` | Generate a full scenario |
| `comeback [setup]` | `cb` | Generate a comeback line |
| `punchline <setup>` | `punch`, `p` | Generate a punchline |
| `combo` | - | Generate scene + characters + scenario |
| `random` | `r` | Generate random element |
| `all` | `a` | Generate everything at once |
| `history` | `hist` | Show generation history |
| `help` | `h` | Show help message |

### Options & Flags

| Option | Alias | Description |
|--------|-------|-------------|
| `--count <n>` | `-c` | Generate multiple items |
| `--no-repeat` | - | Avoid recently used items |
| `--save <file>` | `-s` | Save output to file |
| `--json` | `-j` | Output as JSON |
| `--minimal` | - | Minimal text output |
| `--interactive` | `-i` | Start interactive mode |
| `--theme <name>` | - | Filter by theme (future) |
| `--clear-history` | - | Clear generation history |

## 📚 Examples

### Basic Usage

```bash
# Generate a single scene
npm run dev scene

# Generate multiple characters
npm run dev character -- --count 3

# Generate with no-repeat mode
npm run dev scenario -- --no-repeat
```

### Combination Generator

```bash
# Generate complete improv setup (scene + 2 characters + scenario)
npm run dev combo

# Generate with custom character count
npm run dev combo -- --count 4
```

### Export Features

```bash
# Save scene to file
npm run dev scene -- --save my-scene.txt

# Export as JSON
npm run dev character -- --json --save character.json

# Minimal output (no formatting)
npm run dev scenario -- --minimal
```

### Interactive Mode

```bash
# Start interactive mode
npm run dev -- --interactive

# Or use the flag
npm run dev -- -i
```

Interactive mode guides you through:
1. Choosing what to generate
2. Setting options like no-repeat
3. Generating multiple items
4. Saving to files

### History Management

```bash
# View recent generations
npm run dev history

# Clear history
npm run dev -- --clear-history
```

### Example Outputs

#### Scene Prompt
```
═══ 🎬 SCENE PROMPT ═══

You are in a cheese factory, learning that objects keep disappearing
when no one looks at them. Your goal is to audition for a talent show.
```

#### Character
```
═══ 🎭 CHARACTER ═══

You are a professional bubble wrap popper. You are overly dramatic
and can only speak in movie quotes. Secret: They're actually three
kids in a trench coat
```

#### Combo Generator
```
🎬 SCENE
==================================================
You are in the moon, finding out you're all secretly the same person.
Your goal is to order lunch.

🎭 CHARACTERS
==================================================
Character 1: You are a fortune cookie writer. You are suspiciously
optimistic and forgets their own name constantly. Secret: They're
secretly terrified of their own success

Character 2: You are a professional line-stander. You are overly
dramatic and can only tell lies. Secret: They're convinced they're
the chosen one (they're not)

📖 SCENARIO
==================================================
Everything changed when a billionaire tech CEO found out they had
a superpower that only works on Tuesdays, while being chased by
a ghost with terrible advice.

Plot twist: Everything was cake. Literally everything.

Now improvise this scene!
```

## ⚙️ Configuration

Create a `.improvrc` file in your home directory to set defaults:

```json
{
  "theme": "workplace",
  "absurdity_level": 8,
  "exclude_topics": [],
  "favorite_generators": ["scene", "character"],
  "color_theme": "default",
  "history_enabled": true,
  "max_history": 100
}
```

## 📁 Project Structure

```
improv-comedy-generator/
├── src/
│   ├── index.ts                 # Main CLI interface
│   ├── types.ts                 # TypeScript type definitions
│   ├── utils.ts                 # Utility functions (random, history)
│   ├── config.ts                # Configuration manager
│   ├── cli-parser.ts            # Argument parser
│   ├── exporter.ts              # File export utilities
│   ├── interactive.ts           # Interactive mode
│   ├── combination.ts           # Combination generator
│   ├── data/                    # JSON data files
│   │   ├── locations.json
│   │   ├── situations.json
│   │   ├── objectives.json
│   │   ├── professions.json
│   │   ├── personalities.json
│   │   ├── quirks.json
│   │   ├── secrets.json
│   │   └── scenario-*.json
│   └── generators/
│       ├── BaseGenerator.ts     # Base generator class
│       ├── scenePrompt.ts       # Scene generator
│       ├── character.ts         # Character generator
│       ├── scenario.ts          # Scenario generator
│       └── comeback.ts          # Comeback generator
├── dist/                        # Compiled JavaScript
├── package.json
├── tsconfig.json
└── README.md
```

## 🎪 Use Cases

- **Improv Practice**: Get random prompts to practice your improv skills
- **Writing Inspiration**: Kickstart your comedy writing with absurd scenarios
- **Party Games**: Generate prompts for comedy games with friends
- **Theater Warm-ups**: Use as warm-up exercises for theater groups
- **Creative Writing**: Break through writer's block with random comedy elements
- **Social Media**: Generate funny content for social media posts
- **D&D/RPG**: Create quirky NPCs and situations for tabletop games

## 🛠️ Development

```bash
# Run in development mode
npm run dev [command]

# Build the project
npm run build

# Run the built version
npm start [command]
```

## 🎨 Customization

### Adding Your Own Content

Edit the JSON files in `src/data/` to add your own comedy content:

```bash
# Add new locations
vim src/data/locations.json

# Add new character professions
vim src/data/professions.json
```

After editing, rebuild:
```bash
npm run build
```

### Creating Custom Generators

Extend the `BaseGenerator` class:

```typescript
import { BaseGenerator } from './BaseGenerator.js';
import { GeneratorOptions, GeneratorResult } from '../types.js';

export class MyGenerator extends BaseGenerator<MyType> {
  generate(options?: GeneratorOptions): GeneratorResult<MyType> {
    // Your generation logic
  }

  format(data: MyType): string {
    // Your formatting logic
  }

  getType(): string {
    return 'my-generator';
  }
}
```

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add more comedy templates to the data files
- Improve the generators
- Add new features
- Fix bugs
- Improve documentation

## 📝 License

MIT

## 🎉 Have Fun!

This tool is designed to be silly, absurd, and fun. Don't take it too seriously—just enjoy the randomness and let your creativity flow!

## 🔧 Troubleshooting

### Data files not found
Make sure you're running from the project directory and have built the project with `npm run build`.

### TypeScript errors
Run `npm install` to ensure all dependencies are installed, then `npm run build`.

### Interactive mode not working
Make sure your terminal supports readline. Most modern terminals do.

## 🌟 What's New in v2.0

- ✨ Complete architectural refactor with TypeScript classes
- 📊 Batch generation with `--count` flag
- 💾 Export to file, JSON, or minimal formats
- 🎮 Interactive mode for guided generation
- 🔄 No-repeat mode to avoid repetition
- 📜 History tracking and viewing
- ⚙️ Configuration file support
- 🎨 Data separated into JSON files for easy customization
- 🔧 Improved CLI with comprehensive options
- 🎭 New combination generator for complete setups
- 🐛 Fixed grammar issues in scenario generator
