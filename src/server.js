const port = process.env.PORT || 3333

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