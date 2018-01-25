import * as child_process from 'child_process';
import { optimize } from './optimizer';
import * as fs from 'fs';
import { Image } from './image';
import { RawImageExtractor } from './raw_image_extractor';

function extractAddedOrModifiedImageFiles() {
  const results = child_process.execSync('git diff --cached --name-status').toString().split('\n');
  return results.filter((file) => /.png$|.jpg$/ig.test(file))
                .map((file) => file.replace(/^[A|M]\t/, ''));
}

export async function run(opts) {
  return new Promise<string[]>( async (resolve, reject) => {
    const images = extractAddedOrModifiedImageFiles().map((image) => new Image(image));
    if (images.length === 0 ) { return ''; }

    const rawImagePaths = await new RawImageExtractor(images).extract();
    if (rawImagePaths.length === 0) {
      return reject('There are no images to optimize');
    }

    return rawImagePaths.map( async (imagePath) => {
      const image = images.find((e) => e.path === imagePath);
      const files = await optimize([imagePath], opts);
      await fs.writeFile(imagePath, files[0].data, (err) => {
        if (err) { throw err; }
      });
      image.afterSize = files[0].data.length;
      await child_process.exec(`git add ${imagePath}`);
      return image.compressionReport();
    });
  });
}
