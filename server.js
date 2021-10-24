const Vue = require('vue')
const renderer = require('vue-server-renderer').createRenderer()

const app = new Vue({
  data: {
    message: '拉钩教育',
  },
  template: `
    <div id="app">
      <h1>{{message}}</h1>
    </div>
  `,
})

renderer.renderToString(app, (err, html) => {
  if (err) throw err
  console.log(html)
})
