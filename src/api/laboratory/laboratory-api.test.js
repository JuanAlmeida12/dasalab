const request = require('supertest')
const app = require('../../app')

const laboratoryDb = require('../../data-access/laboratory-db')

describe('API /api/laboratories', function () {
    const api = request(app)

    it('GET /api/laboratories', done => {
        api.get('/api/laboratories')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
    })

    it('POST /api/laboratories', done => {
        api.post('/api/laboratories')
            .send({ name: 'Test Lab', address: 'Address 1' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201).end(done)

        api.post('/api/laboratories')
            .send({ name: 'Test Lab', address: 2 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400).end(done)

        api.post('/api/laboratories')
            .send({ name: 'Test Lab', status: 2 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400).end(done)
    })

    it('GET /api/laboratories/:id', async done => {
        const lab = await laboratoryDb.addLaboratory({ name: 'Test Lab' })
        api.get(`/api/laboratories/${lab.id}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200).then(res => {
                expect(res.body.id).toBeDefined()
                done()
            })


        api.get('/api/laboratories/5f5246e8a01abc22a493d568')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200).then(res => {
                expect(res.body).toBeNull()
                done()
            })
    })

    it('PUT /api/laboratories/:id', async done => {
        const lab = await laboratoryDb.addLaboratory({ name: 'Test Lab' })
        api.put(`/api/laboratories/${lab.id}`)
            .send({ name: 'Lab Test 3' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200).then(res => {
                expect(res.body.laboratory_old).toBeDefined()
                expect(res.body.laboratory).toBeDefined()
                done()
            })


        api.put('/api/laboratories/5f5246e8a01abc22a493d568')
            .send({ name: 'Lab Test 3', status: 1 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done)
    })

    it('DELETE /api/laboratories/:id', async done => {
        const lab = await laboratoryDb.addLaboratory({ name: 'Test Lab' })
        api.delete(`/api/laboratories/${lab.id}`)
            .set('Accept', 'application/json')
            .expect(204, done)


        api.get(`/api/laboratories/${lab.id}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200).end((err, res) => {
                if (err) return done(err)
                expect(res.body).toBeNull()
                done()
            })
    })


    afterAll(done => {
        laboratoryDb.dropAll()
        return app.close(done)
    })
})