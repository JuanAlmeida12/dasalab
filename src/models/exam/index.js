const buildMakeExam = require('./exam')
const examSchema = require('./exam-schema')
const validatorExam = require('../../utils/validator')(examSchema)

module.exports = buildMakeExam(validatorExam)


