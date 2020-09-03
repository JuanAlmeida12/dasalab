const server = require('./server')

require('./db')

require('./api')(server)

module.exports = server