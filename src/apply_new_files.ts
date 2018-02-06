import * as child_process from "child_process";
import * as fs from "fs";
import { promisify } from "util";
import * as gitDiff from "./git_diff";
import { optimize } from "./optimizer";
import { RawImageExtractor } from "./raw_image_extractor";

const writeFileAsync = promisify(fs.writeFile);
const execAsync = promisify(child_process.exec);

export async function run(opts): Promise<string[]> {
  const imagePaths = await gitDiff.extractAmongCache();
  if (imagePaths.length === 0) {
    return [];
  }
  const rawImages = await new RawImageExtractor(imagePaths).extract();
  if (rawImages.length === 0) {
    return [];
  }

  // NOTE:
  // By using imagemin, returned value from optimize function doesn't have a path property when the image is overwrited.
  // So we optimize images one by one.
  const results: string[] = [];
  for (const image of rawImages) {
    const files = await optimize([image.path], opts);
    await writeFileAsync(image.path, files[0].data);
    image.afterSize = files[0].data.length;
    await execAsync(`git add ${image.path}`);
    results.push(image.compressionReport());
  }
  return results;
}
