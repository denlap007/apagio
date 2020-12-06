const {
  wpkConf: {
    devServerHost,
    devServerPort,
    jsVendorName,
    jsRuntimeName,
    outputPath,
    outputPublicPath,
    publicPath,
  },
} = require("./gulp/conf");

const nodeEnv = process.env.NODE_ENV || "development";

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
    publicPath:
      nodeEnv === "production"
        ? outputPublicPath
        : `${devServerHost}:${devServerPort}${publicPath}`,
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
