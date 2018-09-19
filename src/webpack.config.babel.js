import path from 'path';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const config = [
  {
    name: 'react-redux-multi-nprogress',
    entry: [
      './src/nprogress.css',
      './src/index.js'
    ],
    externals: {
      react: 'react',
      'react-dom': 'react-dom',
      'prop-types': 'prop-types'
    },
    output: {
      path: path.join(__dirname, '..', 'dist'),
      filename: 'react-redux-multi-nprogress.js',
      library: 'react-redux-multi-nprogress',
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
      new ExtractTextPlugin('react-redux-multi-nprogress.css')
    ]
  }
];

module.exports = config;
