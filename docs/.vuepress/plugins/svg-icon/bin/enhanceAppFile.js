import SvgIcon from './SvgIcon.vue'

export default ({ Vue }) => {
  const icons = require.context('@/public/icons', false, /\.svg$/)
  const importAll = (r) => r.keys().map(r)
  importAll(icons)

  // regisiter a svg-icon component
  Vue.component('SvgIcon', SvgIcon)
}
