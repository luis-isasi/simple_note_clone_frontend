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
  mode: 'production',
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
