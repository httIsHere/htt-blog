/*
 * Created by htt on 05-24-2018
 */
import marked from 'marked'
let hljs = require('highlight.js')
import 'highlight.js/styles/default.css'
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(lang, code, true).value
    } else {
      return hljs.highlightAuto(code).value
    }
  }
})

let Filter = {}
Filter.install = function (Vue, options) {
  Vue.filter('markedContent', function (content, object) {
    return marked(content, object)
  })
  Vue.filter('formatTime', function (time) {
    const theDate = new Date(parseInt(time))
    const y = theDate.getFullYear()
    const m = theDate.getMonth() + 1
    const d = theDate.getDate()
    const h = theDate.getHours()
    const mm = theDate.getMinutes()
    return y + '.' + m + '.' + d + ' ' + h + ':' + mm
  })
  Vue.filter('normalTimeShow', time => {
    const nowTime = new Date().getTime()
    // 0-10分钟内显示“刚刚”
    if (nowTime - time <= 10 * 60 * 1000) {
      return '刚刚'
    } else if (
      nowTime - time <= 60 * 60 * 1000 &&
      nowTime - time > 10 * 60 * 1000
    ) {
      // 50-60分钟内显示“xx分钟前”
      return parseInt((nowTime - time) / 1000 / 60) + '分钟前'
    } else if (
      nowTime - time <= 24 * 60 * 60 * 1000 &&
      nowTime - time > 60 * 60 * 1000
    ) {
      // 1-24小时显示“xx小时前”
      return parseInt((nowTime - time) / 1000 / 60 / 60) + '小时前'
    } else {
      // 显示具体时间
      const theDate = new Date(parseInt(time))
      const y = theDate.getFullYear()
      const m = theDate.getMonth() + 1
      const d = theDate.getDate()
      const h = theDate.getHours()
      const mm = theDate.getMinutes()
      return y + '.' + m + '.' + d + ' ' + h + ':' + mm
    }
  })
  Vue.filter('ipToName', ip => {
    const ipM = ip.split('.')
    return (
      '小汪子' +
      parseInt(ipM[0]) * parseInt(ipM[1]) * parseInt(ipM[2]) * parseInt(ipM[3])
    )
  })
  Vue.filter('arrCompare', prop => {
    if (prop) {
      return function (obj1, obj2) {
        const value1 = Number(obj1[prop]) || 0
        const value2 = Number(obj2[prop]) || 0
        if (value1 < value2) {
          return 1
        } else if (value1 > value2) {
          return -1
        } else {
          return 0
        }
      }
    } else {
      return function (num1, num2) {
        if (num1 < num2) {
          return 1
        } else if (num1 > num2) {
          return -1
        } else {
          return 0
        }
      }
    }
  })
}
export default Filter
