import fs from 'fs';
import execa from 'execa';
import child_process from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(child_process.exec);
const readFileAsync = promisify(fs.readFile);

describe('overwrite images', () => {
  afterAll( async () => { await execAsync('rm -rf tmp'); });
  beforeAll( async () => { await execAsync('rm -rf tmp && mkdir tmp && cp images/* tmp'); });

  test("if --overwrite flag is set and --out-dir isn't set, a jpg image is overwritten", async () => {
    const rawImage = await readFileAsync('tmp/sample.jpg');
    await execAsync('bin/cli ./tmp/sample.jpg --overwrite');
    const compressedImage = await readFileAsync('tmp/sample.jpg');
    expect(rawImage.byteLength).toBeGreaterThan(compressedImage.byteLength);
  });

  test("raw png image is given", async () => {
    const rawImage = await readFileAsync('tmp/illust.png');
    await execAsync('bin/cli ./tmp/illust.png --overwrite');
    const compressedImage = await readFileAsync('tmp/illust.png');
    expect(rawImage.byteLength).toBeGreaterThan(compressedImage.byteLength);
  });

  test("optimized png image is given", async () => {
    const beforeImage = await readFileAsync('tmp/illust_optimized.png');
    return execAsync('bin/cli ./tmp/illust_optimized.png --overwrite')
            .catch(e => expect(e.message).toMatch('./tmp/illust_optimized.png is already optimized'));
  });
});
