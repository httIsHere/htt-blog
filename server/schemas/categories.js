var mongoose = require('mongoose')

// 博客分类的表结构
module.exports = new mongoose.Schema({
  id: Number,
    // 分类名称
  name: String
})
