//Aqui se configura las opciones del webpack
const dir = {
  src: 'public/src',
  dist: 'public/dist',
  nm: 'node_modules'
},
  path = require('path'),
  webpack = require('webpack'),
  MiniCSSExtractPlugin = require('mini-css-extract-plugin'),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  autoprefixer = require('autoprefixer'),
  CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
  entry: {
    main: "./public/src/main.js",
    css: "./public/src/index.js",
    require: "./public/src/requires.js",
    dashboard: "./public/src/dashboard.js",
    managefiles: "./public/src/managefiles.js"
  },
  mode: "production",
  devtool: false,
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, `../public/dist`)
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.(scss|css)$/,
        use: [
          "style-loader",
          MiniCSSExtractPlugin.loader,
          "css-loader",
          {
            loader: 'postcss-loader',
            options: {
              autoprefixer: {
                browser: ['last 2 versions']
              },
              plugins: () => [autoprefixer]
            }
          },
          "resolve-url-loader",
          "sass-loader?outputStyle=compressed"
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'img/[name].[ext]',
          }
        }]
      }
    ]
  },
  plugins: [
    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /a\.js|node_modules/,
      // add errors to webpack instead of warnings
      failOnError: true,
      // allow import cycles that include an asyncronous import,
      // e.g. via import(/* webpackMode: "weak" */ './file.js')
      allowAsyncCycles: false,
      // set the current working directory for displaying module paths
      cwd: process.cwd()
    }),
    new CleanWebpackPlugin(['../public/dist/*.*']),
    new MiniCSSExtractPlugin({
      filename: '[name].bundle.css'
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery'",
      "window.$": "jquery",

    })
  ]
}