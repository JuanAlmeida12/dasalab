const { app, server } = require('./server')

require('./api')(app)

module.exports = server