import fs from 'fs';
import execa from 'execa';
import child_process from 'child_process';

describe('overwrite images', () => {
  beforeAll(() => {
    child_process.execSync('rm -rf tmp && mkdir tmp && cp images/sample.jpg ./tmp/sample.jpg');
  });

  test("if --overwrite flag is set and --out-dir isn't set, a image is overwritten", () => {
    const rawImage = fs.readFileSync('tmp/sample.jpg');
    child_process.execSync('bin/cli ./tmp/sample.jpg --overwrite');
    const compressedImage = fs.readFileSync('tmp/sample.jpg');
    expect(rawImage.byteLength).toBeGreaterThan(compressedImage.byteLength);
  });
});
