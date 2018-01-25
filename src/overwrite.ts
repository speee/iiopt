import * as fs from 'fs';
import * as path from 'path';
import { Image } from './image';
import { optimize } from './optimizer';
import { RawImageExtractor } from './raw_image_extractor';

export async function run(input, opts) {
  return new Promise<string>( async (resolve, reject) => {
    const imagePath = input[0];
    const image = new Image(imagePath);
    const rawImagePaths = await new RawImageExtractor([image]).extract();

    if (rawImagePaths.length === 0) {
      return reject(`${imagePath} is already optimized`);
    }

    const files = await optimize(rawImagePaths, opts);
    await fs.writeFile(imagePath, files[0].data, (err) => {
      if (err) { throw err; }
    });

    image.afterSize = files[0].data.length;
    resolve(image.compressionReport());
  });
}
