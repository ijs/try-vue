const WorkerPlugin = require('worker-plugin')
const path = require('path')
module.exports = {
  configureWebpack: {
    publicPath: '/try-vue/',
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
