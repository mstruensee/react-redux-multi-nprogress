import path from 'path';
import { optimize } from 'webpack';

const { UglifyJsPlugin } = optimize;

const config = [
  {
    name: 'react-redux-spinner',
    entry: [
      './src/index.js'
    ],
    externals: {
      react: 'react',
      'react-dom': 'ReactDOM'
    },
    output: {
      path: path.join(__dirname, '..', 'dist'),
      filename: 'react-redux-spinner.js',
      library: 'react-redux-spinner',
      libraryTarget: 'umd',
      publicPath: '/dist/'
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: [ __dirname ],
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader'
        }
      ]
    },
    plugins: [
      new UglifyJsPlugin({
        output: {
          comments: false
        }
      }),
    ]
  }
];

module.exports = config;
