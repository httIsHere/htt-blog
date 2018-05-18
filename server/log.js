const log4js = require('log4js')
const path = require('path')

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

const logger = log4js.getLogger()

module.exports = logger
