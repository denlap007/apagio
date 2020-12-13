const {
  wpkConf: { jsVendorName, jsRuntimeName, outputPath, outputPublicPath },
} = require("./gulp/conf");

module.exports = {
  target: ["web", "es5"],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] },
      },
      // Fonts
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: "fonts/[name].[ext]",
        },
      },
      // Files
      {
        test: /\.(jpg|jpeg|png|gif|svg|ico)$/,
        loader: "file-loader",
        options: {
          name: "static/[name].[ext]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  output: {
    path: outputPath,
    publicPath: outputPublicPath,
    filename: "[name].js",
  },
  optimization: {
    moduleIds: "named",
    runtimeChunk: {
      name: jsRuntimeName,
    },
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          test: /node_modules/,
          chunks: "all",
          name: jsVendorName,
          priority: 10,
          enforce: true,
        },
      },
    },
  },
};
