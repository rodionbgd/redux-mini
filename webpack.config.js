const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/main.ts",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    environment: {
      arrowFunction: false,
    },
  },
  mode: process.env.NODE_ENV === "development" ? "development" : "production",
  plugins: [
    new HtmlWebpackPlugin({
      title: "Components",
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  resolve: {  extensions: ['.ts',], },
  devServer: {
    static: {
      directory: path.join(__dirname, "dev"),
    },
    compress: true,
    port: 9000,
  },
};
