const makeLaboratory = require('./index')

describe('makeLaboratory', () => {
    it('throws error if invalid payload', () => {

        expect(() => makeLaboratory({
            name: 1,
            address: 1,
            status: 1
        })
        ).toThrowError('must have name as string')

        expect(() => makeLaboratory({
            address: 1,
            status: 1
        })
        ).toThrowError('must have name as string')

        expect(() => makeLaboratory({
            name: 'Laboratory 1',
            address: 1,
            status: 1
        })
        ).toThrowError('must have address as string')

        expect(() => makeLaboratory({
            name: 'Laboratory 1',
            address: 'Street 21',
            status: 1
        })).toThrowError('must to be active or inactive')

        expect(() => makeLaboratory({
            name: 'Laboratory 1',
            address: 'twleve',
            status: 'Something Wrong'
        })).toThrowError('must to be active or inactive')
    })

    it('must have name', () => {
        const name = 'Laboratory 1'
        const lab = makeLaboratory({
            name,
        })
        const input = lab.getName()
        expect(input).toEqual(name)
    })

    it('can have address', () => {
        const name = 'Laboratory 1'
        const address = 'Street 12'
        const lab = makeLaboratory({
            name,
            address,
        })
        const input = lab.getAddress()
        expect(input).toEqual(address)
    })

    it('must to have default status', () => {
        const name = 'Laboratory 1'
        const lab = makeLaboratory({
            name,
        })
        const input = lab.getStatus()
        expect(input).toEqual('active')
    })

    it('must to have status', () => {
        const name = 'Laboratory 1'
        const status = 'inactive'
        const lab = makeLaboratory({
            name,
            status,
        })
        const input = lab.getStatus()
        expect(input).toEqual(status)
    })
})