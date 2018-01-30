import * as fs from 'fs';
import * as glob from 'glob';
import * as path from 'path';
import { Image } from './image';
import { optimize } from './optimizer';
import { RawImageExtractor } from './raw_image_extractor';

export async function run(input, opts) {
  const images = input.map((imagePath) => new Image(imagePath));
  const rawImagePaths = await new RawImageExtractor(images).extract();
  if (rawImagePaths.length === 0) {
    throw new Error('There are no images to optimize');
  }

  const files = await optimize(rawImagePaths, opts);
  return files.map((file) => {
    const compressedImage = images.find(image => {
      return path.basename(image.path) === path.basename(file.path);
    });
    compressedImage.afterSize = file.data.length;
    return compressedImage.compressionReport();
  });
}
