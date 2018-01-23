import * as fs from 'fs';

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

  IsPaletteIndex(): boolean {
    return true;
  }

  needsToOptimize(): boolean {
    if (this.isPng()) {
      return this.IsPaletteIndex();
    } else if (this.isJpg()) {
      return true;
    } else {
      process.exit(1);
      return false;
    }
  }
}
