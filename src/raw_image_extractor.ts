import { Image } from './image';

export class RawImageExtractor {
  private readonly inputImages: Image[];

  constructor(imagePaths: string[]) {
    this.inputImages = imagePaths.map(path => new Image(path));
  }

  async optimizedImages(): Promise<Image[]> {
    const paths: Image[] = [];
    for (const im of this.inputImages) {
      if (await im.isOptimized()) { paths.push(im); }
    }
    return paths;
  }

  async extract(): Promise<Image[]> {
    const optimizedImages = await this.optimizedImages();
    const rawImages = this.inputImages.filter((image) => {
      return !optimizedImages.includes(image);
    });
    return rawImages;
  }
}
