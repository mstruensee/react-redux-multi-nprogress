import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { optimize } from 'webpack';

const { UglifyJsPlugin } = optimize;

const config = {
  devtool: 'cheap-module-source-map',
  name: 'react-redux-spinner-example',
  entry: [
    './example/index.js'
  ],
  output: {
    path: path.join(__dirname, '..', 'dist-example'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [ __dirname, path.join(__dirname, '..', 'src/') ],
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'head'
    })
  ]
};

if (process.env.NODE_ENV !== 'development') {
  config.plugins.push(new UglifyJsPlugin({
    output: {
      comments: false
    }
  }));
}

module.exports = config;
