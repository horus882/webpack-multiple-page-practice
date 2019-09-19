const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const buildPath = path.resolve(__dirname, 'dist')

module.exports = {

  entry: {
    index: "./src/js/index.js",
    about: "./src/js/about.js",
    contact: "./src/js/contact.js"
  },

  output: {
    // filename: '[name].[hash:20].js',
    filename: '[name].js',
    path: buildPath
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      },
      {
        // Load all images as base64 encoding if they are smaller than 8192 bytes
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[hash:20].[ext]',
              limit: 8192
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      // 利用 webpack.ProvidePlugin 讓 $ 和 jQuery 可以連結到 jquery library
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: true,
      chunks: ["index"],
      filename: "index.html"
    }),
    new HtmlWebpackPlugin({
      template: "./src/about.html",
      inject: true,
      chunks: ["about"],
      filename: "about.html"
    }),
    new HtmlWebpackPlugin({
      template: "./src/contact.html",
      inject: true,
      chunks: ["contact"],
      filename: "contact.html"
    })
  ]
};
