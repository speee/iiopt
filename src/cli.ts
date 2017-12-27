import * as meow from 'meow';
import * as imagemin from 'imagemin';
import * as imageminPngquant from 'imagemin-pngquant';
import * as imageminMozjpeg from 'imagemin-mozjpeg';
import * as fs from 'fs';

const cli = meow(`
  Usage
    $ iiopt <file>
    $ iiopt <file> > <output>
  Example
    $ iiopt foo.png # overwrite foo.png with compressed image
`)

function run(input, opts){
  imagemin([input], './compressed', {
    plugin: [
      imageminPngquant({ quality: 85 }),
      imageminMozjpeg({ progressive: true, quality: 85 })
    ]
  }).then(files => {
    fs.writeFileSync('compressed.png', files[0].data);
  });
}

run(cli.input[0], cli.flags);
