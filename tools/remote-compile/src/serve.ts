import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import {
  createWebpackConfig,
  getCustomWebpackConfig,
  getPackage,
  handlePluginCompileConfig,
} from './utils';

const NODE_ENV = 'development';

function start(): Promise<string> {
  return new Promise((resolve, reject) => {
    const webpackConfig = createWebpackConfig(
      getCustomWebpackConfig(),
      handlePluginCompileConfig()
    );
    const compiler = webpack(webpackConfig);
    const port = getPackage().remoteManifest.port;
    const server = new WebpackDevServer(
      { ...webpackConfig.devServer, port },
      compiler
    );

    try {
      console.log('[DEMO ENGINE]', 'Starting server...');
      server.start();
      resolve('Start demo success');
    } catch (error) {
      reject(error);
    }
  });
}

const getLengthSpaces = length => Array.from({ length }, () => ' ').join('');

const formatTitleStyle = (name: string) =>
  `\u001b[36m\u001b[1m${name}\u001b[22m\u001b[39m`;

const getDemoHeader = name => {
  const spaces = 54;
  const prefix = Math.floor((spaces - name.length) / 2);
  const suffix = spaces - prefix - name.length;
  const titleLine = `*${getLengthSpaces(prefix)}${formatTitleStyle(
    name
  )}${getLengthSpaces(suffix)}*`;
  return `

********************************************************
*                                                      *
${titleLine}
*                                                      *
********************************************************

`;
};

export const serve = (): Promise<string> => {
  process.env.NODE_ENV = NODE_ENV;
  process.env.BABEL_ENV = NODE_ENV;

  const { name } = getPackage();

  console.log(getDemoHeader(name));

  return new Promise((resolve, reject) => {
    start()
      .then(message => {
        resolve(message);
      })
      .catch(error => {
        console.log('[DEMO ENGINE]:', error);
        reject(error);
      });
  });
};
