const port = env.PORT || 3000

const bodyParser = require('body-parser')
const express = require('express')

const server = express()
const allowCors = require('./middlewares/cors')

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(allowCors)

server.listen(port, () => {
    console.log(`Server running at port: ${port}`)
})

module.exports = server