const VueLoaderPlugin = require('vue-loader/lib/plugin-webpack5')
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin')
const path = require('path')
// const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const resolve = (file) => path.resolve(__dirname, file)
const isProd = process.env.NODE_ENV === 'production'
module.exports = {
  mode: isProd ? 'production' : 'development',
  output: {
    path: resolve('../dist/'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js',
  },
  resolve: {
    alias: {
      // 路径别名，@ 指向 src
      '@': resolve('../src/'),
    },
    // 可以省略的扩展名
    // 当省略扩展名的时候，按照从前往后的顺序依次解析
    extensions: ['.js', '.vue', '.json'],
  },
  devtool: isProd ? 'source-map' : 'source-map',
  module: {
    rules: [
      // 处理图片资源
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        // 在webpack4中这么使用
        // use: [
        //   {
        //     loader: 'url-loader',
        //     options: {
        //       limit: 8192,
        //     },
        //   },
        // ],
        // webpack 5中内置了资源处理模块
        type: 'asset/resource',
      },
      // 处理字体资源
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        // 字体文件同理
        // use: ['file-loader'],
        type: 'asset/resource',
      },
      // 处理 .vue 资源
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      // 处理 CSS 资源
      // 它会应用到普通的 `.css` 文件
      // 以及 `.vue` 文件中的 `<style>` 块
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
      // CSS 预处理器，参考：https://vue-loader.vuejs.org/zh/guide/preprocessors.html
      // 例如处理 Less 资源
      // {
      // test: /\.less$/,
      // use: [
      // 'vue-style-loader',
      // 'css-loader',
      // 'less-loader'
      // ]
      // },
    ],
  },
  plugins: [new VueLoaderPlugin(), new FriendlyErrorsWebpackPlugin()],
}
