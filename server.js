const Vue = require('vue')
const express = require('express')
const fs = require('fs')

const serverBundle = require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')
const template = fs.readFileSync('./index.template.html', 'utf-8')

const renderer = require('vue-server-renderer').createBundleRenderer(
  serverBundle,
  {
    template,
    clientManifest,
  }
)

const server = express()

//请求静态资源
server.use('/dist', express.static('./dist'))

server.get('/', (req, res) => {
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
})

server.listen(3000, () => {
  console.log('server running at 3000')
})
