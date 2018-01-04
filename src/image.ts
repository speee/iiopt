export class Image {
  public readonly path: string
  private readonly beforeSize: number;
  afterSize: number;

  constructor(path, beforeSize){
    this.path = path;
    this.beforeSize = beforeSize;
  }

  compressionReport(){
    return `
    path: ${this.path}
    before file size: ${this.beforeSize}
    after file size: ${this.afterSize}
    `
  }
}
