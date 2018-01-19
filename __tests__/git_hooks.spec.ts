import fs from 'fs';
import child_process from 'child_process';

function unlink() {
  try {
    fs.unlinkSync('.git/hooks/pre-commit');
  } catch (err) {}
}


describe('iiopt --install-git-hooks', () => {
  beforeAll(() => unlink());
  afterAll(() => unlink());

  test('add .git/hooks/pre-commit', () => {
    const beforeExist = fs.existsSync('.git/hooks/pre-commit');
    expect(beforeExist).toBeFalsy();

    child_process.execSync('bin/cli --install-git-hooks');
    const afterExist = fs.existsSync('.git/hooks/pre-commit');
    expect(afterExist).toBeTruthy();
  });
});

describe('iiopt --apply-new-files', () => {
  beforeAll(() => {
    unlink();
    child_process.execSync('bin/cli --install-git-hooks');
    try { fs.mkdirSync('test_images'); } catch (err) {}
  });

  afterAll(() => {
    unlink();
    child_process.execSync('git reset HEAD test_images/illust.png');
    child_process.execSync('rm -rf test_images');
  });

  test('commited raw images are compressed', () => {
    // NOTE: fs.copyFile function is supported in node version 8.x
    // we support node version larger than 6.x
    const image = fs.readFileSync('images/sample.jpg');
    fs.writeFileSync('./test_images/sample.jpg', image);
    child_process.execSync('git add test_images/sample.jpg');
    const rawImage = fs.readFileSync('test_images/sample.jpg');
    child_process.execSync('bin/cli --apply-new-files');
    const compressedImage = fs.readFileSync('test_images/sample.jpg');
    expect(rawImage.byteLength).toBeGreaterThan(compressedImage.byteLength);
  });
});
