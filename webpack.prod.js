const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const common = require("./webpack.config.js");

module.exports = (env = {}) => {
  const plugins = [
    new CleanWebpackPlugin({
      verbose: true,
      cleanOnceBeforeBuildPatterns: ["**/*", "!index.html*"],
    }),
  ];

  if (env.analyse === "true") {
    const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: "disabled",
        generateStatsFile: true,
      })
    );
  }

  return merge(common, {
    mode: "production",
    entry: {
      bundle: ["./src/frontend/index.jsx"],
    },
    plugins,
    optimization: {
      minimize: true,
    },
    devtool: "source-map",
  });
};
