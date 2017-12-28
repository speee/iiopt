export class Image {
  private readonly path: string;
  private readonly beforeSize: number;
  public afterSize: number;

  constructor(path, beforeSize){
    this.path = path;
    this.beforeSize = beforeSize;
  }
}