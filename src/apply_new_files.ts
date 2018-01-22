import * as child_process from 'child_process';
import { optimize } from './optimizer';
import * as fs from 'fs';
import { Image } from './image';

function extractAddedOrModifiedImageFiles() {
  const results = child_process.execSync('git diff --cached --name-status').toString().split('\n');
  return results.filter((file) => /.png$|.jpg$/ig.test(file))
                .map((file) => file.replace(/^[A|M]\t/, ''));
}

export function run(opts) {
  const images = extractAddedOrModifiedImageFiles();
  if (images.length === 0 ) {
    process.exit(0);
  }

  images.forEach( async (imagePath) => {
    const image = new Image(imagePath, fs.lstatSync(imagePath).size);
    const files = await optimize([imagePath], opts);

    fs.writeFileSync(imagePath, files[0].data);
    image.afterSize = files[0].data.length;
    child_process.execSync(`git add ${imagePath}`);
    console.log(image.compressionReport());
  });

  console.log('image compressed');
}
