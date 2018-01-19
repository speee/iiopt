import * as child_process from 'child_process';
import * as Overwrite from './overwrite';

function diffImages() {
  const results = child_process.execSync('git diff --cached --name-status').toString().split('\n');
  // NOTE: Extract images that are added or modified
  return results.filter((file) => /.png$|.jpg$/ig.test(file))
                .map((file) => file.replace(/^[A|M]\t/, ''));
}

function compression(images, opts) {
  return new Promise(resolve => {
    images.forEach(image => {
      Overwrite.run(image, opts);
    });
  });
}

export async function run(opts) {
  const images = diffImages();
  await compression(images, opts);
  console.log('image compressed');
}
