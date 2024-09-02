const path = require("path");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        fs: false,
        path: require.resolve("path-browserify"),
        http: require.resolve("stream-http"),
        https: require.resolve("https-browserify"),
        url: require.resolve("url/"),
        querystring: require.resolve("querystring-es3"),
        zlib: require.resolve("browserify-zlib"),
        util: require.resolve("util/"),
        stream: require.resolve("stream-browserify"),
        assert: require.resolve("assert/"),
      };

      return webpackConfig;
    },
  },
};
