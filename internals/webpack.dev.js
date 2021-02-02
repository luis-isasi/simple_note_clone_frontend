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
  resolve: {
    extensions: ['.js', '.tsx', '.ts', '.jsx', '.graphql'],
    alias: {
      Components: path.resolve(__dirname, '../src/Components/'),
      Images: path.resolve(__dirname, '../src/Images/'),
      Constants: path.resolve(__dirname, '../src/Constants.ts'),
      Context: path.resolve(__dirname, '../src/Context/'),
      Page: path.resolve(__dirname, '../src/Page/'),
      ContextApp: path.resolve(__dirname, '../src/Page/Application/context/'),
      TypesApp: path.resolve(__dirname, '../src/Page/Application/TypesApp.ts'),
      GraphqlApp: path.resolve(__dirname, '../src/Page/Application/graphql/'),
      StylesApp: path.resolve(
        __dirname,
        '../src/Page/Application/StylesApp.tsx'
      ),
    },
  },
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
        test: /\.(png|jpe?g|jpg|gif|svg)$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 90000,
          },
        },
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
