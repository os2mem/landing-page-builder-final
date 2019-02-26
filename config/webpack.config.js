//Aqui se configura las opciones del webpack
const dir = {
      src: 'public/src',
      dist: 'public/dist',
      nm: 'node_modules'
    },
    path = require('path'),
    webpack = require('webpack');

module.exports = {
  entry: {
    main: "./public/src/main.js",
    css: "./public/src/index.js",
    require: "./public/src/requires.js",
    dashboard: "./public/src/dashboard.js",
    managefiles: "./public/src/managefiles.js"
  },
  mode: "development",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, `"../${dir.dist}`)
  },
  devServer: {
    contentBase: "dist",
    overlay:true,
    hot: true,
    stats: {
      colors: true
    }
  },
  devtool: "source-map",
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
        test: /\.css$/,
        use: [

          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          }
        ]
      },
      {
        test: /\.scss$/,
        use:  [

          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery'",
      "window.$": "jquery",

    })
  ]
}