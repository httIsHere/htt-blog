var mongoose = require('mongoose') // 引入模块

// 通过mongoose.Schema构造函数，生成一个Schema对象。
var Schema = mongoose.Schema

module.exports = new Schema({
    posterOpenId: String,
    posterName: String,
    postMsg: {
        type: String,
        default: "分享图片"
    },
    resources: {
        type: Array,
        default: []
    },
    date: String,
    isDelete: {
        type: Boolean,
        default: false
    }
})
