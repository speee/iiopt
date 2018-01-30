import { Image } from './image';

export class RawImageExtractor {
  private readonly images: Image[];

  constructor(images: Image[]) {
    this.images = images;
  }

  async optimizedImages(): Promise<string[]> {
    const paths: string[] = [];
    for (const im of this.images) {
      if (await im.isOptimized()) {
        paths.push(im.path);
      }
    }
    return paths;
  }

  async extract(): Promise<string[]> {
    const optimizedImagePaths = await this.optimizedImages();
    const rawImages = this.images.filter((image) => !optimizedImagePaths.includes(image.path));
    return rawImages.map((image) => image.path);
  }
}
