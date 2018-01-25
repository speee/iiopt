import { Image } from './image';

export class RawImageExtractor {
  private readonly images: Image[];

  constructor(images: Image[]) {
    this.images = images;
  }

  extract(): string[] {
    const optimizedImagePaths = this.images.filter((image) => image.isOptimized()).map((image) => image.path);
    const rawImages = this.images.filter((image) => !optimizedImagePaths.includes(image.path));
    return rawImages.map((image) => image.path);
  }
}
