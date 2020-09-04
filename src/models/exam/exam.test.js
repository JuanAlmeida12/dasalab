const makeExam = require('./index')

describe('makeExam', () => {
    it('throws error if invalid payload', () => {

        expect(() => makeExam({
            name: 1,
            type: 1,
            status: 1
        })
        ).toThrowError('must have name as string')

        expect(() => makeExam({
            type: 1,
            status: 1
        })
        ).toThrowError('must have name as string')

        expect(() => makeExam({
            name: 'Exam 1',
            type: 1,
            status: 1
        })
        ).toThrowError('Type must be image or clinical analysis')

        expect(() => makeExam({
            name: 'Exam 1',
            type: 'string',
            status: 1
        })
        ).toThrowError('Type must be image or clinical analysis')

        expect(() => makeExam({
            name: 'Exam 1',
            type: 'image',
            status: 1
        })).toThrowError('must to be active or inactive')

        expect(() => makeExam({
            name: 'Exam 1',
            type: 'image',
            status: 'Something Wrong'
        })).toThrowError('must to be active or inactive')
    })

    it('must have name and type', () => {
        const name = 'Exam 1'
        const type = 'image'
        const exam = makeExam({
            name,
            type,
        })
        const inputName = exam.getName()
        const inputType = exam.getType()
        expect(inputName).toEqual(name)
        expect(inputType).toEqual(type)
    })

    it('must to have default status', () => {
        const name = 'Exam 1'
        const exam = makeExam({
            name,
            type: 'image',
        })
        const input = exam.getStatus()
        expect(input).toEqual('active')
    })

    it('must to have status', () => {
        const name = 'Exam 1'
        const status = 'inactive'
        const type = 'image'
        const exam = makeExam({
            name,
            type,
            status,
        })
        const input = exam.getStatus()
        expect(input).toEqual(status)
    })

    it('must to empty labs ', () => {
        const name = 'Exam 1'
        const status = 'inactive'
        const type = 'image'
        const exam = makeExam({
            name,
            type,
            status,
        })
        const input = exam.getLabs()
        expect(input).toEqual([])
    })

    it('must to empty labs ', () => {
        const name = 'Exam 1'
        const status = 'inactive'
        const type = 'image'
        const labs = [{ name: 'Lab Seed 1' }, { name: 'Lab Seed 2' }, { name: 'Lab Seed 3' }]
        const exam = makeExam({
            name,
            type,
            status,
            labs,
        })
        const input = exam.getLabs()
        expect(input.length).toEqual(labs.length)
    })


})