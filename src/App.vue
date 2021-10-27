<template>
  <div id="app">
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/about">About</router-link>
      </li>
      <li>
        <router-link to="/post">Post</router-link>
      </li>
    </ul>
    <!-- 路由出口 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {
      message: '拉钩教育',
    }
  },
  methods: {
    onClick() {
      console.log('hello ssr')
    },
  },
  mounted() { },
  created() { }
}
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
</style>
