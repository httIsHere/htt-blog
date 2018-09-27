const mongoose = require('mongoose')

const logger = require('./log')

const user = require('./schemas/user')
const article = require('./schemas/article')
const categories = require('./schemas/categories')
const question = require('./schemas/questions')

// wx小程序
const wx_message = require('./schemas/WX_httWorld/message')
const wx_circle = require('./schemas/WX_httWorld/circle')

const Models = {
  User: mongoose.model('User', user),
  Article: mongoose.model('Article', article),
  Categories: mongoose.model('Categories', categories),
  Question: mongoose.model('Question', question),
  Wx_message: mongoose.model('Wx_message', wx_message),
  Wx_circle: mongoose.model('Wx_circle', wx_circle),
  initialized: false
}

const initialize = function () {
  Models.User.find(null, (err, doc) => {
    if (err) {
      logger.error(err)
    } else if (!doc.length) {
      logger.info('Database opens for the first time...')
    } else {
      Models.initialized = true
    }
  })
}

// 连接数据库
mongoose.connect('mongodb://localhost:27017/blog')

const db = mongoose.connection
db.once('error', () => {
  logger.error('Mongo connection error')
})
db.once('open', () => {
  logger.info('Mongo connection successed')
  initialize()
})

module.exports = Models
