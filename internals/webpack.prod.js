const path = require('path');

const HtmlWebpackPLugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/index'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash].min.js',
    chunkFilename: '[name].[hash].min.js',
  },
  resolve: { extensions: ['.js', '.tsx', 'ts', '.jsx'] },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        use: 'babel-loader',
      },
    ],
  },

  plugins: [
    new HtmlWebpackPLugin({
      template: path.resolve(__dirname, '../public/index.html'),
      title: 'index',
      minify: {
        collapseBooleanAttributes: true,
      },
    }),
  ],
};
