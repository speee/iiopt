import { Image } from "./image";

export class RawImageExtractor {
  private readonly images: Image[];

  constructor(imagePaths: string[]) {
    this.images = imagePaths.map(path => new Image(path));
  }

  async optimizedImages(): Promise<Image[]> {
    const paths: Image[] = [];
    for (const im of this.images) {
      if (await im.isOptimized()) {
        paths.push(im);
      }
    }
    return paths;
  }

  async extract(): Promise<Image[]> {
    const optimizedImages = await this.optimizedImages();
    return this.images.filter(image => {
      return !optimizedImages.includes(image);
    });
  }
}
