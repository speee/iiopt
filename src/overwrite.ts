import * as fs from 'fs';
import * as path from 'path';
import * as imagemin from 'imagemin';
import * as imageminPngquant from 'imagemin-pngquant';
import * as imageminMozjpeg from 'imagemin-mozjpeg';
import { Image } from './image';

export function run(input, opts) {
  const image = new Image(input, fs.lstatSync(input).size);

  imagemin([input], opts.outDir, {
    plugins: [
      imageminPngquant({ quality: 85 }),
      imageminMozjpeg({ progressive: true, quality: 85 })
    ]
  }).then(files => {
    fs.writeFileSync(input, files[0].data);
    image.afterSize = files[0].data.length;
    console.log(image.compressionReport());
  });
}
