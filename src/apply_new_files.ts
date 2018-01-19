import * as child_process from 'child_process';
import * as Compression from './compression';

function diffImages() {
  const results = child_process.execSync('git diff --cached --name-status').toString().split('\n');
  // NOTE: Extract images that are added or modified
  return results.filter((file) => /.png$|.jpg$/ig.test(file))
                .map((file) => file.replace(/^[A|M]\t/, ''));
}

export async function run(opts) {
  const images = diffImages();
  const files = await Compression.compression(images, opts);
  files.forEach(file => {
    child_process.execSync(`git add ${file.path}`);
  });
  console.log('image compressed');
}
