#!/usr/bin/env node
import * as fs from 'fs';
import * as meow from 'meow';
import * as Overwrite from './overwrite';
import * as OutDir from './out_dir';
import * as ApplyNewFiles from './apply_new_files';

const cli = meow(`
  Usage
    $ iiopt <file>
    $ iiopt <file> --out-dir <output>
    $ iiopt --install-git-hooks
  Option
    --install-git-hooks, install script that hooks git pre-commit to compress image automatically
    --overwrite, -o  overwrite images
    --apply-new-files, compress images before git commit.
  Example
    $ iiopt images/sample.jpg --out-dir ./compressed # compressed images, and the results are stored into ./compressed directory
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
      default: false
    },
    applyNewFiles: {
      type: 'boolean',
      default: false
    }
  }
});

if (cli.flags.installGitHooks) {
  console.log('install script that hooks git pre-commit to compress image automatically');

  const script = `#!/bin/sh -e
  npx iiopt --apply-new-files
  `;

  fs.writeFileSync('.git/hooks/pre-commit', script);
  fs.chmodSync('.git/hooks/pre-commit', '755');
  process.exit(0);
}

export function run() {
  if ( cli.flags.applyNewFiles ) {
    ApplyNewFiles.run(cli.flags);
  } else if (cli.flags.overwrite) {
    if (cli.input.length > 1) {
      console.error('only one image can overwrite');
      process.exit(1);
    }
    Overwrite.run(cli.input, cli.flags);
  } else {
    if (!cli.flags.outDir) {
      console.error('--out-dir or --overwrite parameter is needed, specify a `--overwrite`');
      process.exit(1);
    }
    OutDir.run(cli.input, cli.flags);
  }
}
