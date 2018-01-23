import * as fs from 'fs';
import * as glob from 'glob';
import * as path from 'path';
import { Image } from './image';
import { optimize } from './optimizer';

export async function run(input, opts) {
  const images = input.map((imagePath) => new Image(imagePath));
  const optimizedImagePaths = images.filter((image) => image.isOptimized()).map((image) => image.path);

  const rawImagePaths = input.filter((imagePath) => {
    if (optimizedImagePaths.includes(imagePath)) {
      console.error(`${imagePath} is already optimized`);
      return false;
    } else {
      return true;
    }
  });

  const files = await optimize(rawImagePaths, opts);
  files.forEach((file) => {
    const compressedImage = images.find(image => {
      return path.basename(image.path) === path.basename(file.path);
    });
    compressedImage.afterSize = file.data.length;
    console.log(compressedImage.compressionReport());
  });
}
