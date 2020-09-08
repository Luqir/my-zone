const themeConfig = require('./config/')

module.exports = {
  title: '寒含函の空间',

  // 加载页介绍
  description: ' ',

  // 项目打包目录
  dest: 'public',

  head: [
    ['link', { rel: 'icon', href: '/images/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
  ],

  // 主题设置
  theme: 'reco',

  // 主题配置
  themeConfig,

  // md显示代码行号
  markdown: {
    lineNumbers: true,
  },
}
