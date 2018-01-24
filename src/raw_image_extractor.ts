import { Image } from './image';

export class RawImageExtractor {
  private readonly images: Image[];

  constructor(images: Image[]) {
    this.images = images;
  }

  extract(): string[] {
    const optimizedImagePaths = this.images.filter((image) => image.isOptimized()).map((image) => image.path);
    const rawImages = this.images.filter((image) => {
      if (optimizedImagePaths.includes(image.path)) {
        console.info(`${image.path} is already optimized`);
        return false;
      } else {
        return true;
      }
    });
    if (rawImages.length === 0) {
      console.info('There are no images to need optimizing');
      process.exit(0);
    }
    return rawImages.map((image) => image.path);
  }
}
