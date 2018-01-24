import { Image } from './image';

export class RawImageExtractor {
  private readonly images: Image[];
  private readonly imagePaths: string[];

  constructor(images: Image[], imagePaths: string[]) {
    this.images = images;
    this.imagePaths = imagePaths;
  }

  extract(): string[] {
    const optimizedImagePaths = this.images.filter((image) => image.isOptimized()).map((image) => image.path);
    const rawImagePath = this.imagePaths.filter((imagePath) => {
      if (optimizedImagePaths.includes(imagePath)) {
        console.info(`${imagePath} is already optimized`);
        return false;
      } else {
        return true;
      }
    });
    if (rawImagePath.length === 0) {
      console.info('There are no images to need optimizing');
      process.exit(0);
    }
    return rawImagePath;
  }
}
