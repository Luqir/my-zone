let valineConfigObj = {}
if (process.env.NODE_ENV !== 'development') {
  valineConfigObj = {
    // 评论 Valine: 开发时不显示以免开发时页面阅读次数就非常高
    valineConfig: {
      appId: 'eSVAWwXrWB8Xln9YtnJLlrkC-gzGzoHsz',
      appKey: 'uIc2nTu8NGFJPKSNGKfRkrHo'
    }
  }
}

const config = {
  type: 'blog',

  // 博客设置
  blogConfig: {
    category: {
      location: 2, // 在导航栏菜单中所占的位置，默认2
      text: 'Category' // 默认 “分类”
    },
    tag: {
      location: 4, // 在导航栏菜单中所占的位置，默认3
      text: 'Tag' // 默认 “标签”
    }
  },

  // 最后更新时间 string | boolean
  lastUpdated: 'Last Updated',

  // 作者
  author: 'luqirong',
  authorAvatar: '/images/avatar-min.gif',

  // 备案号 string | boolean
  record: '闽ICP备2020020905号-1',
  recordLink: 'http://beian.miit.gov.cn',
  cyberSecurityRecord: '闽公网安备 35050302000659号',
  cyberSecurityLink: 'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=35050302000659',

  // 项目开始时间
  startYear: '2020',

  // 友链
  friendLink: [
    {
      title: '寒含函',
      desc: '积一时之跬步，臻千里之遥程',
      email: 'luqir123@qq.com',
      link: 'http://www.luqirong.com'
    },
    {
      title: 'vuepress-theme-reco',
      desc: 'A simple and beautiful vuepress Blog & Doc theme.',
      avatar: 'https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png',
      link: 'https://vuepress-theme-reco.recoluan.com/'
    }
  ]

  // 腾讯公益404界面
  // noFoundPageByTencent: false
}

module.exports = Object.assign(config, valineConfigObj)
