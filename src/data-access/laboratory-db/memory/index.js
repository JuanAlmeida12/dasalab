const { STATUS_TYPE } = require('../../../utils/consts')

let LABORATORIES = require('../../../db/memory/laboratory')
const makeLaboratory = require('../../../models/laboratory')
const serialize = require('./serializer')

const listLaboratories = () => {
    return Promise.resolve(serialize(LABORATORIES.filter(laboratory => laboratory.status === STATUS_TYPE.ACTIVE)))
}

const findLaboratory = async (val, prop = 'id') => {
    if (prop === 'id') { prop = 'serial' }
    const laboratories = LABORATORIES.find(laboratory => laboratory[prop] == val && laboratory.status == STATUS_TYPE.ACTIVE)
    return Promise.resolve(serialize(laboratories))
}

const findLaboratoriesBy = async (val, prop = 'name') => {
    const laboratories = LABORATORIES.filter(laboratory => laboratory[prop] == val && laboratory.status == STATUS_TYPE.ACTIVE)
    return Promise.resolve(serialize(laboratories))
}

const addLaboratory = laboratoryInfo => {
    const laboratory = makeLaboratory(laboratoryInfo)
    const newLaboratory = {
        serial: LABORATORIES.length + 1,
        name: laboratory.getName(),
        address: laboratory.getAddress(),
        status: laboratory.getStatus(),
    }
    LABORATORIES.push(newLaboratory)
    return findLaboratory(newLaboratory.serial)
}

const updateLaboratory = (id, laboratoryInfo) => {
    const laboratory = makeLaboratory(laboratoryInfo)
    const newLaboratory = {
        serial: id,
        name: laboratory.getName(),
        address: laboratory.getAddress(),
        status: laboratory.getStatus(),
    }

    return findLaboratory(id)
        .then(laboratory => {
            if (laboratory && laboratory.id == id) {
                LABORATORIES = LABORATORIES.filter(student => student.serial != id)
                LABORATORIES.push(newLaboratory)
                return {
                    laboratory_old: serialize({ ...laboratory, serial: id }),
                    laboratory: serialize(newLaboratory),
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
            if (laboratory && laboratory.id == id) {
                LABORATORIES = LABORATORIES.filter(laboratory => laboratory.serial != id)
                LABORATORIES.push({ serial: id, ...laboratory, status: STATUS_TYPE.INACTIVE })
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
    const tmp = LABORATORIES
    LABORATORIES = [];
    return tmp;
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