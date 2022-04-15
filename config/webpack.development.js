const { merge: webpackMerge } = require('webpack-merge');

const paths = require('./paths');
const { setupCommonConfig } = require('./helpers');

module.exports = (env) => {
  const { pathToCommonConfig } = setupCommonConfig(env);

  const commonConfig = require(pathToCommonConfig)(env);

  return webpackMerge(commonConfig, {
    mode: 'development',
    devtool: 'source-map',

    output: {
      path: paths.src,
      publicPath: 'http://localhost:9000/',
      filename: '[name].bundle.js',
      sourceMapFilename: '[name].map',
    },

    devServer: {
      // By default it will use your current working directory to serve content,
      // but you can modify this to another directory
      static: paths.src,
      compress: true,
      port: 9000,
      /**
       * Basically tells the dev-server "hey! if you don't match something here,
       * the browser probable would know what to do with it"
       */
      historyApiFallback: true,
    },
  });
};
