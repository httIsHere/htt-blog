const api = require('./api')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const cors = require('cors')
var session = require('express-session')
const logger = require('./log')

// const resolve = file => path.resolve(__dirname, file)

const app = express()

app.set('port', (process.env.port || 3000))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(cookieParser())

app.use(express.static(path.join(__dirname, '../dist')))

app.use(session({
  secret: '123', // secret的值建议使用随机字符串
  cookie: {maxAge: 60 * 1000 * 30} // 过期时间（毫秒）
}))

app.use(cors({
  origin: ['*'],
  methods: ['GET', 'POST'],
  alloweHeaders: ['Conten-Type', 'Authorization']
}))

// 允许跨域访问
app.use('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  if (req.method === 'OPTIONS') {
    res.send(200)
  } else {
    var _send = res.send
    var sent = false
    res.send = function (data) {
      if (sent) return
      _send.bind(res)(data)
      sent = true
    }
    next()
  }
})

// 添加api引入
app.use(api)

// socket.io 引入
const server = require('http').createServer(app)
const io = require('socket.io')(server)

io.on('connection', (socket) => {
  logger.info('New socket connection')
  socket.on('disconnect', function () {
    logger.info('One go out')
  })

  socket.on('message', function (obj) {
    logger.info('Received message: ' + obj)
    io.emit('message', obj)
  })
})

// 监听端口
app.listen(app.get('port'), function () {
  const port = app.get('port')
  logger.info('app listening at http://localhost:%s', port)
})
