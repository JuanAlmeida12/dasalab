const Joi = require('joi')
const { STATUS_TYPE, EXAM_TYPE } = require('../../utils/consts')

module.exports = Joi.object().keys({
    name: Joi.string().required().error(() => new Error('Name must have name as string')),
    type: Joi.string().required().valid(EXAM_TYPE.IMAGE, EXAM_TYPE.CLINICAL_ANALYSIS).error(() => new Error('Type must be image or clinical analysis')),
    status: Joi.string().valid(STATUS_TYPE.ACTIVE, STATUS_TYPE.INACTIVE).error(() => new Error('Status must to be active or inactive')),
})