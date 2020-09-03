const Joi = require('joi')
const { STATUS_TYPE } = require('../../utils/consts')

module.exports = Joi.object().keys({
    name: Joi.string().required().error(() => new Error('must have name as string')),
    address: Joi.string().error(() => new Error('must have address as string')),
    status: Joi.string().valid(STATUS_TYPE.ACTIVE, STATUS_TYPE.INACTIVE).error(() => new Error('must to be active or inactive')),
})