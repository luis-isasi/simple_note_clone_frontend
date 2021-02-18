const path = require('path');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const HtmlWebpackPLugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/index'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[fullhash].min.js',
    chunkFilename: '[name].[fullhash].min.js',
  },
  devtool: 'source-map',
  mode: 'production',
  resolve: {
    extensions: ['.js', '.tsx', '.ts', '.jsx', '.graphql', '.svg', '.png'],
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
      // {
      //   test: /\.png|jpe?g|gif|mp4|svg|webm$/i,
      //   use: {
      //     loader: 'url-loader',
      //     // options: {
      //     //   limit: 90000,
      //     // },
      //   },
      // },
      {
        test: /\.(png|jpe?g|gif|mp4|svg|webm)$/i,
        type: 'asset/resource',
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new CaseSensitivePathsPlugin(),
    new HtmlWebpackPLugin({
      template: path.resolve(__dirname, '../public/index.html'),
      favicon: 'src/Images/simplenNoteBlack-logo.png',
      title: 'index',
      minify: {
        collapseBooleanAttributes: true,
      },
    }),
  ],
};
