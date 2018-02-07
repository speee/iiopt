import child_process from "child_process";
import execa from "execa";
import fs from "fs";

describe("help message", () => {
  test("show help screen", () => {
    const helpMessage = execa.shellSync("bin/cli --help");
    expect(helpMessage.stdout).toMatch(/nice/);
  });
});

describe("confirm flags and options of cli", () => {
  test("raise error if both --out-dir option and --overwrite are not given.", () => {
    try {
      execa.shellSync("bin/cli images/illust.png");
    } catch (error) {
      expect(error.message).toMatch(
        "--out-dir or --overwrite parameter is needed, specify a `--overwrite`"
      );
    }
  });
});
