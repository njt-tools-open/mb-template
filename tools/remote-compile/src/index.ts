#!/usr/bin/env node
import { program } from 'commander';
import { resolve } from 'path';

import { compile } from './build';
import { serve } from './serve';
import { getPackage } from './utils';

function start() {
  serve();
}

function build() {
  compile();
}

program.command('start').action(start);

program
  .command('build')
  .option('Build remote-module for production.')
  .action(build);

program
  .command('preview')
  .option('Build remote-module for preview.')
  .action(() => {
    const pkg = getPackage();
    compile({
      output: resolve(
        `../../../production/${
          pkg.remoteManifest.production
        }/dist/${pkg.name.replace(/.+\//, '')}`
      ),
    });
  });

program.parse();
