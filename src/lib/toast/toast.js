/**
 * created by httishere on 18/5/9
 */
import Vue from 'vue'
import ToastVue from './Toast.vue'
const Vm = Vue.extend(ToastVue)
Vm.prototype.close = function () {
  this.isShow = false
}

let Toast = (options = {}, defaultMsg = '获取数据失败') => {
  console.log(options)
  if (options.noToast !== 1) {
    let toastDiv = document.getElementById('el_toast')
    toastDiv && document.body.removeChild(toastDiv)
    let instance = new Vm().$mount(document.createElement('div'))
    let duration = options.duration || 2000
    // html
    if (options.msgType && options.msgType === 1) {
      if (options.message) {
        instance.messageHtml = options.message
        instance.htmlVisible = true
      }
    } else {
        // only words
      if (typeof options === 'string') {
        instance.message = options
      } else if (options.errorMsg) {
        instance.message = options.errorMsg
      } else if (options.message) {
        instance.message = options.message
      } else {
        instance.message = defaultMsg
      }
    }
    instance.callback = options.callback || function () {}
    instance.time = duration
    document.body.appendChild(instance.$el)
    instance.isShow = true
    // run after update dom
    Vue.nextTick(() => {
      instance.timer = setTimeout(function () {
        instance.close()
        instance.callback()
      }, duration)
    })
    return instance
  }
}

export default Toast
