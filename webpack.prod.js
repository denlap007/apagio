const { merge } = require("webpack-merge");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const common = require("./webpack.config");

const {
  wpkConf: { jsBundleName },
} = require("./gulp/conf");

module.exports = (env = {}) => {
  const plugins = [];

  if (env.analyse === "true") {
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
      [jsBundleName]: ["./src/frontend/index.jsx"],
    },
    plugins,
    optimization: {
      minimize: true,
    },
    devtool: "source-map",
  });
};
