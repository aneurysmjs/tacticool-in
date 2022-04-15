const webpack = require('webpack');
const { merge: webpackMerge } = require('webpack-merge');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const paths = require('./paths');

module.exports = ({ mode }) => {
  const commonConfig = require('./webpack.common.js')(mode);

  const ENV = (process.env.NODE_ENV = mode);

  return webpackMerge(commonConfig, {
    mode: 'production',
    devtool: 'source-map',

    output: {
      path: paths.dist,
      publicPath: '/',
      filename: '[name].[hash].js',
      chunkFilename: '[id].[hash].chunk.js',
    },

    performance: {
      hints: 'warning', // enum
      maxAssetSize: 200000, // int (in bytes),
      maxEntrypointSize: 400000, // int (in bytes)
      assetFilter: (assetFilename) =>
        // Function predicate that provides asset filenames
        assetFilename.endsWith('.css') || assetFilename.endsWith('.js'),
    },

    optimization: {
      minimizer: [new CssMinimizerPlugin()],
    },

    plugins: [
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer',
      }),

      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(ENV),
      }),

      new CompressionPlugin({
        test: /\.(png|jpe?g|gif)$/,
      }),
    ],
    // externals: {
    //   react: 'React',
    //   'react-dom': 'ReactDOM',
    // },
  });
};
