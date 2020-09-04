const serializer = require('../../../utils/serializer')

const _serializeSingle = (laboratory) => {
    return {
        id: laboratory._id,
        name: laboratory.name,
        address: laboratory.address,
        status: laboratory.status,
    }
}

module.exports = serializer(_serializeSingle)