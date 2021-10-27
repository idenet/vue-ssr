import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      post: [],
    }),
    mutations: {
      setPost(state, data) {
        state.post = data
      },
    },
    actions: {
      // 在服务端渲染期间必须让，action 返回一个promise
      async getPosts({ commit }) {
        const { data } = await axios.get('https://cnodejs.org/api/v1/post')
        commit('setPost', data.data)
      },
    },
  })
}
