const themeConfig = require('./config/')
const plugins = require('./config/plugins')

module.exports = {
  title: '寒含函の空间',

  // 加载页介绍
  description: '不畏将来 不念过往',

  // 项目打包目录
  dest: 'public',

  head: [
    ['link', { rel: 'icon', href: '/images/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
  ],

  // Webpack.DefinePlugin: 定义全局常量
  // define: {
  //   CURRENT_ENV: process.env.NODE_ENV,
  // },

  // 主题设置
  theme: 'reco',

  // 主题配置
  themeConfig,

  // 插件配置
  plugins,

  // md显示代码行号
  markdown: {
    lineNumbers: true,
  },
}
