import { execSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

import { formatWebpackConfig } from './webpack-main';

const systemjsInterop = require('systemjs-webpack-interop/webpack-config');
const { merge } = require('webpack-merge');

export const getPackage = () =>
  JSON.parse(
    readFileSync(resolve('./package.json'), { encoding: 'utf8' }) as string
  );

export const createManifestFile = (filename: string) => {
  const {
    name,
    version,
    description,
    remoteManifest: { type, icon, displayName },
  } = getPackage();

  const manifestJson = {
    name,
    version,
    displayName,
    description,
    type,
    icon,
    hash: execSync('git rev-parse HEAD').toString().trim(),
  };

  writeFileSync(filename, JSON.stringify(manifestJson, null, 2));
};

export const getCustomWebpackConfig = (): any => {
  const customConfigPath = resolve('webpack.config.merge.js');
  const config = {};
  if (existsSync(customConfigPath)) {
    const webpackConfigCustom = require(customConfigPath);
    Object.assign(config, webpackConfigCustom);
  }
  return config;
};

export interface CompileConfigOptiosn {
  output?: string;
}

export const handlePluginCompileConfig = (
  options: CompileConfigOptiosn = {}
): any => {
  const { output } = options;
  const { name, version } = getPackage();
  return formatWebpackConfig({
    mode: process.env.NODE_ENV,
    publicPath: name,
    name,
    version,
    output: output ?? resolve('dist'),
    entry: resolve('src/main'),
  });
};

export const createWebpackConfig = (...configs: any[]): any => {
  const webpackConfig = merge(...configs);

  return systemjsInterop.modifyWebpackConfig(webpackConfig);
};
