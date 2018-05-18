const logger = require('./log')

var io = require('socket.io')(server)

io.on('connection', function (socket) {
  logger.info('New socket connection')
  socket.on('disconnect', function () {
    logger.info('One go out')
  })

  socket.on('message', function (obj) {
    logger.info('Received message: ' + obj)
    io.emit('message', obj)
  })
})
module.exports = io
