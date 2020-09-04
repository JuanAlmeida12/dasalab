const express = require('express')

module.exports = (server) => {
    // API Routes
    const router = express.Router()
    server.use('/api', router)

    // Laboratory Routes
    require('./laboratory')(router)

    // Exam Routes
    require('./exam')(router)
}