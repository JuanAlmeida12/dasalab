const serializer = require('../../../utils/serializer')

const _serializeSingle = (laboratory) => {
    return {
        id: laboratory._id,
        name: laboratory.name,
        type: laboratory.type,
        status: laboratory.status,
        labs: !laboratory.labs ? [] :  laboratory.labs.map(lab => {
            return {
                id: lab._id,
                name: lab.name,
                address: lab.address,
                status: lab.status,
            }
        })
    }
}

module.exports = serializer(_serializeSingle)