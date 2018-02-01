import * as fs from 'fs';
import * as path from 'path';
import { Image } from './image';
import { optimize } from './optimizer';
import { RawImageExtractor } from './raw_image_extractor';
import { promisify } from 'util';
const writeFileAsync = promisify(fs.writeFile);

export async function run(input, opts) {
  const imagePath = input[0];
  const image = new Image(imagePath);
  const rawImagePaths = await new RawImageExtractor([image]).extract();

  if (rawImagePaths.length === 0) {
    throw new Error(`${imagePath} is already optimized`);
  }

  const files = await optimize(rawImagePaths, opts);
  await writeFileAsync(imagePath, files[0].data);
  image.afterSize = files[0].data.length;
  return image.compressionReport();
}
