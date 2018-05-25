'use strict'
const db = require('./db')
const express = require('express')
const router = express.Router()
const fn = () => {}
const logger = require('./log')

// 获得用户ip
const getIp = req => {
  var ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.socket.remoteAddress || ''
  if (ip.split(',').length > 0) {
    ip = ip.split(',')[0]
  }
  if (ip.split(':').length > 0) {
    ip = ip.split(':')[ip.split(':').length - 1]
  }
  return ip
}

// 用户登录
router.post('/server/login', (req, res) => {
  const username = req.body.username
  const password = req.body.password
  logger.info('login msg: ' + username + '-' + password)
  db.User.findOne({
    'username': username,
    'pwd': password
  }).then(data => {
    if (data) {
      req.session.sign = true
      req.session.username = username
      req.session.isAdmin = data.isAdmin
      res.send(JSON.stringify({
        msg: 'success',
        code: '200',
        user: data
      }))
    } else {
      res.send(JSON.stringify({
        msg: 'error',
        code: '500'
      }))
    }
  })
})
// 添加用户
router.post('/server/addUser', (req, res) => {
  const newUser = req.body
  const _id = req.body.id
  if (_id) {
    db.User.findByIdAndUpdate(_id, newUser, fn)
  } else {
    new db.User(newUser).save().then(() => {
      res.send(JSON.stringify({
        msg: 'success',
        code: '200'
      }))
    }, () => {
      res.send(JSON.stringify({
        msg: 'error',
        code: '400'
      }))
    })
  }
})

// 展示文章数据(最新的5条)
router.get('/server/getArticles', (req, res) => {
  db.Article.find({
    'isDelete': false
  }).limit(5).sort({
    _id: -1
  }).populate('category').then(data => {
    res.send(JSON.stringify(data))
  })
})

// 展示文章数据(合集内文章列表)
router.post('/server/getCateArticles', (req, res) => {
  const _id = req.body.id
  db.Article.find({
    'isDelete': false,
    'category': _id
  }).sort({
    _id: -1
  }).populate('category').then(data => {
    res.send(JSON.stringify(data))
  })
})

// 展示草稿箱
router.post('/server/getDraft', (req, res) => {
  logger.info('show draft')
  db.Article.find({
    $or: [{
      'isDelete': true
    },
    {
      'isPublic': false
    }]
  }).sort({
    _id: -1
  }).then(data => {
    res.send(JSON.stringify(data))
  })
})

// 展示文章详情
router.post('/server/getArticle', (req, res) => {
  const _id = req.body.id
  logger.info('show article: ' + _id)
  db.Article.findOne({
    '_id': _id
  }).then(data => {
    if (data) {
      res.send(JSON.stringify(data))
    }
  })
})

// 添加文章
router.post('/server/addArticle', (req, res) => {
  const _id = req.body.id
  const article = req.body
  article.time = new Date().getTime()
  if (_id) {
    db.Article.findByIdAndUpdate(_id, article, fn)
  } else {
    new db.Article(article).save().then(() => {
      res.end(JSON.stringify({
        msg: 'success',
        code: '200'
      }))
    })
  }
})

// 删除/恢复文章
router.post('/server/opArticle', (req, res) => {
  const _id = req.body.id
  const _op = req.body.op
  const _time = new Date().getTime()
  if (_op === 0 || parseInt(_op) === 0) {
    logger.info('delete article: ' + _id)
    db.Article.update({
      '_id': _id
    }, {
      'isDelete': true,
      'editTime': _time
    }).then(() => {
      res.send(JSON.stringify({
        msg: 'success',
        code: '200'
      }))
    })
  } else if (_op === 1 || parseInt(_op) === 1) {
    logger.info('pulish article: ' + _id)
    db.Article.update({
      '_id': _id
    }, {
      'isDelete': false,
      'isPublic': true,
      'editTime': _time
    }).then(() => {
      res.send(JSON.stringify({
        msg: 'success',
        code: '200'
      }))
    })
  }
})

// 展示分类标签
router.get('/server/getCategories', (req, res) => {
  db.Categories.find().sort({
    _id: -1
  }).then(resDate => {
    res.send(JSON.stringify(resDate))
  })
})

// 添加分类标签
router.post('/server/addCategory', (req, res) => {
  const newCate = req.body
  const _id = req.body.id
  if (_id) {
    db.Categories.findByIdAndUpdate(_id, newCate, fn)
  } else {
    new db.Categories(newCate).save().then(() => {
      res.send(JSON.stringify({
        msg: 'success',
        code: '200'
      }))
    })
  }
})

// ------------------------游客功能----------------------
// 评论
router.post('/server/submitComment', (req, res) => {
  const newCommet = {
    name: getIp(req),
    comment: '',
    date: new Date().getTime(),
    personalWebsite: null
  }
  const _id = req.body.article
  newCommet.comment = req.body.content
  db.Article.findOne({
    _id: _id
  }).then(data => {
    data.comments.push(newCommet)
    return data.save()
  }).then(date => {
    res.send(JSON.stringify({
      msg: 'success',
      code: '200'
    }))
  })
})
// 提问
router.post('/server/subQuestion', (req, res) => {
  var newQuestion = req.body
  newQuestion.from = getIp(req)
  newQuestion.time = new Date().getTime()
  db.Question(newQuestion).save().then(data => {
    res.send(JSON.stringify({
      msg: 'success',
      code: '200'
    }))
  })
})
// 问题展示
router.get('/server/getQuestions', (req, res) => {
  db.Question.find().sort({
    _id: -1
  }).then(data => {
    res.send(JSON.stringify(data))
  })
})
// 提交回答
router.post('/server/subAnswer', (req, res) => {
  const answer = {
    from: getIp(req),
    content: req.body.answer,
    time: new Date().getTime(),
    isAdmin: req.body.isAdmin
  }
  const _id = req.body.to
  db.Question.findOne({
    _id: _id
  }).then(data => {
    data.reply.push(answer)
    return data.save()
  }).then(data => {
    res.send(JSON.stringify({
      msg: 'success',
      code: '200'
    }))
  })
})

module.exports = router

