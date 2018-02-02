import fs from 'fs';
import child_process from 'child_process';
import { promisify } from 'util';
import * as gitDiff from '../src/git_diff';
import { Image } from '../src/image';

const execAsync = promisify(child_process.exec);
const mkdirAsync = promisify(fs.mkdir);
const copyFileAsync = promisify(fs.copyFile);

describe('rawImagesCreatedInCurrentBranch', () => {
  beforeAll( async () => {
    await mkdirAsync('./test_images');
  });

  afterAll( async () => {
    await execAsync('git reset HEAD test_images/illust.png test_images/illust_optimized.png');
    await execAsync('rm -rf test_images');
  });


  it('if there are no raws images in current branch', async () => {
    await expect(gitDiff.rawImagesCreatedInCurrentBranch()).resolves.toEqual([]);
  });

  it('if raw images are added in current branch', async () => {
    await copyFileAsync('images/illust.png', './test_images/illust.png');
    await copyFileAsync('images/illust_optimized.png', './test_images/illust_optimized.png');
    await execAsync('git add test_images/illust.png test_images/illust_optimized.png');
    await expect(gitDiff.rawImagesCreatedInCurrentBranch()).resolves.toEqual(['test_images/illust.png']);
  });
});
