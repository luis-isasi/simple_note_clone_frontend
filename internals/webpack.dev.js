const path = require('path');

const HtmlWebpackPLugin = require('html-webpack-plugin');
module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/index'),
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].min.js',
  },
  devtool: 'source-map',
  mode: 'development',
  resolve: { extensions: ['.js', '.tsx', 'ts', '.jsx'] },
  module: {
    rules: [
      {
        include: path.join(__dirname, '../src/'),
        exclude: /node_modules/,
        test: /\.(tsx|ts)$/,
        use: 'babel-loader',
      },
    ],
  },
  devServer: {
    publicPath: '/',
    contentBase: path.resolve(__dirname, '../public/img'),
    port: 9000,
    open: true,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPLugin({
      template: path.resolve(__dirname, '../public/index.html'),
      publicPath: '/',
      title: 'index',
      minify: {
        collapseBooleanAttributes: true,
      },
    }),
  ],
};
