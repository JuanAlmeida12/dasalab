const port = process.env.PORT || 3333

const bodyParser = require('body-parser')
const express = require('express')

const app = express()
const allowCors = require('./middlewares/cors')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(allowCors)

const server = app.listen(port, () => {
    console.log(`Server running at port: ${port}`)
})

module.exports = { server, app }