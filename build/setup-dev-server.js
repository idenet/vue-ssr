const fs = require('fs')
const path = require('path')
const chokidar = require('chokidar')
const webpack = require('webpack')
const devMiddleware = require('webpack-dev-middleware')

const resolve = (file) => path.resolve(__dirname, file)

module.exports = (server, callback) => {
  let ready
  const onReady = new Promise((r) => (ready = r))

  // 监事构建  -> 更新renderer
  let template
  let serverBundle
  let clientManifest

  const update = () => {
    if (template && serverBundle && clientManifest) {
      ready()
      callback(renderer, serverBundle, clientManifest)
    }
  }
  // 监视构建 template -> 调用 update -> 更新renderer渲染器
  const templatePath = path.resolve(__dirname, '../index.template.html')
  template = fs.readFileSync(templatePath, 'utf-8')
  update()
  // chokidar
  chokidar.watch(templatePath).on('change', () => {
    template = fs.readFileSync(templatePath, 'utf-8')
    update()
  })

  // 监视构建
  const serverConfig = require('./webpack.server.config')
  const serverCompiler = webpack(serverConfig)
  const serverDevMiddleware = devMiddleware(serverCompiler, {
    logLevel: 'silent', // 关闭日志输出，由FriendlyErrorsWebpackPlugin输出
  })
  serverCompiler.hooks.done.tap('server', () => {
    serverBundle = JSON.parse(
      serverDevMiddleware.fileSystem.readFileSync(
        resolve('../dist/vue-ssr-server-bundle.json'),
        'utf-8'
      )
    )
    update()
  })
  // 不需要构建了
  // serverCompiler.watch({}, (err, stats) => {
  //   if (err) throw err
  //   // 源代码的错误
  //   if (stats.hasErrors()) return
  //   serverBundle = JSON.parse(
  //     fs.readFileSync(resolve('../dist/vue-ssr-server-bundle.json'), 'utf-8')
  //   )
  //   update()
  // })

  return onReady
}
