const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const env = process.env.NODE_ENV
const mongodbUrl = process.env.MONGO_URL

if (env === 'production') {
    mongoose.connect(mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
} else {
    mongoose.connect('mongodb://localhost:27017/dasalab', { useNewUrlParser: true, useUnifiedTopology: true })
}

mongoose.connection.once('open', function () {
    console.log('Connection has been made')
}).on('error', function (error) {
    console.log('Connect error', error)
}).on('disconnected', function () {
    console.log('Connection disconnected')
})