const data_provider = process.env.DATA_PROVIDER

const {
    listExams,
    findExam,
    findExamsBy,
    addExam,
    deleteExam,
    updateExam,
    associateLab,
    unassociateLab,
    dropAll
}
    = data_provider === 'mongo' ? require('./mongodb/index') : require('./memory/index')


const laboratoryDb = {
    listExams,
    findExam,
    findExamsBy,
    addExam,
    deleteExam,
    updateExam,
    associateLab,
    unassociateLab,
    dropAll,
}

module.exports = laboratoryDb