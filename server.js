const Vue = require('vue')
const express = require('express')
const fs = require('fs')
const { createBundleRenderer } = require('vue-server-renderer')
const setupDevServer = require('./build/setup-dev-server')

const server = express()

//请求静态资源 物理磁盘中的资源文件
server.use('/dist', express.static('./dist'))

const isPord = process.env.NODE_ENV === 'production'

let renderer
let onReady

if (isPord) {
  const serverBundle = require('./dist/vue-ssr-server-bundle.json')
  const clientManifest = require('./dist/vue-ssr-client-manifest.json')
  const template = fs.readFileSync('./index.template.html', 'utf-8')

  renderer = createBundleRenderer(serverBundle, {
    template,
    clientManifest,
  })
} else {
  // 开发模式 --> 监视打包构建 --> 重新生成 Renderer渲染器
  onReady = setupDevServer(server, (serverBundle, template, clientManifest) => {
    renderer = createBundleRenderer(serverBundle, {
      template,
      clientManifest,
    })
  })
}

const render = (req, res) => {
  renderer.renderToString(
    {
      title: '拉钩教育',
      meta: '<meta name="description" content="拉钩教育" />',
    },
    (err, html) => {
      if (err) {
        return res.status(500).end('服务器出错')
      }
      // 设置请求头
      res.end(html)
    }
  )
}

server.get(
  '/',
  isPord
    ? render
    : async (req, res) => {
        // 等待有了 renderer渲染器以后，调用render进行渲染
        await onReady
        render(req, res)
      }
)

server.listen(3000, () => {
  console.log('server running at 3000')
})
