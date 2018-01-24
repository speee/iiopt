import * as fs from 'fs';
import * as glob from 'glob';
import * as path from 'path';
import { Image } from './image';
import { optimize } from './optimizer';
import { RawImageExtractor } from './raw_image_extractor';

export async function run(input, opts) {
  const images = input.map((imagePath) => new Image(imagePath));
  const rawImagePaths = new RawImageExtractor(images, input).extract();
  const files = await optimize(rawImagePaths, opts);
  files.forEach((file) => {
    const compressedImage = images.find(image => {
      return path.basename(image.path) === path.basename(file.path);
    });
    compressedImage.afterSize = file.data.length;
    console.log(compressedImage.compressionReport());
  });
}
