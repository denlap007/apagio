const path = require("path");

const buildPath = path.join(__dirname, "./public");
const nodeEnv = process.env.NODE_ENV || "development";
const publicPath =
  nodeEnv === "production"
    ? path.resolve(__dirname, "/public")
    : `http://localhost:3000/public`;

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
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  output: {
    path: buildPath,
    publicPath,
    filename: "[name].js",
  },
  optimization: {
    moduleIds: "named",
    runtimeChunk: {
      name: "runtime",
    },
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          test: /node_modules/,
          chunks: "all",
          name: "vendor",
          priority: 10,
          enforce: true,
        },
      },
    },
  },
};
