const path = require("path");
module.exports = {
  entry: "../frontend/src/index.tsx",
  module: {},
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
