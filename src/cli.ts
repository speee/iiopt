#!/usr/bin/env node
import * as fs from 'fs';
import * as meow from 'meow';
import * as Overwrite from './overwrite';
import * as Compression from './compression';
import * as GitHookCommand from './git_hook_command';

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
  fs.linkSync('bin/apply_new_files', '.git/hooks/pre-commit');
  process.exit(0);
}

export function run() {
  if ( cli.flags.applyNewFiles ) {
    console.log('image compression via git pre-commit hook');
    GitHookCommand.run();
  } else if (cli.flags.overwrite) {
    if (cli.input.length > 1) {
      console.error('only one image can overwrite');
      process.exit(1);
    }
    Overwrite.run(cli.input[0], cli.flags);
  } else {
    if (!cli.flags.outDir) {
      console.error('--out-dir or --overwrite parameter is needed, specify a `--overwrite`');
      process.exit(1);
    }
    Compression.run(cli.input, cli.flags);
  }
}
