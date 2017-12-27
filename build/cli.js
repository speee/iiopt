#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var meow = require("meow");
var imagemin = require("imagemin");
var imageminPngquant = require("imagemin-pngquant");
var imageminMozjpeg = require("imagemin-mozjpeg");
var fs = require("fs");
var cli = meow("\n  Usage\n    $ iiopt <file>\n    $ iiopt <file> > <output>\n  Example\n    $ iiopt foo.png # overwrite foo.png with compressed image\n");
function run(input, opts) {
    imagemin([input], opts.outDir, {
        plugins: [
            imageminPngquant({ quality: 85 }),
            imageminMozjpeg({ progressive: true, quality: 85 })
        ]
    }).then(function (files) {
        if (!opts.outDir) {
            fs.writeFileSync(input, files[0].data);
        }
    });
}
run(cli.input[0], cli.flags);
