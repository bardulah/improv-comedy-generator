# Agent Handoff Document: improv-comedy-generator

**Last Updated**: 2025-11-10
**Current Agent**: Gemini

---

## 🎯 1. Current Status

### Project Overview
This is a command-line (CLI) tool designed to generate prompts and ideas for improv comedy. It can generate random scenes, characters, scenarios, and combinations thereof.

### Deployment Status
*   **Status**: ✅ **Deployed as a Static Page**
*   **Platform**: Vercel
*   **Live URL**: [https://improv-comedy-generator-ewumu4ubn-mtsalts-projects.vercel.app](https://improv-comedy-generator-ewumu4ubn-mtsalts-projects.vercel.app)
*   **Note**: The Vercel deployment serves a landing page describing the CLI tool. The tool itself is intended to be run from the command line on a server or local machine.

### Technology Stack
*   **Language**: TypeScript
*   **Runtime**: Node.js
*   **Data**: Uses a collection of JSON files in `src/data/` as the source for generation.

### Key Files
*   `INSTRUCTIONS.md`: User-facing guide on how to use the CLI tool.
*   `src/index.ts`: The main entry point for the command-line application.
*   `package.json`: Defines scripts and dependencies.
*   `src/data/`: Directory containing the JSON files with the prompt components.

---

## 🚀 2. Recommended Improvements

This section outlines potential future enhancements for the project.

1.  **Web Interface**: Create a simple, mobile-friendly web application, which could be hosted on the existing Vercel deployment. This would be perfect for improv groups to quickly pull up on a phone during practice, with large, easy-to-press buttons for each generator.
2.  **"Game Mode" Feature**: Add a "Party Mode" or "Game Mode" that structures the generation into popular improv games (e.g., "Party Quirks," "Scenes from a Hat"), providing the right number of characters and specific types of prompts for each game.
3.  **Theme Packs**: Expand the `theme` concept to allow users to select different "theme packs" (e.g., "Sci-Fi," "Fantasy," "Office Humor") that would use different sets of JSON data files for generation.
4.  **Image/GIF Prompts**: Add a feature to generate visual prompts by pulling random images or GIFs from an API (like Giphy) that performers have to justify or incorporate into a scene.
5.  **Community Content**: Build a simple backend and frontend that allows users to submit their own prompt components (locations, characters, situations) to a shared community database, which other users could then opt to use for generation.

---

## 🤝 3. Agent Handoff Notes

### How to Work on This Project

*   **Running the Tool**: This is a CLI tool. The primary way to run it is from the project's root directory on the server using `npm start <command>`. For example: `npm start scene` or `npm start combo`.
*   **Development**: For development, you can use `npm run dev <command>` to run the TypeScript source directly with `tsx`.
*   **Adding Content**: The easiest way to contribute is to add new items to the JSON files in the `src/data/` directory. This requires no code changes, but the project will need to be rebuilt (`npm run build`) for the changes to be included in the `start` script.
*   **Updating Documentation**: If you make any user-facing changes to the CLI commands or options, update the `INSTRUCTIONS.md` file. If you make architectural changes, update this `AGENTS.md` file.

### What to Watch Out For

*   **CLI, Not a Web App**: The Vercel URL only points to a static landing page. Changes to the CLI tool itself need to be tested from the command line; they will not be reflected on the website unless the "Web Interface" improvement is implemented.
*   **Data Structure**: The generation logic is tied to the structure of the JSON files in `src/data/`. If you change the format of these files, you will also need to update the generator code in `src/generators/`.
