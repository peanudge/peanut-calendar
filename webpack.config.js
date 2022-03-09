const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".json", ".jsx", ".tsx"],
  },
};