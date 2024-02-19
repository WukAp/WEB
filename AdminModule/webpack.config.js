const path = require("path");
module.exports = {
  entry: {
    script: "./public/js/script.js",
    userCardScript: "./public/js/userScript.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "public/dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use:  [
          'style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ["style-loader","css-loader","less-loader"],
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      }
    ],
  },
};
