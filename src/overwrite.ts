import * as fs from 'fs';
import * as path from 'path';
import { Image } from './image';
import { optimize } from './optimizer';
import { RawImageExtractor } from './raw_image_extractor';

export async function run(input, opts) {
  const imagePath = input[0];
  const image = new Image(imagePath);
  const rawImagePaths = new RawImageExtractor([image], [imagePath]).extract();

  const files = await optimize(rawImagePaths, opts);
  fs.writeFileSync(imagePath, files[0].data);
  image.afterSize = files[0].data.length;
  console.log(image.compressionReport());
}
