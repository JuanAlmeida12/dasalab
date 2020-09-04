const examDb = require('./index')

const laboratoryDb = require('./../laboratory-db')
const { STATUS_TYPE, EXAM_TYPE } = require('../../utils/consts')

describe('examDb', () => {
    beforeEach(async () => {
        await examDb.dropAll()
        await laboratoryDb.dropAll()
        const labCeltics = {
            name: 'Lab Celtics',
            address: "Address Main Street, numer 4",
        }

        await laboratoryDb.addLaboratory(labCeltics)

        const examSeed1 = {
            name: 'Exam name 1',
            type: EXAM_TYPE.CLINICAL_ANALYSIS,
        }
        const examSeed2 = {
            name: 'Exam name 2',
            type: EXAM_TYPE.IMAGE,
        }
        await examDb.addExam(examSeed1)
        await examDb.addExam(examSeed2)
    })

    it('drops database', async () => {
        await examDb.dropAll()
        const exams = await examDb.listExams()
        expect(exams).toEqual([])
    })

    it('lists exams', async () => {
        const input = await examDb.listExams()
        const actual = 2
        expect(input.length).toEqual(actual)
    })

    it('find single exam by id', async () => {
        const exams = await examDb.listExams()
        const id = exams[0].id

        const exam = await examDb.findExam(id)
        const input = exam.id
        const actual = id
        expect(input).toEqual(actual)
    })

    it('finds all exams by property', async () => {
        const exams = await examDb.findExamsBy('Exam name 1', 'name')
        expect(exams.length).toEqual(1)
    })

    it('inserts a exam', async () => {
        const examRed = {
            name: 'Exam Red',
            type: EXAM_TYPE.CLINICAL_ANALYSIS,
            labs: []
        }

        const newExam = await examDb.addExam(examRed)
        const { id, ...input } = newExam

        let actual = {
            ...examRed,
            status: STATUS_TYPE.ACTIVE
        }
        expect(input).toEqual(actual)
    })

    it('throws error if inserts a exam with invalid payload', () => {
        const invalid = {
            name: 'Lab Mets',
            type: EXAM_TYPE.CLINICAL_ANALYSIS,
            status: 2,
        }
        expect(() => {
            examDb.addExam(invalid)
        }).toThrow('Status must to be active or inactive')
    })

    it('deletes a exam', async () => {
        const exams = await examDb.listExams()
        const id = exams[0].id.toString()
        const validInput = await examDb.deleteExam(id)

        const validActual = {
            status: 'success',
            id
        }
        expect(validInput).toEqual(validActual)

        const newExams = await examDb.listExams()

        expect(newExams.length).not.toEqual(exams.length)
        expect(newExams.length).toBeLessThan(exams.length)

        const invalidInput = await examDb.deleteExam(42)
        const invalidActual = {
            status: 'fail'
        }
        expect(invalidInput).toEqual(invalidActual)
    })

    it('update a exam', async () => {
        const exams = await examDb.listExams()
        const exam = exams[0]
        const updatedLab = { ...exam, name: "Updated Name" }
        const validInput = await examDb.updateExam(exam.id, updatedLab)

        expect(validInput.status).toEqual('success')
        expect(validInput.exam_old).toEqual(exam)
        expect(validInput.exam).toEqual(updatedLab)
    })

    it('update validate data exam', async () => {
        const exams = await examDb.listExams()
        const exam = exams[0]
        const updatedLab = { ...exam, type: 2 }

        expect(() => {
            examDb.updateExam(exam.id, updatedLab)
        }).toThrow('Type must be image or clinical analysis')
    })

    it('update invalid exam', async () => {
        const exams = await examDb.listExams()
        const exam = exams[0]
        const updatedLab = { ...exam, name: "Updated Name" }

        const invalidInput = await examDb.updateExam(9000, updatedLab)
        expect(invalidInput.status).toEqual('fail')
    })

    it('associate laboratory to exam', async () => {
        const exams = await examDb.listExams()
        const exam = exams[0]

        const laboratories = await laboratoryDb.listLaboratories()
        const laboratory = laboratories[0]

        const invalidInput = await examDb.associateLab(exam.id, laboratory.id)
        expect(invalidInput.status).toEqual('success')

        const examWithLab = await examDb.findExam(exam.id)

        expect(examWithLab.labs[0].id).toEqual(laboratory.id)
    })

    it('unassociate laboratory to exam', async () => {
        const exams = await examDb.listExams()
        const exam = exams[0]

        const laboratories = await laboratoryDb.listLaboratories()
        const laboratory = laboratories[0]

        const associateInput = await examDb.associateLab(exam.id, laboratory.id)
        expect(associateInput.status).toEqual('success')

        const examWithLab = await examDb.findExam(exam.id)
        
        expect(examWithLab.labs[0].id).toEqual(laboratory.id)

        const unassociateInput = await examDb.unassociateLab(exam.id, laboratory.id)
        expect(unassociateInput.status).toEqual('success')

        const examWithoutLab = await examDb.findExam(exam.id)
        
        expect(examWithoutLab.labs.filter(lab => lab.id == laboratory.id)).toEqual([])

    })

})