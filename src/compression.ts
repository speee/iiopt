import * as imagemin from 'imagemin';
import * as imageminPngquant from 'imagemin-pngquant';
import * as imageminMozjpeg from 'imagemin-mozjpeg';

export function compression(input, opts) {
  return new Promise<any[]>(resolver => {
    imagemin(input, opts.outDir, {
      plugins: [
        imageminPngquant({ quality: 85 }),
        imageminMozjpeg({ progressive: true, quality: 85 })
      ]
    }).then((files) => {
      resolver(files);
    });
  });
}
