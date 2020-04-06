const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    512: "./src/js/index.js"
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css"
    }),
    new CopyPlugin([
      {
        from: "./src/data", //将数据复制到dist中，可以直接d3的csv加载使用数据
        to: path.resolve(__dirname, "dist/data"),
        ignore: [".*"]
      }
    ])
  ],
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(csv|tsv)$/,
        use: [
          {
            loader: "csv-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "data/"
            }
          }
        ]
      },
      {
        test: /\.xml$/,
        use: ["xml-loader"]
      }
    ]
  }
};
