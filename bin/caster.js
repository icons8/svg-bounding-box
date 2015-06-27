#!/usr/bin/env node

const
  EXIT_ERROR = 1;

var
  Path = require('path'),
  Caster = require('..'),
  execPath;

if (['-h', '--help'].indexOf(process.argv[2]) != -1) {
  execPath = Path.relative(process.cwd(), process.argv[1]);
  if (['.', Path.sep].indexOf(execPath[0]) == -1) {
    execPath = '.' + Path.sep + execPath;
  }

  process.stdout.write('Example: echo "<g transform=\\"scale(1.1,-1.2)\\"><ellipse rx=\\"1.1\\" ry=\\".1e2\\" /><path d=\\"M0,0 L10-10\\"/></g>" | ' + execPath + ' \n');
  process.exit();
}

var
  svg = '';

process.stdin.setEncoding('utf8');

process.stdin.on('readable', function() {
  var
    chunk = process.stdin.read();

  if (chunk !== null) {
    svg += chunk;
  }
});

process.stdin.on('end', function() {

  function errorHandler(e) {
    process.stderr.write(String(e) + '\n');
    process.exit(EXIT_ERROR);
  }

  try {
    Caster(svg)
      .then(function(result) {
        process.stdout.write(result + '\n');
      })
      .catch(errorHandler);
  }
  catch(e) {
    errorHandler(e);
  }

});