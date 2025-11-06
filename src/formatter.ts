/**
 * Output formatting utilities using chalk for better terminal compatibility
 */

import chalk from 'chalk';

export const colors = {
  reset: chalk.reset,
  bright: chalk.bold,
  dim: chalk.dim,
  cyan: chalk.cyan,
  yellow: chalk.yellow,
  green: chalk.green,
  magenta: chalk.magenta,
  red: chalk.red,
  blue: chalk.blue
};

/**
 * Print a formatted section with title and content
 */
export function printSection(title: string, content: string, color: typeof chalk = chalk.yellow): void {
  console.log(`\n${chalk.bold(color(`═══ ${title} ═══`))}\n`);
  console.log(content);
  console.log();
}

/**
 * Print the application banner
 */
export function printBanner(): void {
  console.log(chalk.bold.cyan(`
╔═══════════════════════════════════════════════════╗
║      🎭 IMPROV COMEDY GENERATOR 🎭                ║
║   Generate absurd scenes & hilarious scenarios!  ║
╚═══════════════════════════════════════════════════╝
`));
}

/**
 * Print a success message
 */
export function printSuccess(message: string): void {
  console.log(chalk.green(`✓ ${message}`));
}

/**
 * Print an error message
 */
export function printError(message: string): void {
  console.error(chalk.red(`✗ Error: ${message}`));
}

/**
 * Print an info message
 */
export function printInfo(message: string): void {
  console.log(chalk.cyan(message));
}

/**
 * Print a warning message
 */
export function printWarning(message: string): void {
  console.log(chalk.yellow(`⚠ ${message}`));
}
