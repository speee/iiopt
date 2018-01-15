import fs from 'fs';
import child_process from 'child_process';


describe('iiopt --install-git-hooks', () => {
  beforeAll(() => {
    child_process.execSync('rm -f .git/hooks/pre-commit');
  });

  afterAll(() => {
    child_process.execSync('rm -f .git/hooks/pre-commit');
  });

  test('add .git/hooks/pre-commit', () => {
    const beforeExist = fs.existsSync('.git/hooks/pre-commit');
    expect(beforeExist).toBeFalsy();

    child_process.execSync('iiopt --install-git-hooks');
    const afterExist = fs.existsSync('.git/hooks/pre-commit');
    expect(afterExist).toBeTruthy();
  });
});

describe('iiopt --apply-new-files', () => {
  beforeAll(() => {
    child_process.execSync('rm -f .git/hooks/pre-commit');
    child_process.execSync('iiopt --install-git-hooks');
    child_process.execSync('mkdir test_images');
  });

  afterAll(() => {
    child_process.execSync('rm -f .git/hooks/pre-commit');
    child_process.execSync('rm -rf test_images');
    child_process.execSync('git reset HEAD test_images/illust.png');
  });

  test('commited raw images are compressed', () => {
    child_process.execSync('cp images/illust.png ./test_images/ && git add test_images/illust.png');
    const rawImage = fs.readFileSync('test_images/illust.png');
    child_process.execSync('./bin/apply_new_files');
    const compressedImage = fs.readFileSync('test_images/illust.png');

    expect(rawImage.byteLength).toBeGreaterThan(compressedImage.byteLength);
  });
});
