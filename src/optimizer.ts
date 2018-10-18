import * as imagemin from "imagemin";
import * as imageminMozjpeg from "imagemin-mozjpeg";
import * as imageminPngquant from "imagemin-pngquant";

export function optimize(input, opts): Promise<any> {
  return new Promise<any[]>(resolver => {
    imagemin(input, opts.outDir, {
      plugins: [
        imageminPngquant({ quality: 85 }),
        imageminMozjpeg({ progressive: true, quality: 85 })
      ]
    }).then(files => {
      resolver(files);
    });
  });
}
