# 🎭 Improv Comedy Generator

AI-powered improv comedy generator: creates absurd scenes, quirky characters, and hilarious scenarios for playful performances!

## ✨ Features

- **Scene Prompts**: Generate absurd scene prompts with random locations, situations, and objectives
- **Character Generator**: Create quirky characters with unique professions, personalities, and secrets
- **Scenario Builder**: Generate full comedic scenarios with plot twists and complications
- **Comeback Generator**: Get witty comebacks and roasts (with optional user-provided setups)
- **Punchline Generator**: Create punchlines for your joke setups

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

### Run with npm (development)

```bash
npm run dev [command] [options]
```

### Run the built version

```bash
npm start [command]
# or
node dist/index.js [command]
```

### Commands

#### Generate a Scene Prompt

```bash
npm run dev scene
```

Example output:
```
═══ 🎬 SCENE PROMPT ═══

You are in a karaoke bar in space, learning that you're being narrated by
an unreliable narrator. Your goal is to break a world record.
```

#### Generate a Character

```bash
npm run dev character
```

Example output:
```
═══ 🎭 CHARACTER ═══

You are a ninja accountant. You are unnecessarily mysterious and is allergic
to common sense. Secret: They're from the future but terrible at hiding it
```

#### Generate a Full Scenario

```bash
npm run dev scenario
```

Example output:
```
═══ 📖 SCENARIO ═══

In a shocking turn of events, a paranoid librarian accidentally became
famous for the wrong reason, but they were terrible at keeping secrets
a life coach who's terrible at their job.

Plot twist: The instructions were upside down the whole time.

Now improvise this scene!
```

#### Generate a Comeback

```bash
# With a setup
npm run dev comeback "You think you're so smart"

# Without a setup (random comeback)
npm run dev comeback
```

Example output:
```
═══ 💬 SETUP ═══

"You think you're so smart"

═══ 🔥 COMEBACK ═══

Oh really? Well my houseplant has better opinions!
```

#### Generate a Punchline

```bash
npm run dev punchline "Why did the programmer quit?"
```

Example output:
```
═══ 💬 SETUP ═══

"Why did the programmer quit?"

═══ 🎯 PUNCHLINE ═══

Because they believed in themselves (their first mistake)!
```

#### Generate Random Comedy Element

```bash
npm run dev random
```

#### Generate Everything at Once

```bash
npm run dev all
```

### Command Aliases

- `scene` → `s`
- `character` → `char`, `c`
- `scenario` → `sc`
- `comeback` → `cb`
- `punchline` → `punch`, `p`
- `random` → `r`
- `all` → `a`

## 🎪 Use Cases

- **Improv Practice**: Get random prompts to practice your improv skills
- **Writing Inspiration**: Kickstart your comedy writing with absurd scenarios
- **Party Games**: Generate prompts for comedy games with friends
- **Theater Warm-ups**: Use as warm-up exercises for theater groups
- **Creative Writing**: Break through writer's block with random comedy elements
- **Social Media**: Generate funny content for social media posts

## 🛠️ Development

```bash
# Run in development mode
npm run dev [command]

# Build the project
npm run build

# Run the built version
npm start [command]
```

## 📁 Project Structure

```
improv-comedy-generator/
├── src/
│   ├── index.ts                 # Main CLI interface
│   ├── utils.ts                 # Utility functions
│   └── generators/
│       ├── scenePrompt.ts       # Scene prompt generator
│       ├── character.ts         # Character generator
│       ├── scenario.ts          # Scenario generator
│       └── comeback.ts          # Comeback/punchline generator
├── dist/                        # Compiled JavaScript
├── package.json
├── tsconfig.json
└── README.md
```

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add more comedy templates
- Improve the generators
- Add new features
- Fix bugs

## 📝 License

MIT

## 🎉 Have Fun!

This tool is designed to be silly, absurd, and fun. Don't take it too seriously—just enjoy the randomness and let your creativity flow!
