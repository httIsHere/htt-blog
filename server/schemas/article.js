var mongoose = require('mongoose')
// var BSON = require('bson').BSONPure

module.exports = new mongoose.Schema({
  id: Number,
  category: {
        // 类型
    type: mongoose.Schema.Types.ObjectId,
        // 引用，实际上是说，存储时根据关联进行索引出分类目录下的值。而不是存进去的值。
    ref: 'Categories'
  },
  title: String,
  content: String,
  time: String,
  views: {
    type: Number,
    default: 0
  },
  comments: {
    type: Array,
    default: []
  },
  liked: {
    type: Number,
    default: 0
  },
  isDelete: {
    type: Boolean,
    default: false
  },
  islinked: {
    type: Boolean,
    default: false
  },
  link: String,
  author: String,
  isPublic: {
    type: Boolean,
    default: true
  },
  editTime: String
})
