module.exports = {
  publicPath: '',
  chainWebpack: config => {
    config.optimization
      .minimizer('terser')
      .tap(args => {
        const { terserOptions } = args[0]
        terserOptions.keep_classnames = true
        terserOptions.keep_fnames = true
        terserOptions.output = {
          ...terserOptions.output,
          comments: false  // exclude all comments from output
        }
        return args
      })
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/scss/variables.scss";
          @import "@/assets/scss/custom.scss";
        `
      }
    }
  }
}