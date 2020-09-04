const { STATUS_TYPE } = require('../../utils/consts')

const buildMakeExam = examValidator => (
    {
        name,
        type,
        status = STATUS_TYPE.ACTIVE,
        labs = [],
    } = {}
) => {
    const { error } = examValidator({ name, type, status, labs, })
    if (error) throw new Error(error)

    return {
        getName: () => name,
        getType: () => type,
        getStatus: () => status,
        getLabs: () => labs,
    }
}


module.exports = buildMakeExam