#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var styleDocDown = require('../');
var minimist = require('minimist');

function usage (code) {
  var r = fs.createReadStream(__dirname + '/usage.txt');
  r.pipe(process.stdout);
  if (code) {
    r.on('end', function () {
      process.exit(code)
    });
  }
}

var argv = minimist(process.argv.slice(2), {
  alias: {h: 'help'}
});

if (argv.help) {
  return usage(0);
}

var files = argv._.map(function (file) {
  return path.resolve(file);
});

var md = '';
files.forEach(function (file) {
  var data = fs.readFileSync(file, 'utf8');
  md += styleDocDown.parse(data);
});

process.stdout.write(md);
