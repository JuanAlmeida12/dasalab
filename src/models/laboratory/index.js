const buildMakeLaboratory = require('./laboratory')
const laboratorySchema = require('./laboratory-schema')
const validatorLaboratory = require('../../utils/validator')(laboratorySchema)

module.exports = buildMakeLaboratory(validatorLaboratory)


