/**
 *  Created by httishere on 18/05/09
 */
import Vue from 'vue'
import loadVue from './Loading.vue'
const Vm = Vue.extend(loadVue)
Vm.prototype.close = function () {
  this.isShow = false
}
Vm.prototype.isLoading = function () {
  return this.isShow
}
let Loading = (options = {}) => {
  let loadingDiv = document.getElementById('el_loading')
  loadingDiv && document.body.removeChild(loadingDiv)
  let instance = new Vm().$mount(document.createElement('div'))
  instance.maskType = options.maskType ? options.maskType : 1
  instance.message = typeof options === 'string' ? options : options.message
  if (!instance.message) {
    instance.message == 'loading...'
  }
  instance.callback = options.callback || function () {}
  document.body.appendChild(instance.$el)
  instance.isShow = true
  return instance
}
export default Loading
