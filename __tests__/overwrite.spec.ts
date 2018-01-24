import fs from 'fs';
import execa from 'execa';
import child_process from 'child_process';

describe('overwrite images', () => {
  beforeAll(() => {
    child_process.execSync('rm -rf tmp && mkdir tmp && cp images/* tmp');
  });

  afterAll(() => {
    child_process.execSync('rm -rf tmp');
  });

  test("if --overwrite flag is set and --out-dir isn't set, a jpg image is overwritten", () => {
    const rawImage = fs.readFileSync('tmp/sample.jpg');
    child_process.execSync('bin/cli ./tmp/sample.jpg --overwrite');
    const compressedImage = fs.readFileSync('tmp/sample.jpg');
    expect(rawImage.byteLength).toBeGreaterThan(compressedImage.byteLength);
  });

  test("raw png image is given", () => {
    const rawImage = fs.readFileSync('tmp/illust.png');
    child_process.execSync('bin/cli ./tmp/illust.png --overwrite');
    const compressedImage = fs.readFileSync('tmp/illust.png');
    expect(rawImage.byteLength).toBeGreaterThan(compressedImage.byteLength);
  });

  test("optimized png image is given", () => {
    const beforeImage = fs.readFileSync('tmp/illust_optimized.png');
    const result =  child_process.execSync('bin/cli ./tmp/illust_optimized.png --overwrite').toString();
    expect(result).toContain('./tmp/illust_optimized.png is already optimized');
  });
});
