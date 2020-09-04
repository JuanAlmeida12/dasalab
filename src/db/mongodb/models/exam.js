const mongoose = require('../connection')
const { STATUS_TYPE, EXAM_TYPE } = require('../../../utils/consts')

const Schema = mongoose.Schema
const ExamSchema = new Schema({
    name: { type: String, required: true },
    type: {
        type: String,
        enum: [EXAM_TYPE.CLINICAL_ANALYSIS, EXAM_TYPE.IMAGE]
    },
    status: {
        type: String,
        enum: [STATUS_TYPE.ACTIVE, STATUS_TYPE.INACTIVE]
    },
    labs: [{ type: Schema.Types.ObjectId, ref: 'Laboratory' }]
})

const Exam = mongoose.model('Exam', ExamSchema)

module.exports = Exam