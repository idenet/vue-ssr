<template>
  <div id="app">
    <h1>{{message}}</h1>
    <h2>客户端动态标签</h2>
    <div>
      <input type="text" v-model="message" />
    </div>
    <button @click="onClick">点击测试</button>
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
