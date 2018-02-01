import * as child_process from 'child_process';
import { promisify } from 'util';
const execAsync = promisify(child_process.exec);

function extractAddedOrModifiedImageFiles(diffText: string) : string[] {
  const regexp = /^[AM]\s.+\.(?:jpg|png)$/gm;
  const files = diffText.match(regexp);
  if (files) {
    return files.map((file) => file.replace(/^[A|M]\s*/, ''));
  } else {
    return [];
  }
}

export async function extractAmongCache(): Promise<string[]> {
  const results = await execAsync('git diff --cached --name-status');
  return extractAddedOrModifiedImageFiles(results.stdout);
}
