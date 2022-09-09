const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/app.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    assetModuleFilename: "assets/[hash][ext]",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.s[ac]ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "",
            },
          },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: "asset/resource",
        exclude: /node_modules/,
        // use: [
        //   {
        //     loader: "file-loader",
        //     options: {
        //       name: "assets/[contenthash].[ext]",
        //     },
        //   },
        // ],
        // type: "javascript/auto", // 중복 생성 문제로 2시간 날림...
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "airbnb",
      template: "assets/index.html",
    }),

    new MiniCssExtractPlugin({
      filename: "style.css",
    }),

    new CleanWebpackPlugin(),
  ],
};
