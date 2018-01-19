import * as fs from 'fs';
import * as path from 'path';
import * as imagemin from 'imagemin';
import * as imageminPngquant from 'imagemin-pngquant';
import * as imageminMozjpeg from 'imagemin-mozjpeg';
import { Image } from './image';
import * as Compression from './compression';

export async function run(input, opts) {
  const imagePath = input[0];
  const image = new Image(imagePath, fs.lstatSync(imagePath).size);
  const files = await Compression.compression([imagePath], opts);

  files.forEach(file => {
    fs.writeFileSync(imagePath, file.data);
    image.afterSize = file.data.length;
    console.log(image.compressionReport());
  });
}
