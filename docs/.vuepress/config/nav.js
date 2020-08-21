// 导航栏配置
module.exports = [
  { text: 'Home', link: '/', icon: 'reco-home' },
  { text: 'TimeLine', link: '/timeline/', icon: 'reco-date' },
  { text: 'Docs', icon: 'reco-message', items: [{ text: '网工软考', link: '/views/docs/network-engineer/' }] },
  {
    text: 'Contact',
    icon: 'reco-message',
    items: [
      { text: 'GitHub', link: 'https://github.com/recoluan', icon: 'reco-github' },
      { text: 'CSDN', link: 'https://blog.csdn.net/recoluan', icon: 'reco-csdn' },
      { text: '博客圆', link: 'https://www.cnblogs.com/luanhewei/', icon: 'reco-bokeyuan' },
      { text: 'WeChat', link: 'https://mp.weixin.qq.com/s/mXFqeUTegdvPliXknAAG_A', icon: 'reco-wechat' },
    ],
  },
]
