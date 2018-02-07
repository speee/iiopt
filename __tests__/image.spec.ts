import child_process from "child_process";
import { Image } from "../src/image";

describe("constructer", () => {
  it("Image need filepath and filesize", () => {
    const image = new Image("./images/sample.jpg");
    expect(image).toBeInstanceOf(Image);
  });
});

describe("needsToOptimize", () => {
  it("if optimized png image is given", async () => {
    const image = new Image("./images/illust.png");
    await expect(image.isOptimized()).resolves.toBeFalsy();
  });

  it("if not optimized png image is given", async () => {
    const image = new Image("./images/illust_optimized.png");
    await expect(image.isOptimized()).resolves.toBeTruthy();
  });

  it("if optimized jpeg image is given", async () => {
    const image = new Image("./images/sample_optimized.jpg");
    await expect(image.isOptimized()).resolves.toBeTruthy();
  });

  it("if not optimized jpeg image is given", async () => {
    const image = new Image("./images/sample.jpg");
    await expect(image.isOptimized()).resolves.toBeFalsy();
  });

  it("if not image file is given", () => {
    expect.assertions(1);
    const image = new Image("./LICENSE.md");
    return expect(image.isOptimized()).rejects.toEqual(
      new Error("Only PNG or JPG image is allowed.")
    );
  });
});
