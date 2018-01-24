import { Image } from './image';

export class RawImageExtractor {
  private readonly images: Image[];
  private readonly imagePath: string[];

  constructor(images: Image[], imagePaths: string[]) {
    this.images = images;
    this.imagePath = imagePaths;
  }

  extract(): string[] {
    const optimizedImagePaths = this.images.filter((image) => image.isOptimized()).map((image) => image.path);
    return this.imagePath.filter((imagePath) => {
      if (optimizedImagePaths.includes(imagePath)) {
        console.error(`${imagePath} is already optimized`);
        return false;
      } else {
        return true;
      }
    });
  }
}
