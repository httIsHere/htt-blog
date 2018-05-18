var log4js = require('log4js')// 注意log4js的module位置引用是否正确
// log the cheese logger messages to a file, and the console ones as well.
log4js.configure({
  appenders: {
    fileLog: { type: 'file', filename: './logs/ExecutionLog.log' },
    console: { type: 'console' }
  },
  categories: {
    file: { appenders: ['fileLog'], level: 'error' },
    another: { appenders: ['console'], level: 'trace' },
    default: { appenders: ['console', 'fileLog'], level: 'trace' }
  },
  replaceConsole: true
})

var logger = log4js.getLogger()

logger.trace('Entering cheese testing')
logger.debug('Got Cheese.')
logger.info('cheese is gouda.')
logger.warn('Cheese is quite smelly.')
logger.error('Cheese is too ripe!')
logger.fatal('Cheese was breeding ground for listeria.')
