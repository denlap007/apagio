const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.config");
const {
  wpkConf: {
    outputPath,
    jsBundleName,
    publicPath,
    devServerPort,
    devServerHost,
  },
} = require("./gulp/conf");

module.exports = merge(common, {
  mode: "development",
  entry: {
    [jsBundleName]: [
      `webpack-dev-server/client?${devServerHost}:${devServerPort}`,
      "webpack/hot/dev-server",
      "./src/frontend/index.jsx",
      "/src/frontend/assets/scss/main.scss",
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
    contentBase: outputPath,
    port: 3000,
    publicPath: `${devServerHost}:${devServerPort}${publicPath}`,
    hotOnly: true,
    host: "0.0.0.0",
    headers: { "Access-Control-Allow-Origin": "*" },
  },
  devtool: "inline-source-map",
});
