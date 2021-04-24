const { merge } = require("webpack-merge");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const postcssPresetEnv = require("postcss-preset-env");
const cssnano = require("cssnano");
const postcssImport = require("postcss-import");
const postcssUrl = require("postcss-url");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const common = require("./webpack.config");

const {
  paths: { indexTemplateSrc },
  wpkConf: { jsBundleName },
} = require("./gulp/conf");

module.exports = (env = {}) => {
  const plugins = [
    new CleanWebpackPlugin({
      verbose: true,
    }),

    new HtmlWebpackPlugin({
      template: indexTemplateSrc,
      inject: "body",
    }),
    new MiniCssExtractPlugin(),
  ];

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
      [jsBundleName]: [
        "./src/frontend/Index.jsx",
        "/src/frontend/assets/styles/main.scss",
      ],
    },
    plugins,
    module: {
      rules: [
        {
          test: /.s?css$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: (loaderContext) => ({
                  plugins: [
                    postcssImport({
                      root: loaderContext.resourcePath,
                    }),
                    postcssUrl(),
                    postcssPresetEnv(),
                    cssnano(),
                  ],
                }),
              },
            },
            {
              loader: "sass-loader",
              options: {
                sassOptions: {
                  includePaths: [path.resolve(__dirname, "node_modules")],
                },
              },
            },
          ],
        },
      ],
    },
    optimization: {
      minimize: true,
      minimizer: [
        new CssMinimizerPlugin({
          minimizerOptions: {
            preset: [
              "default",
              {
                discardComments: { removeAll: true },
              },
            ],
          },
        }),
      ],
    },
    devtool: "source-map",
  });
};
