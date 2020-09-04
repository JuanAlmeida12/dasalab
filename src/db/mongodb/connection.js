const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const env = process.env.NODE_ENV
const mongodbUrl = process.env.MONGO_URL

if (env === 'production') {
    mongoose.connect(mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
} else {
    mongoose.connect('mongodb://localhost:27017/dasalab', { useNewUrlParser: true, useUnifiedTopology: true })
}

module.exports = mongoose