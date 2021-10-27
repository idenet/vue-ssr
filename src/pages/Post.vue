<template>
  <div>
    <h1>Post List</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Post',
  components: {},
  data() {
    return {

    }
  },
  computed: {
    ...mapState(['post'])
  },
  // Vue ssr 特殊为服务端渲染提供的一个生命周期函数
  serverPrefetch() {
    // 调用actions， 返回promise
    this.getPost()
  },
  methods: {
    ...mapActions(['getPost'])
  }
}
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
</style>
