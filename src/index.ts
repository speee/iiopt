import * as meow from 'meow';

const cli = meow(`
  Usage
    $ iiopt <file>
    $ iiopt <file> > <output>
  Example
    $ iiopt foo.png # overwrite foo.png with compressed image
    $ iiopt foo.png > compressed-foo.png
`)

function run(input, opt){
  console.log()
  return input;
}

run(cli.input, cli.flags);
