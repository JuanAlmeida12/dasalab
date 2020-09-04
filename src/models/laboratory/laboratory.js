const { STATUS_TYPE } = require('../../utils/consts')

const buildMakeLaboratory = laboratoryValidator => (
    {
        name,
        address,
        status = STATUS_TYPE.ACTIVE,
    } = {}
) => {
    const { error } = laboratoryValidator({ name, address, status, })
    if (error) throw new Error(error)

    return {
        getName: () => name,
        getAddress: () => address,
        getStatus: () => status,
    }
}

module.exports = buildMakeLaboratory