const Joi = require('joi')
const { STATUS_TYPE } = require('../../utils/consts')

module.exports = Joi.object().keys({
    name: Joi.string().required().error(() => new Error('Name must have name as string')),
    address: Joi.string().error(() => new Error('Address must have address as string')),
    status: Joi.string().valid(STATUS_TYPE.ACTIVE, STATUS_TYPE.INACTIVE).error(() => new Error('Status must to be active or inactive')),
})