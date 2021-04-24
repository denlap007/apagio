const webpack = require("webpack");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const common = require("./webpack.config");
const {
  paths: { indexTemplateSrc },
  wpkConf: { outputPath, jsBundleName, devServerPort, devServerHost },
} = require("./gulp/conf");

module.exports = merge(common, {
  mode: "development",
  entry: {
    [jsBundleName]: [
      `webpack-dev-server/client?${devServerHost}:${devServerPort}`,
      "webpack/hot/dev-server",
      "./src/frontend/Index.jsx",
      // "./src/frontend/assets/styles/main.scss",
    ],
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
        include: [
          path.resolve(__dirname, "src", "frontend", "assets", "styles"),
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: indexTemplateSrc,
      inject: "body",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    alias: { "react-dom": "@hot-loader/react-dom" },
  },
  devServer: {
    proxy: {
      "/api/**": {
        target: "http://localhost:8080",
        secure: false,
      },
    },
    // serve static
    contentBase: outputPath,
    port: 3000,
    publicPath: `${devServerHost}:${devServerPort}`,
    hotOnly: true,
    host: "0.0.0.0",
    headers: { "Access-Control-Allow-Origin": "*" },
  },
  devtool: "inline-source-map",
});
