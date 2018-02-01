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

function installGitHooks() {
  console.log('install script that hooks git pre-commit to compress image automatically');
  const script = `#!/bin/sh -e
  npx iiopt --apply-new-files
  `;
  fs.writeFile('.git/hooks/pre-commit', script, { mode: 0o755 } , (err) => {
    if (err) { throw err; }
  });
}

export async function run() {
  const reports: string[] = [];
  try {
    if ( cli.flags.installGitHooks ) {
      installGitHooks();
    } else if ( cli.flags.applyNewFiles ) {
      reports.push(...(await ApplyNewFiles.run(cli.flags)));
    } else if (cli.flags.overwrite) {
      if (cli.input.length > 1) { throw new Error('only one image can overwrite'); }
      reports.push(await Overwrite.run(cli.input, cli.flags));
    } else {
      if (!cli.flags.outDir) { throw new Error('--out-dir or --overwrite parameter is needed, specify a `--overwrite`'); }
      reports.push(...(await OutDir.run(cli.input, cli.flags)));
    }
    reports.forEach((report) => console.log(report));
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}
