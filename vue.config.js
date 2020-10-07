const WorkerPlugin = require('worker-plugin')
module.exports = {
  configureWebpack: {
    publicPath: '/try-vue/',
    output: {
      globalObject: 'this'
    },
    plugins: [
      new WorkerPlugin()
    ]
  },
}
