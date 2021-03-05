// 插件配置
module.exports = [
  // 考试/练习模块插件
  require('../plugins/exam/'),
  require('../plugins/svg-icon/'),
  // 更新刷新插件
  [
    '@vuepress/pwa',
    {
      serviceWorker: true,
      updatePopup: {
        message: '发现新内容可用',
        buttonText: '刷新'
      }
    }
  ],
  // 流程图插件
  ['flowchart']
]
