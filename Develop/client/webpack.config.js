const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'J.A.T.E'
      }),
      new WebpackPwaManifest ({
        name: "Text Editor",
        background_color: '#0000FF',
        orientation: 'portrait',
        start_url: '/',
        publicPath: '/',
        icons: [
        { 
        src: path.resolve("src/images/logo.png"), 
        sizes: [192, 512], 
        destination: path.join('assets', 'icons'),
        }
      ],
      }),
      new MiniCssExtractPlugin (),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
