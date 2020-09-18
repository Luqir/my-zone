const { path } = require('@vuepress/shared-utils')

module.exports = (options, context) => {
  // 插件配置：icon的文件夹路径（默认在 .vuepress/public/icons 路径下）
  const { iconsDir = '../../public/icons' } = options
  return {
    name: 'svg-icon',
    enhanceAppFiles: [path.resolve(__dirname, './bin/enhanceAppFile.js')],
    chainWebpack(config) {
      // set svg-sprite-loader
      config.module
        .rule('svg')
        .exclude.add(path.resolve(__dirname, iconsDir))
        .end()
      config.module
        .rule('icons')
        .test(/\.svg$/)
        .include.add(path.resolve(__dirname, iconsDir))
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
          symbolId: 'icon-[name]',
        })
        .end()
    },
  }
}
