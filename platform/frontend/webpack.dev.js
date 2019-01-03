const webpack = require("webpack");
const merge = require("webpack-merge");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  output: {
    filename: "[name].[hash].js",
  },
  mode: "development",
  devtool: "inline-source-map",
  entry: ["react-hot-loader/patch", "webpack-dev-server/client?http://gauss:8180", "webpack/hot/only-dev-server", "./index.js"],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin([{ from: "config.js", to: "config.js" }]),
  ],
  devServer: {
    host: "0.0.0.0",
    port: 8180,
    disableHostCheck: true,
    hot: true,
    contentBase: "./build",
    historyApiFallback: true,
  },
});
