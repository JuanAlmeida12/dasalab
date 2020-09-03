const { STATUS_TYPE } = require('../../../utils/consts')

const Laboratory = require('../../../db/mongodb/models/laboratory')
const makeLaboratory = require('../../../models/laboratory')
const serialize = require('./serializer')


const listLaboratories = () => {
    return Laboratory.find({ status: STATUS_TYPE.ACTIVE })
        .then(serialize)
}

const findLaboratory = (val, prop = 'id') => {
    if (prop === 'id') {
        prop = '_id'
    }
    return Laboratory.find({ [prop]: val, status: STATUS_TYPE.ACTIVE })
        .then(resp => {
            return serialize(resp[0])
        })
}

const findLaboratoriesBy = (val, prop = 'name') => {
    return Laboratory.find({ [prop]: val, status: STATUS_TYPE.ACTIVE })
        .then(serialize)
}

const addLaboratory = laboratoryInfo => {
    let laboratory = makeLaboratory(laboratoryInfo)
    let newLaboratory = {
        name: laboratory.getName(),
        address: laboratory.getAddress(),
        status: laboratory.getStatus(),
    }
    return Laboratory.create(newLaboratory)
        .then(serialize)
}

const deleteLaboratory = id => {
    return Laboratory.findByIdAndUpdate(id, { status: STATUS_TYPE.INACTIVE })
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

const updateLaboratory = (id, val) => {
    let laboratory = makeLaboratory(val)
    let newLaboratory = {
        name: laboratory.getName(),
        address: laboratory.getAddress(),
        status: laboratory.getStatus(),
    }
    return Laboratory.findByIdAndUpdate(id, newLaboratory).then(serialize)
}

const dropAll = () => {
    return Laboratory.remove()
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