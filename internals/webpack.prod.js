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
        include: path.join(__dirname, '../src/'),
        exclude: /node_modules/,
        test: /\.(tsx|ts)$/,
        use: 'babel-loader',
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
      {
        test: /\.png|jpe?g|gif|mp4|svg|webm$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 90000,
          },
        },
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
