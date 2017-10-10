import path from 'path';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

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
          use: [
            {
              loader: 'style-loader',
              options: {
                hmr: false,
                sourceMap: false
              }
            },
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                sourceMap: false
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new UglifyJSPlugin()
    ]
  }
];

module.exports = config;
