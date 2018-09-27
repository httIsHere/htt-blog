var mongoose = require('mongoose')

// 圈子的表结构
module.exports = new mongoose.Schema({
  id: Number,
  name: String,
  remark: String,
  creater: String,
  createrName: String
})