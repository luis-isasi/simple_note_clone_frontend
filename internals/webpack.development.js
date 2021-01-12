const path = require('path');

const HtmlWebpackPLugin = require('html-webpack-plugin');
module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/index'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].min.js',
  },
  mode: 'development',
  resolve: { extensions: ['.js', '.tsx', 'ts'] },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        use: 'babel-loader',
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    port: 9000,
    open: true,
    historyApiFallback: true,
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
