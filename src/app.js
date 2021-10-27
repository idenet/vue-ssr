// 通用启动入口
import Vue from 'vue'
import App from './App.vue'
import VueMeta from 'vue-meta'
import { createRouter } from './router/index'
import { createStore } from './store/index'

Vue.use(VueMeta)

Vue.mixin({
  metaInfo: {
    titleTemplate: '%s - 拉勾教育',
  },
})

// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
export function createApp() {
  const router = createRouter()
  const store = createStore()

  const app = new Vue({
    router, // 把路由实例挂载到 Vue 根实例中
    store,
    // 根实例简单的渲染应用程序组件。
    render: (h) => h(App),
  })
  return { app, router, store }
}
