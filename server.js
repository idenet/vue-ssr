const Vue = require('vue')
const express = require('express')
const fs = require('fs')

const renderer = require('vue-server-renderer').createRenderer({
  template: fs.readFileSync('./index.template.html', 'utf-8'),
})

const server = express()

server.get('/', (req, res) => {
  const app = new Vue({
    data: {
      message: '拉钩教育',
    },
    template: `
    <div id="app">
      <h1>{{message}}</h1>
      <h2>客户端动态标签</h2>
      <div>
        <input type="text" v-model='message' />
      </div>
      <button @click="onClick">点击测试</button>
    </div>
  `,
    data: {
      message: '拉钩教育',
    },
    methods: {
      onClick() {
        console.log('hello ssr')
      },
    },
  })
  renderer.renderToString(
    app,
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
