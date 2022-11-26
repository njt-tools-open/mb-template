import webpack from 'webpack';

const NODE_ENV = 'production';

import {
  CompileConfigOptiosn,
  createManifestFile,
  createWebpackConfig,
  getCustomWebpackConfig,
  handlePluginCompileConfig,
} from './utils';

function build(options: CompileConfigOptiosn = {}): Promise<string> {
  return new Promise((resolve, reject) => {
    const webpackConfig = createWebpackConfig(
      getCustomWebpackConfig(),
      handlePluginCompileConfig(options)
    );

    const compiler = webpack(webpackConfig);

    compiler.run((error: any, stats: any) => {
      if (error) {
        // let errMessage = error.message;
        reject(error);
        return;
      }
      if (stats?.hasErrors()) {
        reject(stats?.toString({ all: false, warnings: false, errors: true }));
        return;
      }
      createManifestFile(`${webpackConfig.output.path}/remote-manifest.json`);
      resolve('complete');
    });
  });
}

export const compile = (
  options: CompileConfigOptiosn = {}
): Promise<string> => {
  process.env.NODE_ENV = NODE_ENV;
  process.env.BABEL_ENV = NODE_ENV;

  return new Promise((resolve, reject) => {
    build(options)
      .then(message => {
        resolve(message);
      })
      .catch(error => {
        console.log('[DEMO ENGINE]:', error);
        reject(error);
      });
  });
};
