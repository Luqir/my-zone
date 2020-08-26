module.exports = {
  type: 'blog',
  
  // 博客设置
  blogConfig: {
    category: {
      location: 2, // 在导航栏菜单中所占的位置，默认2
      text: 'Category', // 默认 “分类”
    },
    tag: {
      location: 3, // 在导航栏菜单中所占的位置，默认3
      text: 'Tag', // 默认 “标签”
    },
  },

  // 最后更新时间 string | boolean
  lastUpdated: 'Last Updated',

  // 作者
  author: 'luqirong',
  authorAvatar: '/avatar.png',

  // 备案号 string | boolean
  record: false,

  // 项目开始时间
  startYear: '2020',

  // 友链
  friendLink: [
    {
      title: '寒含函',
      desc: '积一时之跬步，臻千里之遥程',
      email: 'luqir123@qq.com',
      link: 'https://www.baidu.com',
    },
    {
      title: 'vuepress-theme-reco',
      desc: 'A simple and beautiful vuepress Blog & Doc theme.',
      avatar: 'https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png',
      link: 'https://www.baidu.com',
    },
  ],

  // 评论 Valine 
  valineConfig: {
    appId: 'eSVAWwXrWB8Xln9YtnJLlrkC-gzGzoHsz',
    appKey: 'uIc2nTu8NGFJPKSNGKfRkrHo',
  }
}
