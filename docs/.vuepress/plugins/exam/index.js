const { path } = require('@vuepress/shared-utils')

module.exports = (options, context) => ({
  name: 'exam',
  enhanceAppFiles: [
    path.resolve(__dirname, './bin/enhanceAppFile.js')
  ]
})