import path from 'path';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const config = [
  {
    name: 'react-redux-spinner',
    entry: [
      './src/nprogress.css',
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
          test: /\.js$/,
          include: [ __dirname ],
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            }
          })
        }
      ]
    },
    plugins: [
      new UglifyJSPlugin(),
      new ExtractTextPlugin('react-redux-spinner.css')
    ]
  }
];

module.exports = config;
