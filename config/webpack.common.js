const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const React = require('react');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer'); // help tailwindcss to work

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
        // NOTE: eslint-loader is DEPRECATED
        // {
        //   test: /\.tsx?$/, // both .ts and .tsx
        //   loader: 'eslint-loader',
        //   enforce: 'pre',
        //   options: {
        //     fix: false
        //   }
        // },
        {
          test: /\.tsx?$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: 'babel-loader',
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
              loader: 'postcss-loader', // Run post css actions
              options: {
                // @se https://github.com/webpack-contrib/postcss-loader#postcssoptions
                // @see https://github.com/webpack-contrib/postcss-loader/blob/master/CHANGELOG.md#400-2020-09-07
                postcssOptions: {
                  plugins: [tailwindcss, autoprefixer],
                },
              },
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
      ],
    },
    plugins: [
      new webpack.ProgressPlugin(progressHandler),
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
            isProd,
            reactVersion: React.version,
          };
        },
        template: `${paths.src}/index.ejs`,
        minify: isProd,
      }),
      // copy files and folders to specific paths.
      // new CopyWebpackPlugin({
      //   // Copy `assets` contents to {output}/assets/
      //   patterns: [
      //     {
      //       from: 'src/assets',
      //       to: 'assets',
      //     },
      //   ],
      // }),

      new ESLintPlugin({
        extensions: 'tsx',
        failOnError: false,
      }),
    ],
  };
};
