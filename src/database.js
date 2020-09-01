const mongoose = require('mongoose')

const mongodbUrl = process.env.MONGODB || 'mongodb://localhost:27017/dasa'

mongoose.connect(mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true })