const path = require("path");
const webpack = require("webpack");

const publicPath = "/public/";
const devServerPort = 3000;

module.exports = {
  target: ["web", "es5"],
  entry: [
    `webpack-dev-server/client?http://localhost:${devServerPort}`,
    "webpack/hot/dev-server",
    "./src/frontend/index.jsx",
  ],
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
    alias: { "react-dom": "@hot-loader/react-dom" },
  },
  output: {
    path: path.resolve(__dirname, publicPath),
    publicPath,
    filename: "bundle.js",
  },
  devServer: {
    contentBase: path.join(__dirname, publicPath),
    port: 3000,
    publicPath: `http://localhost:3000${publicPath}`,
    hotOnly: true,
    host: "0.0.0.0",
    headers: { "Access-Control-Allow-Origin": "*" },
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
