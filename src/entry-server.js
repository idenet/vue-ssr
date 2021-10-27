// entry-server.js
import { createApp } from './app'

export default async (context) => {
  // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
  // 以便服务器能够等待所有的内容在渲染前，
  // 就已经准备就绪。
  const { app, router, store } = createApp()

  const meta = app.$meta()

  // 设置服务器端 router 的位置
  router.push(context.url)

  context.meta = meta

  // 等到 router 将可能的异步组件和钩子函数解析完
  // new Promise((resolve, reject) => {
  //   router.onReady(resolve, reject)
  // })
  await new Promise(router.onReady.bind(router))

  context.rendered = () => {
    // renderer 会把 context.state数据对象内敛到页面中
    context.state = store.state
  }

  return app
}

// export default (context) => {
//   return new Promise((resolve, reject) => {
//     const { app, router } = createApp()

//     router.push(context.url)

//     router.onReady(() => {
//       const matchedComponents = router.getMatchedComponents()
//       if (!matchedComponents.length) {
//         return reject({ code: 404 })
//       }

//       resolve(app)
//     }, reject)
//   })
// }
