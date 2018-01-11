#!/usr/bin/env node
import * as meow from 'meow';
import * as Overwrite from './overwrite';
import * as Compression from './compression';

const cli = meow(`
  Usage
    $ iiopt <file>
    $ iiopt <file> --out-dir <output>
    $ iiopt --install-git-hooks
  Option
    --install-git-hooks, install script that hooks git pre-commit to compress image automatically
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
    },
    installGitHooks: {
      type: 'boolean',
      alias: 'i',
      default: false
    }
  }
});

if (cli.flags.installGitHooks) {
  console.log('install script that hooks git pre-commit to compress image automatically');
  process.exit(0);
}

if (!cli.flags.outDir && !cli.flags.overwrite) {
  console.error('--out-dir or --overwrite parameter is needed, specify a `--overwrite`');
  process.exit(1);
}

if (cli.input.length > 1 && cli.flags.overwrite) {
  console.error('only one image can overwrite');
  process.exit(1);
}

export function run() {
  if (cli.flags.overwrite) {
    Overwrite.run(cli.input[0], cli.flags);
  } else {
    Compression.run(cli.input, cli.flags);
  }
}
