# iiopt

iiopt is a npm package that reduces file size by compressing images using [pngquant](https://pngquant.org/) and [mozjpeg](https://github.com/mozilla/mozjpeg).
In pngquant and mozjpeg compression level are fixed to 85.

## install

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
    $ iiopt images/sample.jpg --out-dir ./compressed # compressed images are outputed to ./compressed directory
    $ iiopt foo.png -o # overwrite foo.png with compressed image
```

## Images

Images used for sample are royalty-free.
These images are borrowed from below site.

- http://www.irasutoya.com/
- http://en.freejpg.com.ar/

## License

This repository is under the [MIT License](LICENSE.md).
