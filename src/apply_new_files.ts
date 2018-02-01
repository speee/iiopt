import * as child_process from 'child_process';
import { optimize } from './optimizer';
import * as fs from 'fs';
import { Image } from './image';
import { RawImageExtractor } from './raw_image_extractor';
import { promisify } from 'util';

const writeFileAsync = promisify(fs.writeFile);
const execAsync = promisify(child_process.exec);

function extractAddedOrModifiedImageFiles(): string[] {
  const results = child_process.execSync('git diff --cached --name-status').toString();
  const regexp = /^[AM]\s.+\.(?:jpg|png)$/gm;
  const files = results.match(regexp);
  if (files) {
    return files.map((file) => file.replace(/^[A|M]\s*/, ''));
  } else {
    return [];
  }
}

export async function run(opts): Promise<string[]> {
  const imagePaths = extractAddedOrModifiedImageFiles();
  if (imagePaths.length === 0 ) { return []; }

  const rawImages = await new RawImageExtractor(imagePaths).extract();
  if (rawImages.length === 0) { return []; }

  // NOTE:
  // By using imagemin, returned value from optimize function doesn't have a path property when the image is overwrited.
  // So we optimize images one by one.
  const results: string[] = [];
  for (const image of rawImages) {
    const files = await optimize([image.path], opts);
    await writeFileAsync(image.path, files[0].data);
    image.afterSize = files[0].data.length;
    await execAsync(`git add ${image.path}`);
    results.push(image.compressionReport());
  }
  return results;
}
