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
  const images = extractAddedOrModifiedImageFiles().map((image) => new Image(image));
  if (images.length === 0 ) { return []; }

  const rawImagePaths = await new RawImageExtractor(images).extract();
  if (rawImagePaths.length === 0) { return []; }

  const results: string[] = [];
  for (const imagePath of rawImagePaths) {
    const image = images.find((e) => e.path === imagePath);
    const files = await optimize([imagePath], opts);
    await writeFileAsync(imagePath, files[0].data);
    image.afterSize = files[0].data.length;
    await execAsync(`git add ${imagePath}`);
    results.push(image.compressionReport());
  }
  return results;
}
