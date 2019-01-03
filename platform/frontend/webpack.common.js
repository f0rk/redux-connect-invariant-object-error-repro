const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const babelSettings = require("./babel.config.js");

module.exports = {
  devtool: "hidden-source-map",
  context: path.join(__dirname, "./lib"),
  output: {
    path: path.join(__dirname, "./build"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss|css)/,
        loaders: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              includePaths: ["lib"],
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules\/(?!capitalrx-.+)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: babelSettings.presets,
            plugins: babelSettings.plugins,
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.(png|ico|jpg|gif|jpeg|ttf|pdf|xml|manifestjson)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: (file) => {
                const match = file.match(/common.capitalrx.com\/javascript\/(capitalrx-(\w+-?)+)\/lib\/(.+)/);
                if (match !== null) {
                  const moduleName = match[1];
                  let finalPath = match[3];

                  if (finalPath.match(/\.manifestjson$/)) {
                    finalPath = finalPath.replace(/\.manifestjson$/, ".json");
                  }

                  return "common/" + moduleName + "/" + finalPath;
                }

                return "[path][name].[ext]";
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
    modules: [path.resolve("./lib"), "node_modules"],
  },
  optimization: {
    /* providedExports MUST remain false. webpack will otherwise emit a broken
     * production build, failing with TypeError: Cannot read property 'call'
     * of undefined
     *
     * note that this diables the usedExports and concatenateModules
     * optimizations, as they both depend on providedExports */
    providedExports: false,

    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: "all",
          minChunks: 1,
          maxInitialRequests: 5,
          minSize: 0,
        },
        vendor: {
          test: /node_modules/,
          chunks: "all",
          name: "vendor",
          priority: 10,
          enforce: true,
        },
      },
    },
    runtimeChunk: "single",
  },
  plugins: [
    new CleanWebpackPlugin(["./build"]),
    new webpack.HashedModuleIdsPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
    }),
    new CopyWebpackPlugin([{ from: "img", to: "img" }]),
  ],
};
