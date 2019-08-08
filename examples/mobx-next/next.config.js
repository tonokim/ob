const withLess = require('@zeit/next-less')

/* Without CSS Modules, with PostCSS */
// module.exports = withLess()

/* With CSS Modules */
// module.exports = withLess({ cssModules: true })
/* With additional configuration on top of CSS Modules */
module.exports = withLess({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: process.env.NODE_ENV === 'production'? "[hash:base64:5]" : "[name]__[local]___[hash:base64:5]",
  },
  webpack: function (config) {
    return config;
  }
});
