"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var meow = require("meow");
var cli = meow("\n  Usage\n    $ iiopt <file>\n    $ iiopt <file> > <output>\n  Example\n    $ iiopt foo.png # overwrite foo.png with compressed image\n    $ iiopt foo.png > compressed-foo.png\n");
function run(input, opt) {
    console.log(input);
    return input;
}
run(cli.input, cli.flags);
