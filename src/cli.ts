#!/usr/bin/env node

import * as meow from 'meow';
import * as imagemin from 'imagemin';
import * as imageminPngquant from 'imagemin-pngquant';
import * as imageminMozjpeg from 'imagemin-mozjpeg';
import * as fs from 'fs';
import * as glob from 'glob';
import { Image } from './image';
import * as path from 'path';
import * as Overwrite from './overwrite';

const cli = meow(`
  Usage
    $ iiopt <file>
    $ iiopt <file> --out-dir <output>
  Option
    --overwrite, -o  overwrite images
  Example
    $ iiopt images/sample.jpg --out-dir ./compressed # compressed images are outputed to ./compressed directory
    $ iiopt foo.png -o # overwrite foo.png with compressed image
`, {
	flags: {
		overwrite: {
      type: 'boolean',
      alias: 'o',
      default: false
		}
	}
})

function run(input, opts){
  const images = input.map((path) => {
    return new Image(path, fs.lstatSync(path).size)
  });

  imagemin(input, opts.outDir, {
    plugins: [
      imageminPngquant({ quality: 85 }),
      imageminMozjpeg({ progressive: true, quality: 85 })
    ]
  }).then(files => {
    files.forEach((file) => {
      const image = images.find((image) => {
        return path.basename(image.path) == path.basename(file.path);
      });
      image.afterSize = file.data.length
    });
    return images;
  }).then((images)=>{
    images.forEach((image) => {
      console.log(image.compressionReport());
    })
  });
}

if ( !cli.flags.outDir && !cli.flags.overwrite ) {
  console.error('--out-dir or --overwrite parameter is needed, specify a `--overwrite`');
  process.exit(1);
}

if (cli.input.length > 1 && cli.flags.overwrite){
  console.error('only one image can overwrite');
  process.exit(1);
}

if (cli.flags.overwrite) {
  Overwrite.run(cli.input[0], cli.flags);
} else {
  run(cli.input, cli.flags);
}