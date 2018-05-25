import qs from 'qs'
import axios from 'axios'

const beginLoading = commit => {
  commit('LOADING_TOGGLE', true)
  return Date.now()
}
const stopLoading = (commit, start, timeAllowed = 400) => {
  const spareTime = timeAllowed - (Date.now() - start)
  setTimeout(commit, spareTime > 0 ? spareTime : 0, 'LOADING_TOGGLE', false)
}

// toast
const doToast = (state, commit, payload) => {
  console.log(payload)
  commit('SET_TOAST', payload)
  commit('TOASTING_TOGGLE', true)
  return state.toast.promise
}

Promise.prototype.finally = function (callback) {
  return this.then(
    value => Promise.resolve(callback()).then(() => value),
    reason => Promise.resolve(callback()).then(() => {
      throw reason
    })
  )
}

export default {
  login: ({commit, state}, userMsg) => {
    return axios.post('/server/login', qs.stringify(userMsg)).then(res => {
      if (res.data.msg === 'success') {
        commit('SET_USER', res.data)
        doToast(state, commit, {
          info: '登录成功',
          btnNum: 2
        })
      } else {
        doToast(state, commit, {
          info: '登录失败',
          btnNum: 2
        })
      }
      return res.data
    })
  },
  getRecentArticles: ({ commit }) => {
    // console.log('axios.defaults.baseURL: ' + axios.defaults.baseURL)
    const start = beginLoading(commit)
    const reqParams = {
      type: 1
    }
    return axios.get('/server/getArticles', qs.stringify(reqParams)).then(res => {
      stopLoading(commit, start)
      // console.log(res.data)
      commit('SET_NOTE', res.data)
    })
  },
  getCateArticle: ({commit}, _id) => {
    const reqParams = {
      id: _id
    }
    return axios.post('/server/getCateArticles', qs.stringify(reqParams)).then(res => {
      const start = beginLoading(commit)
      stopLoading(commit, start)
      commit('SET_NOTE', res.data)
    })
  },
  getArticleDetail: ({commit}, id) => {
    const reqParams = {
      id: id
    }
    return axios.post('/server/getArticle', qs.stringify(reqParams)).then(res => {
      commit('SET_CURRENTARTICLE', res.data)
      return res.data
    })
  },
  addNote: ({ commit, state }, _newNote) => {
    const reqParams = _newNote
    return axios.post('/server/addArticle', qs.stringify(reqParams)).then(data => {
      if (data.data.msg === 'success') {
        doToast(state, commit, {
          info: '发布成功',
          btnNum: 2
        })
      } else if (data.data.msg === 'error') {
        doToast(state, commit, {
          info: '发布失败',
          btnNum: 1
        })
      }
      return data.data
    }).catch(err => {
      console.log(err)
    })
  },
  getCategories: ({ commit }) => {
    const start = beginLoading(commit)
    return axios.get('/server/getCategories').then(res => {
      stopLoading(commit, start)
      commit('SET_CATE', res.data)
    }).catch(err => {
      console.log(err)
    })
  },
  addCategory: ({commit, state}, _newCate) => {
    const reqParams = {
      name: _newCate
    }
    return axios.post('/server/addCategory', qs.stringify(reqParams)).then(res => {
      if (res.data.msg === 'success') {
        doToast(state, commit, {
          info: '添加成功',
          btnNum: 0
        })
      } else if (res.data.msg === 'error') {
        doToast(state, commit, {
          info: '添加失败',
          btnNum: 0
        })
      }
      return res.data
    })
  },
  setCurrentCate: ({commit, state}, _currentCate) => {
    commit('SET_CURRENTCATE', _currentCate)
  },
  addUser: ({commit, state}, _newUser) => {
    const reqParams = _newUser
    return axios.post('/server/addUser', qs.stringify(reqParams)).then(res => {
      if (res.data.msg === 'success') {
        doToast(state, commit, {
          info: '添加成功',
          btnNum: 0
        })
      } else if (res.data.msg === 'error') {
        doToast(state, commit, {
          info: '添加失败',
          btnNum: 0
        })
      }
      return res.data
    })
  },
  opArticle: ({commit, state}, _item) => {
    const reqParams = _item
    return axios.post('/server/opArticle', qs.stringify(reqParams)).then(res => {
      commit('SET_CURRENTARTICLE', res.data)
      if (res.data.msg === 'success') {
        doToast(state, commit, {
          info: '删除成功',
          btnNum: 0
        })
      } else if (res.data.msg === 'error') {
        doToast(state, commit, {
          info: '删除失败',
          btnNum: 0
        })
      }
      return res.data
    })
  },
  // 标签选择页返回写文章页
  setCateToWrite: ({commit}, cateToW) => {
    commit('SET_CATETOWRITE', cateToW)
  },
  getDraft: ({commit, state}) => {
    return axios.post('/server/getDraft').then(res => {
      return res.data
    })
  }
}
