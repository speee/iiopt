import * as child_process from 'child_process';
import * as git from 'simple-git/promise';
import * as Overwrite from './overwrite';

function diffImages() {
  return git(process.cwd()).diffSummary();
}

function compression(images, opts) {
  images.forEach(image => {
    Overwrite.run(image, opts);
  });
}

export async function run(opts) {
  const res = await diffImages();
  const images = res.files.filter((file) => /.png$|.jpg$/ig.test(file.file))
                          .map(file => file.file);
  await compression(images, opts);
}
