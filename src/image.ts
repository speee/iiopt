import * as fs from 'fs';
import { PNG } from 'pngjs';
import * as child_process from 'child_process';

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
  isPaletteIndex() {
    return new Promise<boolean>((resolve, err) => {
      const png = new PNG();
      png.on('metadata', function(metadata) {
        resolve(metadata.palette);
      });
      fs.createReadStream(this.path).pipe(png);
    });
  }

  // NOTE:
  // The compression quality of jpeg should be 85 or less.
  // we check it by imagemagick identify command.
  // see: https://developers.google.com/web/tools/lighthouse/audits/optimize-images
  // see: http://www.imagemagick.org/script/identify.php
  isQuality85orLess() {
    return new Promise<boolean>((resolve, reject) => {
      const cmd = `identify -format "%Q" ${this.path}`;
      const shell = child_process.exec(cmd, { }, (err, stdout) => {
        if (err) { return reject(err); }
        resolve(parseInt(stdout.toString(), 10) <= 85);
        return reject(new Error('Unable to parse dimensions from output: ' + stdout.toString()));
      });
    });
  }

  // NOTE:
  // Currently, only Png image can discriminate, whether it have been optimized.
  async isOptimized() {
    if (this.isPng()) {
      return await this.isPaletteIndex();
    } else if (this.isJpg()) {
      return await this.isQuality85orLess();
    } else {
      throw new Error('Only PNG or JPG image is allowed.');
    }
  }
}
