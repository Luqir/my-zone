// 侧边栏配置

// 自动生成侧边栏
// module.exports = 'auto'

// 直接显示侧边栏
// module.exports = {
//   '/views/docs/network-engineer/': ['', 'theme', 'plugin', 'api'],
// }

// 分组形式显示侧边栏
module.exports = {
  '/views/docs/network-engineer/': [
    '',
    {
      title: '基础知识', // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 1, // 可选的, 默认值是 1
      children: ['base/1', 'base/2', 'base/3', 'base/4', 'base/5', 'base/6', 'base/7', 'base/8', 'base/9', 'base/10', 'base/11', 'base/12'],
    },
    {
      title: '知识总结', // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 1, // 可选的, 默认值是 1
      children: ['summary/1'],
    },
  ],
}
