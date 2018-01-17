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
  Option
    --overwrite, -o  overwrite images
  Example
    $ iiopt images/sample.jpg --out-dir ./compressed # compressed images, and the results are stored into ./compressed directory
    $ iiopt foo.png -o # overwrite foo.png with compressed image
```

## Images

Sample images in this repository are copied from below sites.  They are royalty-free.

- http://www.irasutoya.com/
- http://en.freejpg.com.ar/

## License

This repository is under the [MIT License](LICENSE.md).
