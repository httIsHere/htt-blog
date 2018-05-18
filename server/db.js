const mongoose = require('mongoose')

const logger = require('./log')

const user = require('./schemas/user')
const article = require('./schemas/article')
const categories = require('./schemas/categories')
const question = require('./schemas/questions')

const Models = {
  User: mongoose.model('User', user),
  Article: mongoose.model('Article', article),
  Categories: mongoose.model('Categories', categories),
  Question: mongoose.model('Question', question),
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