#!/usr/bin/env node
import { resolve } from 'path';

import { program } from 'commander';
import { serve } from './serve';
import { compile } from './build';
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
