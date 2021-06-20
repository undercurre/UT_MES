import util from '@/libs/util.js'
import '@/vender/protocolcheckjs'

export default {
  methods: {
    handleMenuSelect (index, indexPath, frameOut, isCustom) {
      if ((/^d2-menu-empty-\d+$/.test(index) || index === undefined)) {
        if (!isCustom) this.$message.warning('无效菜单')
        return false
      } else if (/^https:\/\/|http:\/\//.test(index) || /^easyupgrade:/.test(index)) { // 统一处理http和easyupgrade外链菜单
        const userInfo = this.$store.getters.userinfo || {}
        if (index.indexOf('?') !== -1) {
          index = `${index}&`
        } else {
          index = `${index}?`
        }
        index = `${index}user_name=${userInfo.USER_NAME}&user_id=${userInfo.ID}&user_pwd=${userInfo.PASSWORD}&U=${userInfo.USER_NAME}&P=${userInfo.PASSWORD}`
        if (/^easyupgrade:/.test(index)) {
          window.protocolCheck(index, function () {

          }, function () {
            if (window.confirm('还没安装EasyUpgrade，是否现在安装？')) {
              util.open('http://192.168.100.173:42731/index.html')
            }
          })
          window.event.preventDefault ? window.event.preventDefault() : window.event.returnValue = false
        } else {
          util.open(index)
        }
      } else if (frameOut.indexOf(index) !== -1) {
        util.open(`${window.location.origin}/#${index}`)
      } else {
        if (!/^\/.*$/.test(index)) {
          index = `/${index}`
        }
        this.$router.push({
          path: index
        })
      }
    }
  }
}
