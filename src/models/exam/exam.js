const { STATUS_TYPE } = require('../../utils/consts')

const buildMakeExam = examValidator => (
    {
        name,
        type,
        status = STATUS_TYPE.ACTIVE,
    } = {}
) => {
    const { error } = examValidator({ name, type, status, })
    if (error) throw new Error(error)

    return {
        getName: () => name,
        getType: () => type,
        getStatus: () => status,
    }
}


module.exports = buildMakeExam