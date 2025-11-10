# Instructions for Improv Comedy Generator

This guide provides instructions on how to use the Improv Comedy Generator tool.

## What It Does

This is a command-line tool for improvisers, writers, and anyone looking for a spark of creative, comedic inspiration. It generates random, absurd, and hilarious prompts to kickstart a scene or performance.

It can generate:
*   **Scene Prompts:** A location, a situation, and a goal.
*   **Quirky Characters:** A profession, a personality trait, and a secret.
*   **Absurd Scenarios:** A full comedic situation with a plot twist.
*   **Combinations:** A complete package with a scene and multiple characters.

## How to Use It

This is a Command-Line Interface (CLI) tool, which means you run it from your terminal.

### Prerequisites

*   You must be logged into the server where the tool is located.
*   Navigate to the project directory: `cd /opt/deployment/repos/improv-comedy-generator`

### Basic Commands

You can generate different elements using simple commands.

```bash
# Generate a random scene prompt
npm start scene

# Generate a random character
npm start character

# Generate a full scenario with a plot twist
npm start scenario
```

### The "Combo" Command (Most Useful)

The best way to get a full scene ready for performance is to use the `combo` command. It generates a scene, two characters, and a scenario all at once.

```bash
npm start combo
```

### Customizing the Output

You can control the output with several optional flags.

**1. Generating Multiple Items**

Use the `--count` or `-c` flag to generate more than one item at a time.

```bash
# Generate 3 characters
npm start character -- --count 3
```

**2. Saving the Output**

Use the `--save` flag to save the generated prompt to a text file.

```bash
npm start combo -- --save my-scene.txt
```

**3. Interactive Mode**

If you don't want to remember the commands, just start the tool in interactive mode with the `-i` flag. It will guide you through the process with prompts.

```bash
npm start -- -i
```

This tool is perfect for warming up before a show, practicing improv skills, or just having a laugh. Have fun!
