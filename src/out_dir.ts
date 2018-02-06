import * as path from "path";
import { optimize } from "./optimizer";
import { RawImageExtractor } from "./raw_image_extractor";

export async function run(input, opts) {
  const rawImages = await new RawImageExtractor(input).extract();
  if (rawImages.length === 0) {
    throw new Error("There are no images to optimize");
  }

  const files = await optimize(rawImages.map(image => image.path), opts);
  return files.map(file => {
    const compressedImage = rawImages.find(image => {
      return path.basename(image.path) === path.basename(file.path);
    })!;

    compressedImage.afterSize = file.data.length;
    return compressedImage.compressionReport();
  });
}
