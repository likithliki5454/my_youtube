const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  // other webpack configuration options...
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
      os: require.resolve("os-browserify/browser"),
      crypto: require.resolve("crypto-browserify")
    }
  },
  plugins: [
    new NodePolyfillPlugin() // Add the NodePolyfillPlugin
  ]
};
