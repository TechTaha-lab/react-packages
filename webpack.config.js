module.exports = {
  entry: "/src/App.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
    library: "e2eTestids",
    libraryTarget: "umd",
    globalObject: "this",
    clean: true
  },
  mode: "production",
  resolve: {
    extensions: [".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]]
          }
        }
      }
    ]
  }
};
