const mongoose = require('../connection')
const { STATUS_TYPE } = require('../../../utils/consts')

const Schema = mongoose.Schema
const LaboratorySchema = new Schema({
    name: { type: String, required: true },
    address: String,
    status: {
        type: String,
        enum: [STATUS_TYPE.ACTIVE, STATUS_TYPE.INACTIVE]
    },
})

const Laboratory = mongoose.model('Laboratory', LaboratorySchema)

module.exports = Laboratory