import fs from 'fs';
import child_process from 'child_process';

describe('compress png images', () => {
  beforeAll(() => {
    child_process.execSync('rm -rf tmp && mkdir tmp');
  });

  test('output the image to the path that --out-dir option set', () => {
    const rawImage = fs.readFileSync('images/illust.png');
    child_process.execSync('bin/cli images/illust.png --out-dir tmp');
    const compressedImage = fs.readFileSync('tmp/illust.png');
    expect(rawImage.byteLength).toBeGreaterThan(compressedImage.byteLength);
  });
});

describe('optimize png images that has been optimized', () => {
  xtest('skip optimized image', () => {

  });
});

describe('compress jpg images', () => {
  beforeAll(() => {
    child_process.execSync('rm -rf tmp && mkdir tmp');
  });

  test('output the image to the path that --out-dir option set', () => {
    const rawImage = fs.readFileSync('images/illust.png');
    child_process.execSync('bin/cli images/illust.png --out-dir ./tmp');
    const compressedImage = fs.readFileSync('tmp/illust.png');
    expect(rawImage.byteLength).toBeGreaterThan(compressedImage.byteLength);
  });
});

describe('compress png and jpg images with regexp', () => {
  beforeAll(() => {
    child_process.execSync('rm -rf tmp && mkdir tmp');
  });

  test('output some images to tmp directory', () => {
    const rawJpgImage = fs.readFileSync('images/sample.jpg');
    const rawPngImage = fs.readFileSync('images/illust.png');
    child_process.execSync('bin/cli images/* --out-dir ./tmp/');
    const compressedJpgImage = fs.readFileSync('tmp/sample.jpg');
    const compressedPngImage = fs.readFileSync('tmp/illust.png');

    expect(rawJpgImage.byteLength).toBeGreaterThan(compressedJpgImage.byteLength);
    expect(rawPngImage.byteLength).toBeGreaterThan(compressedPngImage.byteLength);
  });
});
