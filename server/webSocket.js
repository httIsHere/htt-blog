const logger = require('./log')
const ws = require('websocket')
const port = process.env.port || 3000

// // on就是addListener，添加一个监听事件调用回调函数
// var server = ws.createServer(function (conn) {
//   logger.info('New websocket connection')
//   conn.on('text', function (str) {
//     logger.info('Received message: ' + str)
//     conn.sendText(str)
//   })
//   conn.on('close', function (code, reason) {
//     logger.info('connection closed')
//   })
//   conn.on('error', function (err) {
//     logger.error('handle error')
//     logger.error(err)
//   })
// }).listen(port)

// logger.info('websocket server listening on port' + port)

// module.exports = server

const wsServer = require('ws').Server
const wsS = new wsServer({
  port: port,
  verifyClient: socketVerify
})

function socketVerify (info) {
  logger.info('origin: ' + info.origin)
  logger.info(info.req.t)
  logger.info(info.secure)
  return true
}

// 广播
wsS.broadcast = function broadcast (s, ws) {
  wsS.clients.forEach(function each (client) {
    if (s == 1) {
      client.send(ws.name + ': ' + ws.msg)
    } else if (s == 0) {
      client.send(ws + ' closed')
    }
  })
}

// init
wsS.on('connection', function (ws) {
  logger.info('New websocket connection.')
  ws.send('clients number: ' + wsS.clients.length)
  // send message
  ws.on('message', function (jsonStr, flags) {
    var _obj = JSON.parse(jsonStr)
    this.user = _obj
    if (typeof this.user.msg !== 'undefined') {
      wsS.broadcast(1, _obj)
    }
  })
  // close
  ws.on('close', function (close) {
    try {
      wsS.broadcast(0, this.user.name)
    } catch (e) {
      logger.info('update ur pages')
    }
  })
  // error
  ws.on('error', function (err) {
    logger.error('handle error')
    logger.error(err)
  })
})

module.exports = wsS
