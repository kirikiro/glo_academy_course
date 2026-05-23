// webpack.config.js
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./js/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/bundle.js",
    clean: true,
    assetModuleFilename: "images/[path][name][ext]",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    browsers: ["> 1%", "last 2 versions", "not dead"],
                  },
                  modules: "commonjs",
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[path][name][ext]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".json"],
  },
};
