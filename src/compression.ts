import * as imagemin from 'imagemin';
import * as imageminPngquant from 'imagemin-pngquant';
import * as imageminMozjpeg from 'imagemin-mozjpeg';
import * as fs from 'fs';
import * as glob from 'glob';
import { Image } from './image';
import * as path from 'path';

export function run(input, opts) {
  const images = input.map((imagePath) => {
    return new Image(imagePath, fs.lstatSync(imagePath).size);
  });

  imagemin(input, opts.outDir, {
    plugins: [
      imageminPngquant({ quality: 85 }),
      imageminMozjpeg({ progressive: true, quality: 85 })
    ]
  }).then(files => {
    files.forEach((file) => {
      const compressedImage = images.find((image) => {
        return path.basename(image.path) === path.basename(file.path);
      });
      compressedImage.afterSize = file.data.length;
      console.log(compressedImage.compressionReport());
    });
  });
}
