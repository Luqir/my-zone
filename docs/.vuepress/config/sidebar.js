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
    {
      title: '基础', // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 1, // 可选的, 默认值是 1
      children: ['', 'theme'],
    },
    {
      title: '进阶', // 必要的
      collapsable: false, // 可选的, 默认值是 true,
      sidebarDepth: 1, // 可选的, 默认值是 1
      children: ['plugin', 'api'],
    },
  ],
}
