import child_process from "child_process";
import fs from "fs";

function unlink() {
  try {
    fs.unlinkSync(".git/hooks/pre-commit");
  } catch (err) {}
}

describe("iiopt --install-git-hooks", () => {
  beforeAll(() => unlink());
  afterAll(() => unlink());

  test("add .git/hooks/pre-commit", () => {
    const beforeExist = fs.existsSync(".git/hooks/pre-commit");
    expect(beforeExist).toBeFalsy();

    child_process.execSync("bin/cli --install-git-hooks");
    const afterExist = fs.existsSync(".git/hooks/pre-commit");
    expect(afterExist).toBeTruthy();
  });
});
