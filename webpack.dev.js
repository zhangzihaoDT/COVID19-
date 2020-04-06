const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      title: "Output Management", //表示 HTML title 标签的内容
      template: "./src/index.html",
      minify: false,
      hash: true
    })
  ],
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    host: "localhost",
    port: 8080,
    proxy: {
      "/api": "http://localhost:3000"
    }
  }
});
