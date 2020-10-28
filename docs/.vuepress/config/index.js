const themeReco = require('./themeReco')
const nav = require('./nav')
const sidebar = require('./sidebar')

module.exports = Object.assign({}, themeReco, {
  nav,
  sidebar,

  // 左上角logo
  // logo: '/images/logo.png',

  // 自动形成侧边导航
  subSidebar: 'auto',
  sidebarDepth: 3,

  // 搜索设置
  search: true,
  searchMaxSuggestions: 10
})
