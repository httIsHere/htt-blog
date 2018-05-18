var mongoose = require('mongoose')// 引入模块

// 通过mongoose.Schema构造函数，生成一个Schema对象。
var Schema = mongoose.Schema

module.exports = new Schema({
  from: String,
  username: String,
  title: String,
  content: String,
  time: String,
  reply: {
    type: Array,
    default: []
  },
  isTop: {
    type: Number,
    default: 0
  },
  isResolve: {
    type: Boolean,
    default: false
  },
  tags: {
    type: Array,
    default: []
  }
})
