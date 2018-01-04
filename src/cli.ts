#!/usr/bin/env node

import * as meow from 'meow';
import * as imagemin from 'imagemin';
import * as imageminPngquant from 'imagemin-pngquant';
import * as imageminMozjpeg from 'imagemin-mozjpeg';
import * as fs from 'fs';
import * as glob from 'glob';
import { Image } from './image';

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
  if ( !opts.outDir && !opts.overwrite ) {
    console.error('--out-dir or --overwrite parameter is needed, specify a `--overwrite`');
    process.exit(1);
  }

  const images = glob.GlobSync(input).found.map((path) => {
    return new Image(path, fs.lstatSync(path).size)
  });

  imagemin([input], opts.outDir, {
    plugins: [
      imageminPngquant({ quality: 85 }),
      imageminMozjpeg({ progressive: true, quality: 85 })
    ]
  }).then(files => {
    files.forEach((file) => {
      console.log(file);
      if (!opts.outDir && opts.overwrite) {
        fs.writeFileSync(input, file.data);
      }
    });
  });
}

run(cli.input[0], cli.flags);
