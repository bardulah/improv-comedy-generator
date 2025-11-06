/**
 * Export utilities for saving generated content
 */

import * as fs from 'fs';
import * as path from 'path';
import { ExportOptions } from './types.js';

export class Exporter {
  static export(content: any, options: ExportOptions): void {
    const { format, filePath, includeMetadata } = options;

    let output: string;

    switch (format) {
      case 'json':
        output = JSON.stringify(
          includeMetadata ? content : content.data || content,
          null,
          2
        );
        break;
      case 'minimal':
        output = typeof content === 'string' ? content : content.formatted || JSON.stringify(content);
        break;
      case 'text':
      default:
        output = this.formatAsText(content, includeMetadata);
        break;
    }

    if (filePath) {
      const resolvedPath = path.resolve(filePath);
      fs.writeFileSync(resolvedPath, output, 'utf-8');
      console.log(`✓ Saved to ${resolvedPath}`);
    } else {
      console.log(output);
    }
  }

  private static formatAsText(content: any, includeMetadata: boolean = false): string {
    let text = '';

    if (typeof content === 'string') {
      text = content;
    } else if (content.formatted) {
      text = content.formatted;
    } else {
      text = JSON.stringify(content, null, 2);
    }

    if (includeMetadata && content.metadata) {
      text += `\n\n---\nGenerated: ${content.metadata.generatedAt}`;
      if (content.metadata.options && Object.keys(content.metadata.options).length > 0) {
        text += `\nOptions: ${JSON.stringify(content.metadata.options)}`;
      }
    }

    return text;
  }
}
