module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            configFile: false,
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript',
              ['@babel/preset-react', { runtime: 'automatic' }],
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-proposal-private-methods',
              '@babel/plugin-proposal-private-property-in-object',
              '@babel/plugin-syntax-dynamic-import',
            ],
          },
        },
      },
    ],
  },
  externals: {
    react: 'react@18.2.0',
    'react-dom': 'react-dom@18.2.0',
    i18next: 'i18next@22.0.6',
    'react-i18next': 'react-i18next@12.0.0',
    antd: 'antd@4.24.8',
  },
};
