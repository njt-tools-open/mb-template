import { readFileSync } from 'fs';
// import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path, { resolve } from 'path';

const SystemJSPublicPathWebpackPlugin = require('systemjs-webpack-interop/SystemJSPublicPathWebpackPlugin');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');

const cssRegex = /\.(css)$/;

const getPackage = () =>
  JSON.parse(
    readFileSync(resolve('./package.json'), { encoding: 'utf8' }) as string
  );

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const formatWebpackConfig = (config: PluginCompileConfigModel) => {
  const isProd = config.mode === 'production';

  const plugins = [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new SimpleProgressWebpackPlugin(),
    new SystemJSPublicPathWebpackPlugin({
      // optional: defaults to 1
      // If you need the webpack public path to "chop off" some of the directories in the current module's url, you can specify a "root directory level". Note that the root directory level is read from right-to-left, with `1` indicating "current directory" and `2` indicating "up one directory":
      rootDirectoryLevel: 1,

      // ONLY NEEDED FOR WEBPACK 1-4. Not necessary for webpack@5
      systemjsModuleName: getPackage().name,
    }),
  ];
  // if (!isProd) {
  //   plugins.push(
  //     new webpack.SourceMapDevToolPlugin({
  //       append: `\n//# sourceMappingURL=${config.publicPath}/[url]`,
  //       filename: '[name][ext].map',
  //     })
  //   );
  // }
  return {
    mode: process.env.NODE_ENV,
    entry: config.entry,
    devServer: {
      compress: isProd,
      allowedHosts: 'all',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers':
          'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild',
      },
      static: {
        directory: path.resolve('public'),
      },
    },
    output: {
      publicPath: isProd ? './' : undefined,
      filename: '[name].js',
      path: config.output,
      libraryTarget: 'system',
      clean: true,
    },
    optimization: {
      minimize: isProd,
    },
    devtool: !isProd ? 'inline-source-map' : undefined,
    plugins,
    performance: {
      maxEntrypointSize: 2000000,
      maxAssetSize: 2000000,
    },
    resolve: {
      extensions: ['.ts'],
    },
    module: {
      rules: [
        {
          test: /\.(js|mjs)$/,
          loader: require.resolve('babel-loader'),
          options: {
            cacheDirectory: true,
            cacheCompression: false,
            compact: false,
            // sourceMap: !isProd(config.mode),
          },
        },
        {
          test: /\.ts?$/,
          use: [require.resolve('babel-loader'), require.resolve('ts-loader')],
          parser: {
            system: false,
          },
          // options: {
          //   sourceMap: !isProd(config.mode),
          // },
        },
        {
          test: cssRegex,
          sideEffects: true,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: require.resolve('css-loader'),
              // options: {
              //   esModule: true,
              //   importLoaders: 1,
              //   // sourceMap: !isProd(config.mode),
              //   modules: {
              //     mode: 'local',
              //   },
              // },
            },
            {
              loader: require.resolve('postcss-loader'),
              options: {
                postcssOptions: {
                  plugins: ['postcss-preset-env'],
                },
              },
            },
          ],
        },
      ],
    },
  };
};
