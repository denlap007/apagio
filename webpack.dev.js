const webpack = require("webpack");
const { merge } = require("webpack-merge");
const path = require("path");

const common = require("./webpack.config.js");

const publicPath = "/public/";
const devServerPort = 3000;

module.exports = merge(common, {
  mode: "development",
  entry: {
    bundle: [
      `webpack-dev-server/client?http://localhost:${devServerPort}`,
      "webpack/hot/dev-server",
      "./src/frontend/index.jsx",
    ],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  resolve: {
    alias: { "react-dom": "@hot-loader/react-dom" },
  },
  devServer: {
    contentBase: path.join(__dirname, publicPath),
    port: 3000,
    publicPath: `http://localhost:3000${publicPath}`,
    hotOnly: true,
    host: "0.0.0.0",
    headers: { "Access-Control-Allow-Origin": "*" },
  },
  devtool: "inline-source-map",
});
