const laboratoryDb = require('./index')
const { STATUS_TYPE } = require('../../utils/consts')

describe('laboratoryDb', () => {
    beforeEach(async () => {
        await laboratoryDb.dropAll();
        const labCeltics = {
            name: 'Lab Celtics',
            address: "Address Main Street, numer 4",
        }
        const labYankes = {
            name: 'Lab Yankes',
            address: "Address Main Street, numer 9",
        }
        await laboratoryDb.addLaboratory(labCeltics)
        await laboratoryDb.addLaboratory(labYankes)
    })

    it('drops database', async () => {
        await laboratoryDb.dropAll()
        const laboratories = await laboratoryDb.listLaboratories()
        expect(laboratories).toEqual([])
    })

    it('lists laboratories', async () => {
        const input = await laboratoryDb.listLaboratories()
        const actual = 2
        expect(input.length).toEqual(actual)
    })

    it('find single laboratory by id', async () => {
        const laboratories = await laboratoryDb.listLaboratories()
        const id = laboratories[0].id

        const laboratory = await laboratoryDb.findLaboratory(id)
        const input = laboratory.id
        const actual = id
        expect(input).toEqual(actual)
    })

    it('finds all laboratories by property', async () => {
        const laboratories = await laboratoryDb.findLaboratoriesBy('Lab Celtics', 'name')
        expect(laboratories.length).toEqual(1)
    })

    it('inserts a laboratory', async () => {
        const labRed = {
            name: 'Lab Red',
            address: "Address Main Street, numer 9",
        }

        const newLaboratory = await laboratoryDb.addLaboratory(labRed)
        const { id, ...input } = newLaboratory

        let actual = {
            ...labRed,
            status: STATUS_TYPE.ACTIVE
        }
        expect(input).toEqual(actual)
    })

    it('throws error if inserts a laboratory with invalid payload', () => {
        const invalid = {
            name: 'Lab Mets',
            status: 2
        }
        expect(() => {
            laboratoryDb.addLaboratory(invalid)
        }).toThrow('Status must to be active or inactive')
    })

    it('deletes a laboratory', async () => {
        const laboratories = await laboratoryDb.listLaboratories()
        const id = laboratories[0].id.toString()
        const validInput = await laboratoryDb.deleteLaboratory(id)

        const validActual = {
            status: 'success',
            id
        }
        expect(validInput).toEqual(validActual)

        const newLaboratories = await laboratoryDb.listLaboratories()

        expect(newLaboratories.length).not.toEqual(laboratories.length)
        expect(newLaboratories.length).toBeLessThan(laboratories.length)

        const invalidInput = await laboratoryDb.deleteLaboratory(42)
        const invalidActual = {
            status: 'fail'
        }
        expect(invalidInput).toEqual(invalidActual)
    })

    it('update a laboratory', async () => {
        const laboratories = await laboratoryDb.listLaboratories()
        const laboratory = laboratories[0]
        const updatedLab = { ...laboratory, name: "Updated Name" }
        const validInput = await laboratoryDb.updateLaboratory(laboratory.id, updatedLab)

        expect(validInput.status).toEqual('success')
        expect(validInput.laboratory_old).toEqual(laboratory)
        expect(validInput.laboratory).toEqual(updatedLab)
    })

    it('update validate data laboratory', async () => {
        const laboratories = await laboratoryDb.listLaboratories()
        const laboratory = laboratories[0]
        const updatedLab = { ...laboratory, address: 2 }

        expect(() => {
            laboratoryDb.updateLaboratory(laboratory.id, updatedLab)
        }).toThrow('Address must have address as string')
    })

    it('update invalid laboratory', async () => {
        const laboratories = await laboratoryDb.listLaboratories()
        const laboratory = laboratories[0]
        const updatedLab = { ...laboratory, name: "Updated Name" }

        const invalidInput = await laboratoryDb.updateLaboratory(9000, updatedLab)
        expect(invalidInput.status).toEqual('fail')
    })

})