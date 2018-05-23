import actions from './actions'
import axios from 'axios'

const state = {
  user: null,
  articles: [],
  categories: [],
  currentCate: null,
  currentArticle: null,
  isLoading: false,
  isToasting: false,
  cateToWrite: false,
  toast: {
    info: '',
    btnNum: 1,
    promise: null,
    toastResolve () {},
    toastReject () {}
  },
  replyStr: {
    code: 200,
    msg: ''
  }
}
const getters = {
  user: state => state.user,
  articles: state => state.articles,
  article: state => state.currentArticle,
  categories: state => state.categories,
  currentCate: state => state.currentCate,
  count: state => {
    return state.articles.length
  },
  replyStr: state => state.replyStr,
  toast: state => state.toast,
  cateToWrite: state => state.cateToWrite
}
const mutations = {
  LOADING_TOGGLE: (state, isLoading) => {
    state.isLoading = isLoading
  },
  TOASTING_TOGGLE: (state, isToasting) => {
    state.isToasting = isToasting
  },
  SET_TOAST: (state, payload) => {
    state.toast.info = payload.info
    state.toast.btnNum = payload.btnNum
    state.toast.promise = new Promise((resolve, reject) => {
      state.toast.toastResolve = resolve
      state.toast.toastReject = reject
    })
  },
  SET_NOTE: (state, articles) => {
    state.articles = articles
  },
  ADD_NOTE: (state, _newNote) => {
    const newNote = {
      title: _newNote.title,
      content: _newNote.content,
      author: 'htt',
      show: true,
      draft: false
    }
    state.articles.push(newNote)
    state.replyStr.msg = 'success'
  },
  SET_CATE: (state, categories) => {
    state.categories = categories
  },
  SET_CURRENTCATE: (state, currentCate) => {
    state.currentCate = currentCate
  },
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_CURRENTARTICLE: (state, article) => {
    state.currentArticle = article
  },
  SET_CATETOWRITE: (state, cateToW) => {
    state.cateToWrite = cateToW
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
