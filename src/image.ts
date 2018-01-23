import * as fs from 'fs';
import { PNG } from 'pngjs';

export class Image {
  public readonly path: string;
  private readonly beforeSize: number;
  afterSize: number;

  constructor(path) {
    this.path = path;
    this.beforeSize = fs.lstatSync(path).size;
  }

  compressionReport() {
    return `
    path: ${this.path}
    before file size: ${this.beforeSize}
    after file size: ${this.afterSize}
    `;
  }

  isPng() {
    return /.png$/.test(this.path);
  }

  isJpg() {
    return /.jpg$/.test(this.path);
  }

  // NOTE:
  // If this function returns true value, the image is already optimized.
  // see https://www.w3.org/TR/PNG-Chunks.html
  isPaletteIndex(): boolean {
    const data = fs.readFileSync(this.path);
    const png = new PNG.sync.read(data);
    const colorType = png.colorType;
    return colorType === 3;
  }

  // NOTE:
  // Currently, only Png image can discriminate, whether it have been optimized.
  isOptimized(): boolean {
    if (this.isPng()) {
      return this.isPaletteIndex();
    } else if (this.isJpg()) {
      return false;
    } else {
      process.exit(1);
      return false;
    }
  }
}
