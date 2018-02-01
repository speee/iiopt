import fs from 'fs';
import child_process from 'child_process';
import { run } from '../src/out_dir';
import { promisify } from 'util';

const execAsync = promisify(child_process.exec);
const readFileAsync = promisify(fs.readFile);

describe('compress png images', () => {
  beforeAll( async () => { await execAsync('rm -rf tmp && mkdir tmp'); });

  test('output the image to the path that --out-dir option set', async () => {
    const rawImage = await readFileAsync('images/illust.png');
    await execAsync('bin/cli images/illust.png --out-dir tmp');
    const compressedImage = await readFileAsync('tmp/illust.png');
    expect(rawImage.byteLength).toBeGreaterThan(compressedImage.byteLength);
  });
});

describe('optimize png images that has been optimized', () => {
  beforeAll( async () => { await execAsync('rm -rf tmp && mkdir tmp'); });

  test('skip optimized image', async () => {
    const optimizedImage = await readFileAsync('images/illust_optimized.png');
    return execAsync(`bin/cli images/illust_optimized.png --out-dir tmp`)
            .catch(e => expect(e.message).toMatch('There are no images to optimize'));
  });
});

describe('compress jpg images', () => {
  beforeAll( async () => { await execAsync('rm -rf tmp && mkdir tmp'); });

  test('output the image to the path that --out-dir option set', async () => {
    const rawImage = await readFileAsync('images/illust.png');
    await execAsync('bin/cli images/illust.png --out-dir ./tmp');
    const compressedImage = await readFileAsync('tmp/illust.png');
    expect(rawImage.byteLength).toBeGreaterThan(compressedImage.byteLength);
  });
});

describe('compress png and jpg images with regexp', () => {
  beforeAll( async () => { await execAsync('rm -rf tmp && mkdir tmp'); });

  test('output some images to tmp directory', async () => {
    const rawJpgImage = await readFileAsync('images/sample.jpg');
    const rawPngImage = await readFileAsync('images/illust.png');
    await execAsync('bin/cli images/* --out-dir ./tmp/');
    const compressedJpgImage = await readFileAsync('tmp/sample.jpg');
    const compressedPngImage = await readFileAsync('tmp/illust.png');
    expect(rawJpgImage.byteLength).toBeGreaterThan(compressedJpgImage.byteLength);
    expect(rawPngImage.byteLength).toBeGreaterThan(compressedPngImage.byteLength);
  });
});
