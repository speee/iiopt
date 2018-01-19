import fs from 'fs';
import execa from 'execa';
import child_process from 'child_process';

describe('help message', () => {
  test('show help screen', () => {
    const helpMessage = execa.shellSync('bin/cli --help');
    expect(helpMessage.stdout).toMatch(/nice/);
  });
});

describe('confirm flags and options of cli', () => {
  beforeAll(() => {
    child_process.execSync('rm -rf tmp && mkdir tmp');
  });

  test('output the compressed image to the path designated by --out-dir option', () => {
    child_process.execSync('bin/cli images/illust.png --out-dir tmp');
    const images = execa.shellSync('ls ./tmp');
    expect(images.stdout).toEqual('illust.png');
  });

  test('raise error if both --out-dir option and --overwrite are not given.', () => {
    try {
      execa.shellSync('bin/cli images/illust.png');
    } catch (error) {
      expect(error.message).toMatch('--out-dir or --overwrite parameter is needed, specify a `--overwrite`');
    }
  });
});

describe('overwrite images', () => {
  beforeAll(() => {
    child_process.execSync('rm -rf tmp && mkdir tmp && cp images/illust.png ./tmp/');
  });

  test("if --overwrite flag is set and --out-dir isn't set, a image is overwritten",() => {
    const rawImage = fs.readFileSync('tmp/illust.png');
    child_process.execSync('bin/cli tmp/illust.png --overwrite');
    const compressedImage = fs.readFileSync('tmp/illust.png');
    expect(rawImage.byteLength).toBeGreaterThan(compressedImage.byteLength);
  });
});

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

  describe('compress images with regexp', () => {
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
});
