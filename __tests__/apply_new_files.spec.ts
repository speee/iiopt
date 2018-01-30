import fs from 'fs';
import child_process from 'child_process';
import { promisify } from 'util';

import * as ApplyNewFiles from '../src/apply_new_files';

describe('iiopt --apply-new-files', () => {
  beforeAll( async () => {
    await promisify(fs.unlink)('.git/hooks/pre-commit').catch(err => {});
    await promisify(child_process.exec)('bin/cli --install-git-hooks');
    await promisify(fs.mkdir)('./test_images');
  });

  afterAll( async () => {
    await promisify(fs.unlink)('.git/hooks/pre-commit');
    await promisify(child_process.exec)('git reset HEAD test_images/sample.jpg');
    await promisify(child_process.exec)('rm -rf test_images');
  });

  test('commited raw images are compressed', async () => {
    await promisify(fs.copyFile)('images/sample.jpg', './test_images/sample.jpg');
    await promisify(child_process.exec)('git add test_images/sample.jpg');
    const rawImage = await promisify(fs.readFile)('test_images/sample.jpg');
    await promisify(child_process.exec)('bin/cli --apply-new-files');
    const compressedImage = await promisify(fs.readFile)('test_images/sample.jpg');
    expect(rawImage.byteLength).toBeGreaterThan(compressedImage.byteLength);
  });
});
