var mongoose = require('mongoose')// 引入模块

// 通过mongoose.Schema构造函数，生成一个Schema对象。
var Schema = mongoose.Schema

module.exports = new Schema({
  username: String,
  pwd: String,
  isAdmin: {
    type: Boolean,
    default: false
  }
})
