const { path } = require('@vuepress/shared-utils')

const themeConfig = require('./config/')
const plugins = require('./config/plugins')

module.exports = {
  title: '寒含函',

  // 加载页介绍
  description: '想法 + 实践 = BUG',

  // 项目打包目录
  dest: 'public',
  head: [
    ['link', { rel: 'icon', href: '/images/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],

  // Webpack.DefinePlugin: 定义全局常量
  // define: {
  //   CURRENT_ENV: process.env.NODE_ENV,
  // },

  // 配置项目根路径别名
  alias: {
    '@': path.resolve(__dirname, '../.vuepress')
  },

  // 主题设置
  theme: 'reco',

  // 主题配置
  themeConfig,

  // 插件配置
  plugins,

  // md显示代码行号
  markdown: {
    lineNumbers: true
  }
}
