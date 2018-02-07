import child_process from "child_process";
import fs from "fs";
import { promisify } from "util";

const execAsync = promisify(child_process.exec);
const exitAsync = promisify(fs.exists);
const unlinkAsync = promisify(fs.unlink);

describe("iiopt --install-git-hooks", () => {
  beforeAll(
    async () => await unlinkAsync(".git/hooks/pre-commit").catch(err => {})
  );

  afterAll(
    async () => await unlinkAsync(".git/hooks/pre-commit").catch(err => {})
  );

  test("add .git/hooks/pre-commit", async () => {
    const beforeExist = await exitAsync(".git/hooks/pre-commit");
    expect(beforeExist).toBeFalsy();
    await execAsync("bin/cli --install-git-hooks");
    const afterExist = await exitAsync(".git/hooks/pre-commit");
    expect(afterExist).toBeTruthy();
  });
});
