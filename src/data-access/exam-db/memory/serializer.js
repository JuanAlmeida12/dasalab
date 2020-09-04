const serializer = require('../../../utils/serializer')
const _serializeSingle = (laboratory) => {
    return {
        'id': laboratory.serial,
        'name': laboratory.name,
        'type': laboratory.type,
        'status': laboratory.status
    }
}

module.exports = serializer(_serializeSingle)