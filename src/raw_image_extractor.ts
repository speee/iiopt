import { Image } from './image';

export class RawImageExtractor {
  private readonly images: Image[];

  constructor(images: Image[]) {
    this.images = images;
  }

  async optimizedImages(): Promise<string[]> {
    return await
      Promise.all(this.images.map(async (im) => (await im.isOptimized()) ? im : null))
        .then(images => images.filter(im => im !== null))
        .then((images) => images.map(image => image.path));
  }

  async extract(): Promise<string[]> {
    const optimizedImagePaths = await this.optimizedImages();
    const rawImages = this.images.filter((image) => !optimizedImagePaths.includes(image.path));
    return rawImages.map((image) => image.path);
  }
}
