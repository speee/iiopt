import * as fs from 'fs';
import * as path from 'path';
import { Image } from './image';
import { optimize } from './optimizer';
import { RawImageExtractor } from './raw_image_extractor';

export async function run(input, opts) {
  const imagePath = input[0];
  const image = new Image(imagePath);
  const rawImagePaths = await new RawImageExtractor([image]).extract();

  if (rawImagePaths.length === 0) {
    return new Error(`${imagePath} is already optimized`);
  }

  const files = await optimize(rawImagePaths, opts);
  await fs.writeFile(imagePath, files[0].data, (err) => {
    if (err) { throw err; }
  });

  image.afterSize = files[0].data.length;
  return image.compressionReport();
}
