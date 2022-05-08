const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    plugins: [
      new CompressionPlugin({
        filename: '[path][base].br',
        algorithm: 'brotliCompress',
        test: /\.js$/,
      })
    ]
  },
  devServer: {
    before(app) {
      app.use('*.js', (req, res, next) => {
        if (req.get('Accept-Encoding')?.includes('br')) {
          req.url += '.br'

          res.set('Content-Encoding', 'br')
          res.set('Content-Type', 'application/javascript; charset=utf-8')
        }
        next()
      })
    }
  }
}
