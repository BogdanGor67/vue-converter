module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-converter/' : '/',
  configureWebpack: {
    optimization: {
      splitChunks: false
    }
  }
};