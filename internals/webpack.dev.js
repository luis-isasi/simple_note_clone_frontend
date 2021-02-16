const path = require('path');

const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
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
      Hooks: path.resolve(__dirname, '../src/Hooks/'),
      Context: path.resolve(__dirname, '../src/Context/'),
      Page: path.resolve(__dirname, '../src/Page/'),
      ContextApp: path.resolve(__dirname, '../src/Page/Application/context/'),
      TypesApp: path.resolve(__dirname, '../src/Page/Application/TypesApp.ts'),
      GraphqlApp: path.resolve(__dirname, '../src/Page/Application/graphql/'),
      ModalsApp: path.resolve(__dirname, '../src/Page/Application/Modals/'),
      StylesApp: path.resolve(
        __dirname,
        '../src/Page/Application/StylesApp.tsx'
      ),
    },
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        include: path.join(__dirname, '../src/'),
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(graphql|gql)$/,
        include: path.join(__dirname, '../src/'),
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
      {
        test: /\.(png|jpe?g|gif|mp4|svg|webm)$/i,
        type: 'asset/resource',
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    publicPath: '/',
    contentBase: path.resolve(__dirname, '../public/img'),
    port: 9000,
    open: true,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    },
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
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
