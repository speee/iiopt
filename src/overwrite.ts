import * as fs from "fs";
import { promisify } from "util";
import { optimize } from "./optimizer";
import { RawImageExtractor } from "./raw_image_extractor";

const writeFileAsync = promisify(fs.writeFile);

export async function run(input, opts): Promise<string> {
  const rawImages = await new RawImageExtractor(input).extract();
  const image = rawImages[0];
  if (!image) {
    throw new Error(`${input[0]} is already optimized`);
  }

  const rawImagePath = image.path;
  const files = await optimize([rawImagePath], opts);
  await writeFileAsync(rawImagePath, files[0].data);
  image.afterSize = files[0].data.length;
  return image.compressionReport();
}
