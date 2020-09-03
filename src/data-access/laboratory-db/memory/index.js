const { STATUS_TYPE } = require('../../../utils/consts')

let LABORATORIES = require('../../../db/memory/laboratory')
const makeLaboratory = require('../../../models/laboratory')
const serialize = require('./serializer')

const listLaboratories = () => {
    return Promise.resolve(serialize(LABORATORIES))
}

const findLaboratory = async (val, prop = 'id') => {
    if (prop === 'id') { prop = 'serial' }
    const laboratory = LABORATORIES.find(laboratory => laboratory[prop] == val && laboratory.status === STATUS_TYPE.ACTIVE)
    return Promise.resolve(serialize(laboratory))
}

const findLaboratoriesBy = async (val, prop = 'name') => {
    const laboratory = LABORATORIES.filter(laboratory => laboratory[prop] == val && laboratory.status === STATUS_TYPE.ACTIVE)
    return Promise.resolve(serialize(laboratory))
}

const addLaboratory = async laboratoryInfo => {
    const laboratory = makeLaboratory(laboratoryInfo)
    const newLaboratory = {
        serial: LABORATORIES.length + 1,
        name: laboratory.getName(),
        address: laboratory.getAddress(),
        status: laboratory.getStatus(),
    }
    LABORATORIES.push(newLaboratory)
    return findLaboratory('serial', newLaboratory.serial)
}

const updateLaboratory = async (id, laboratoryInfo) => {
    const laboratory = makeLaboratory(laboratoryInfo)
    const newLaboratory = {
        serial: id,
        name: laboratory.getName(),
        address: laboratory.getAddress(),
        status: laboratory.getStatus(),
    }

    return findLaboratory(id)
        .then(laboratory => {
            if (laboratory.id == id) {
                LABORATORIES = LABORATORIES.filter(student => student.serial != id)
                LABORATORIES.push(newLaboratory)
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

const deleteLaboratory = async id => {
    return findLaboratory(id)
        .then(laboratory => {
            if (laboratory.id == id) {
                LABORATORIES = LABORATORIES.filter(student => student.serial != id)
                LABORATORIES.push({ ...laboratory, status: STATUS_TYPE.INACTIVE })
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
    LABORATORIES = [];
    return LABORATORIES;
}

module.exports = {
    listLaboratories,
    findLaboratory,
    findLaboratoriesBy,
    addLaboratory,
    deleteLaboratory,
    updateLaboratory,
    dropAll
}