const mongoose = require('mongoose')

const mongodbUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/dasa'

mongoose.connect(mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true })