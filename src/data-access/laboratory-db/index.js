const data_provider = process.env.DATA_PROVIDER

const {
    listLaboratories,
    findLaboratory,
    findLaboratoriesBy,
    addLaboratory,
    deleteLaboratory,
    updateLaboratory,
    dropAll
}
    = data_provider === 'mongo' ? require('./mongodb/index') : require('./memory/index')


const laboratoryDb = {
    listLaboratories,
    findLaboratory,
    findLaboratoriesBy,
    addLaboratory,
    deleteLaboratory,
    updateLaboratory,
    dropAll,
}

module.exports = laboratoryDb