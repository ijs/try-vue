const WorkerPlugin = require('worker-plugin')
const path = require('path')
const pathes = { development: '/', production: '/try-vue/'}
module.exports = {
  publicPath: pathes[process.env.NODE_ENV || 'development'],
  configureWebpack: {
    output: {
      globalObject: 'this'
    },
    plugins: [
      new WorkerPlugin()
    ],
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), 'src')
      }
    }
  },
}
