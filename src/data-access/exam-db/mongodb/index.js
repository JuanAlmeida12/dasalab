const { STATUS_TYPE } = require('../../../utils/consts')

const Exam = require('../../../db/mongodb/models/exam')
const laboratoryDB = require('../../laboratory-db')

const makeExam = require('../../../models/exam')
const serialize = require('./serializer')


const listExams = () => {
    return Exam.find({ status: STATUS_TYPE.ACTIVE }).populate('labs')
        .then(serialize)
}

const findExam = (val, prop = 'id') => {
    if (prop === 'id') {
        prop = '_id'
    }
    return Exam.find({ [prop]: val, status: STATUS_TYPE.ACTIVE }).populate('labs')
        .then(resp => {
            return serialize(resp[0])
        })
}

const findExamsBy = (val, prop = 'name') => {
    return Exam.find({ [prop]: val, status: STATUS_TYPE.ACTIVE }).populate('labs')
        .then(serialize)
}

const addExam = examInfo => {
    let exam = makeExam(examInfo)
    let newExam = {
        name: exam.getName(),
        type: exam.getType(),
        status: exam.getStatus(),
    }
    return Exam.create(newExam)
        .then(serialize)
}

const deleteExam = id => {
    return Exam.findOneAndUpdate({ _id: id, status: STATUS_TYPE.ACTIVE }, { $set: { status: STATUS_TYPE.INACTIVE } })
        .then(resp => {
            return {
                id: resp._id.toString(),
                status: 'success'
            }
        })
        .catch(err => {
            return {
                status: 'fail'
            }
        })
}

const updateExam = (id, val) => {
    const exam = makeExam(val)
    const newExam = {
        name: exam.getName(),
        type: exam.getType(),
        status: exam.getStatus(),
        labs: exam.getLabs(),
    }
    return Exam.findOneAndUpdate({ _id: id, status: STATUS_TYPE.ACTIVE }, newExam).then(resp => {
        return {
            exam_old: serialize(resp),
            exam: serialize({ _id: id, ...newExam }),
            status: 'success'
        }
    }).catch(err => {
        return {
            status: 'fail'
        }
    })
}

const associateLab = async (examId, labId) => {
    const lab = await laboratoryDB.findLaboratory(labId)

    if (!lab) return {
        status: 'fail'
    }

    return Exam.findOneAndUpdate({ _id: examId, status: STATUS_TYPE.ACTIVE }, { $push: { labs: labId } }).then(resp => {
        return {
            examId,
            labId,
            status: 'success'
        }
    }).catch(err => {
        return {
            status: 'fail'
        }
    })
}

const unassociateLab = async (examId, labId) => {
    const lab = await laboratoryDB.findLaboratory(labId)

    if (!lab) return {
        status: 'fail'
    }

    return Exam.findOneAndUpdate({ _id: examId, status: STATUS_TYPE.ACTIVE }, { $pullAll: { labs: [labId] } }).then(resp => {
        return {
            examId,
            labId,
            status: 'success'
        }
    }).catch(err => {
        return {
            status: 'fail'
        }
    })
}

const dropAll = () => {
    return Exam.remove({})
}

module.exports = {
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