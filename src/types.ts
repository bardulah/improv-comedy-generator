/**
 * Core type definitions for the comedy generator
 */

export interface ScenePrompt {
  location: string;
  situation: string;
  objective: string;
  formatted: string;
}

export interface Character {
  profession: string;
  personality: string;
  quirk: string;
  secret: string;
  formatted: string;
}

export interface Scenario {
  opening: string;
  protagonist: string;
  discovery: string;
  complication: string;
  helper: string;
  twist: string;
  formatted: string;
}

export interface GeneratorOptions {
  theme?: string;
  count?: number;
  difficulty?: number;
  excludeTopics?: string[];
  noRepeat?: boolean;
}

export interface GeneratorResult<T> {
  data: T;
  formatted: string;
  metadata?: {
    generatedAt: Date;
    options: GeneratorOptions;
  };
}

export interface Config {
  theme?: string;
  absurdity_level?: number;
  exclude_topics?: string[];
  favorite_generators?: string[];
  color_theme?: 'default' | 'minimal' | 'vibrant';
  history_enabled?: boolean;
  max_history?: number;
}

export interface HistoryEntry {
  type: string;
  content: string;
  timestamp: Date;
}

export type OutputFormat = 'text' | 'json' | 'minimal';

export interface ExportOptions {
  format: OutputFormat;
  filePath?: string;
  includeMetadata?: boolean;
}
