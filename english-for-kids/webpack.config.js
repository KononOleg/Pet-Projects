const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
var PrettierPlugin = require("prettier-webpack-plugin");

const esLintPlugin = (isDev) => (isDev ? [] : [new ESLintPlugin({ extensions: ["ts", "js", "tsx"] })]);

const devServer = (isDev) =>
  !isDev
    ? {}
    : {
        devServer: {
          open: true,
          port: 8080,
          contentBase: path.join(__dirname, "public"),
          historyApiFallback: false,
        },
      };

module.exports = ({ development }) => ({
  mode: development ? "development" : "production",
  devtool: development ? "inline-source-map" : false,

  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    assetModuleFilename: "assets/[hash][ext]",
    publicPath: 'auto'
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
     ...esLintPlugin(development), 
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [{ from: "./public" }],
    }),
    new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
    new PrettierPlugin(),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  ...devServer(development),
});
