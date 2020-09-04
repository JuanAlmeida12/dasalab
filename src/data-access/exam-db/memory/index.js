const { STATUS_TYPE } = require('../../../utils/consts')

let EXAMS = require('../../../db/memory/exam')
const makeExam = require('../../../models/exam')
const serialize = require('./serializer')

const listExams = () => {
    return Promise.resolve(serialize(EXAMS.filter(exam => exam.status === STATUS_TYPE.ACTIVE)))
}

const findExam = async (val, prop = 'id') => {
    if (prop === 'id') { prop = 'serial' }
    const exams = EXAMS.find(exam => exam[prop] == val && exam.status == STATUS_TYPE.ACTIVE)
    return Promise.resolve(serialize(exams))
}

const findExamsBy = async (val, prop = 'name') => {
    const exams = EXAMS.filter(exam => exam[prop] == val && exam.status == STATUS_TYPE.ACTIVE)
    return Promise.resolve(serialize(exams))
}

const addExam = examInfo => {
    const exam = makeExam(examInfo)
    const newExam = {
        serial: EXAMS.length + 1,
        name: exam.getName(),
        type: exam.getType(),
        status: exam.getStatus(),
    }
    EXAMS.push(newExam)
    return findExam(newExam.serial)
}

const updateExam = (id, examInfo) => {
    const exam = makeExam(examInfo)
    const newExam = {
        serial: id,
        name: exam.getName(),
        type: exam.getType(),
        status: exam.getStatus(),
    }

    return findExam(id)
        .then(exam => {
            if (exam && exam.id == id) {
                EXAMS = EXAMS.filter(student => student.serial != id)
                EXAMS.push(newExam)
                return {
                    exam_old: serialize({ ...exam, serial: id }),
                    exam: serialize(newExam),
                    status: 'success'
                }
            }
            return {
                status: 'fail'
            }
        })
}

const deleteExam = async id => {
    return findExam(id)
        .then(exam => {
            if (exam && exam.id == id) {
                EXAMS = EXAMS.filter(exam => exam.serial != id)
                EXAMS.push({ serial: id, ...exam, status: STATUS_TYPE.INACTIVE })
                return {
                    id,
                    status: 'success'
                }
            }
            return {
                status: 'fail'
            }
        })
}

const dropAll = () => {
    const tmp = EXAMS
    EXAMS = [];
    return tmp;
}

module.exports = {
    listExams,
    findExam,
    findExamsBy,
    addExam,
    deleteExam,
    updateExam,
    dropAll
}