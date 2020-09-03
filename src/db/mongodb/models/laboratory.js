const mongoose = require('mongoose')
const { STATUS_TYPE } = require('../../../utils/consts')

const Schema = mongoose.Schema
const StudentSchema = new Schema({
    name: { type: String, required: true },
    address: String,
    status: {
        type: String,
        enum: [STATUS_TYPE.ACTIVE, STATUS_TYPE.INACTIVE]
    },
})

let Student = mongoose.model('Student', StudentSchema)

module.exports = Student