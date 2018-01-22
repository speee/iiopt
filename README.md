# iiopt

iiopt is a npm package that reduces the sizes of images by compressing them using [pngquant](https://pngquant.org/) and [mozjpeg](https://github.com/mozilla/mozjpeg).
The compression levels in these tools are fixed to 85.

## Install

```
$ npm install @speee/iiopt
```

## Usage

```
$ iiopt --help
  (iikanji ni)nice image optimizer

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
```

### iiopt --install-git-hooks


`iiopt --install-git-hooks` command embed the following script into the git pre-commit hook.

```.git/hooks/pre-commit
#!/bin/sh -e
npx iiopt --apply-new-files
```

`iiopt --apply-new-files` is a command that compress png and jpg images stored in the git staging area.

Notice:
Currently, also compressed images were recompressed when these were staged.
If you want to commit already compressed images, use `git commit --no-verify` to skip the git pre-commit hook.


## Images

Sample images in this repository are copied from below sites.  They are royalty-free.

- http://www.irasutoya.com/
- http://en.freejpg.com.ar/

## License

This repository is under the [MIT License](LICENSE.md).
