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
