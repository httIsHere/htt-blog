'use strict'
const db = require('./db')
const express = require('express')
const router = express.Router()
const fn = () => { }
const logger = require('./log')
const request = require('request')

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

// 添加/修改文章
router.post('/server/addArticle', (req, res) => {
  const _id = req.body._id
  const article = req.body
  if (_id) {
    article.editTime = new Date().getTime()
    logger.info('edit article: ' + _id)
    db.Article.findByIdAndUpdate(_id, article, fn).then(() => {
      res.end(JSON.stringify({
        msg: 'success',
        code: '200'
      }))
    })
  } else {
    article.time = new Date().getTime()
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
});

// wx  htt world
//获取openid
router.post('/server/wx_getOpenId', (req, res) => {
  const code = req.body.code
  const link = 'https://api.weixin.qq.com/sns/jscode2session?appid=wxf289e43ebb59edd9&secret=3f5b83723bcbe1f141068ac86983e452&js_code=' + code + '&grant_type=authorization_code';
  request(link, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.send(JSON.stringify(body))
      logger.info('user login: ' + body.openid)
    }
  })
})

//添加message
router.post('/server/wx_postMessage', (req, res) => {
  var _detail = req.body
  _detail.date = new Date().getTime()
  db.Wx_message(_detail).save().then(data => {
    res.send(JSON.stringify({
      msg: 'success',
      code: '200'
    }))
  })
})

// main view 获得所有message信息
router.get('/server/wx_allMessage', (req, res) => {
  db.Wx_message.find({
    'isDelete': false
  }).sort({
    _id: -1
  }).then(data => {
    res.send(JSON.stringify(data))
  })
});

//获得message详情
router.post('/server/wx_msgDetail', (req, res) => {
  const _id = req.body.id
  logger.info('show wx msg detail: ' + _id)
  db.Wx_message.findOne({
    '_id': _id
  }).then(data => {
    if (data) {
      res.send(JSON.stringify(data))
    }
  })
});


module.exports = router

