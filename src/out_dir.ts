import * as fs from 'fs';
import * as glob from 'glob';
import * as path from 'path';
import { Image } from './image';
import * as Compression from './compression';

export async function run(input, opts) {
  const images = input.map((imagePath) => {
    return new Image(imagePath, fs.lstatSync(imagePath).size);
  });

  const files = await Compression.compression(input, opts);

  files.forEach((file) => {
    const compressedImage = images.find(image => {
      return path.basename(image.path) === path.basename(file.path);
    });
    compressedImage.afterSize = file.data.length;
    console.log(compressedImage.compressionReport());
  });
}
