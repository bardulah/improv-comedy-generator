/**
 * Configuration manager for .improvrc
 */

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { Config } from './types.js';

const CONFIG_FILENAME = '.improvrc';
const DEFAULT_CONFIG: Config = {
  theme: undefined,
  absurdity_level: 5,
  exclude_topics: [],
  favorite_generators: [],
  color_theme: 'default',
  history_enabled: true,
  max_history: 100
};

/**
 * Get the config file path
 */
function getConfigPath(): string {
  return path.join(os.homedir(), CONFIG_FILENAME);
}

/**
 * Load configuration from .improvrc
 */
export function loadConfig(): Config {
  try {
    const configPath = getConfigPath();
    if (fs.existsSync(configPath)) {
      const data = fs.readFileSync(configPath, 'utf-8');
      const userConfig = JSON.parse(data);
      return { ...DEFAULT_CONFIG, ...userConfig };
    }
  } catch (error) {
    console.error('Error loading config:', error);
  }
  return DEFAULT_CONFIG;
}

/**
 * Save configuration to .improvrc
 */
export function saveConfig(config: Config): void {
  try {
    const configPath = getConfigPath();
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving config:', error);
  }
}

/**
 * Update specific config values
 */
export function updateConfig(updates: Partial<Config>): Config {
  const current = loadConfig();
  const updated = { ...current, ...updates };
  saveConfig(updated);
  return updated;
}

/**
 * Reset config to defaults
 */
export function resetConfig(): Config {
  saveConfig(DEFAULT_CONFIG);
  return DEFAULT_CONFIG;
}

/**
 * Get a config value
 */
export function getConfigValue<K extends keyof Config>(key: K): Config[K] {
  const config = loadConfig();
  return config[key];
}
