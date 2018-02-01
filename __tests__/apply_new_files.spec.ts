import fs from 'fs';
import child_process from 'child_process';
import { promisify } from 'util';
import * as ApplyNewFiles from '../src/apply_new_files';

const unlinkAsync = promisify(fs.unlink);
const mkdirAsync = promisify(fs.mkdir);
const readFileAsync = promisify(fs.readFile);
const copyFileAsync = promisify(fs.copyFile);
const execAsync = promisify(child_process.exec);

describe('iiopt --apply-new-files', () => {
  beforeAll( async () => {
    await unlinkAsync('.git/hooks/pre-commit').catch(err => {});
    await execAsync('bin/cli --install-git-hooks');
    await promisify(fs.mkdir)('./test_images');
  });

  afterAll( async () => {
    await unlinkAsync('.git/hooks/pre-commit');
    await execAsync('git reset HEAD test_images/sample.jpg');
    await execAsync('rm -rf test_images');
  });

  test('commited raw images are compressed', async () => {
    await copyFileAsync('images/sample.jpg', './test_images/sample.jpg');
    await execAsync('git add test_images/sample.jpg');
    const rawImage = await readFileAsync('test_images/sample.jpg');
    await execAsync('bin/cli --apply-new-files');
    const compressedImage = await readFileAsync('test_images/sample.jpg');
    expect(rawImage.byteLength).toBeGreaterThan(compressedImage.byteLength);
  });
});
