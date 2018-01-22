import * as fs from 'fs';
import * as path from 'path';
import { Image } from './image';
import { optimize } from './optimizer';

export async function run(input, opts) {
  const imagePath = input[0];
  const image = new Image(imagePath, fs.lstatSync(imagePath).size);
  const files = await optimize([imagePath], opts);
  fs.writeFileSync(imagePath, files[0].data);
  image.afterSize = files[0].data.length;
  console.log(image.compressionReport());
}
