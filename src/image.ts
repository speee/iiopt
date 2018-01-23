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
}
