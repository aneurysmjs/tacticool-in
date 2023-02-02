const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const React = require('react');

const paths = require('./paths');

const progressHandler = (percentage, message, ...args) => {
  // e.g. Output each progress message directly to the console:
  console.info(percentage, message, ...args);
};

module.exports = (mode) => {
  const isProd = mode === 'production';

  return {
    entry: ['./src/Main.tsx'],

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
      alias: {
        '~': paths.src,
        styles: `${paths.src}/assets/scss`,
        // @link https://gist.github.com/bvaughn/25e6233aeb1b4f0cdb8d8366e54a3977
        'react-dom$': 'react-dom/profiling',
        'scheduler/tracing': 'scheduler/tracing-profiling',
      },
    },

    module: {
      // rules for modules (configure loaders, parser options, etc.)
      rules: [
        {
          test: /\.tsx?$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: 'ts-loader',
            },
          ],
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            },
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif)$/,
          use: [
            {
              loader: 'file-loader?name=assets/img/[name].[ext]',
            },
          ],
        },
        {
          test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/', // where the fonts will go
              },
            },
          ],
        },
        {
          test: /\.(mp4|webm)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
            },
          },
        },
      ],
    },
    plugins: [
     // new webpack.ProgressPlugin(progressHandler),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: isProd ? '[name].[hash].css' : '[name].css',
        chunkFilename: isProd ? '[id].[hash].css' : '[id].css',
      }),
      new HtmlWebpackPlugin({
        // NOTE if you pass plain object it will be passed as is. no default values there, so be aware!
        // for implementation detail, please see index.js and search for "userOptions" variable
        templateParameters: (compilation, assets, assetTags, options) => {
          return {
            compilation,
            webpackConfig: compilation.options,
            htmlWebpackPlugin: {
              tags: assetTags,
              files: assets,
              options,
            },
            isProd: false,
            reactVersion: React.version,
          };
        },
        template: `${paths.src}/index.ejs`,
        minify: isProd,
      }),

      new ESLintPlugin({
        extensions: 'tsx',
        failOnError: false,
        emitError: false,
      }),
    ],
  };
};
