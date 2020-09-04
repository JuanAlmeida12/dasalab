const request = require('supertest')
const app = require('../../app')
const examDB = require('../../data-access/exam-db')
const laboratoryDB = require('../../data-access/laboratory-db')

describe('API /api/exams', function () {
    const api = request(app)


    it('GET /api/exams', done => {
        api.get('/api/exams')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
    })

    it('GET /api/exams', done => {
        api.get('/api/exams/search/name')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
    })

    it('POST /api/exams', done => {
        api.post('/api/exams')
            .send({ name: 'Test Lab', type: 'image' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201).end(done)

        api.post('/api/exams')
            .send({ name: 'Test Lab', type: 2 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400).end(done)

        api.post('/api/exams')
            .send({ name: 'Test Lab', status: 2 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400).end(done)
    })

    it('GET /api/exams/:id', async done => {
        const exam = await examDB.addExam({ name: 'Test Lab', type: 'image' })
        api.get(`/api/exams/${exam.id}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200).then(res => {
                expect(res.body.id).toBeDefined()
                done()
            })


        api.get('/api/exams/5f5246e8a01abc22a493d568')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200).then(res => {
                expect(res.body).toBeNull()
                done()
            })
    })

    it('GET /api/exams/:id/laboratories', async done => {
        const exam = await examDB.addExam({ name: 'Test Lab', type: 'image' })

        api.get(`/api/exams/${exam.id}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200).then(res => {
                expect(res.body.labs).toEqual([])
                done()
            })


        api.get('/api/exams/5f5246e8a01abc22a493d568')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200).then(res => {
                expect(res.body).toBeNull()
                done()
            })
    })

    it('PUT /api/exams/:id', async done => {
        const exam = await examDB.addExam({ name: 'Test Lab', type: 'image' })
        api.put(`/api/exams/${exam.id}`)
            .send({ name: 'Lab Test 3', type: 'image' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200).then(res => {
                expect(res.body.exam_old).toBeDefined()
                expect(res.body.exam).toBeDefined()
                done()
            })


        api.put('/api/exams/5f5246e8a01abc22a493d568')
            .send({ name: 'Lab Test 3', status: 1 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done)
    })

    it('DELETE /api/exams/:id', async done => {
        const exam = await examDB.addExam({ name: 'Test Lab', type: 'image' })
        api.delete(`/api/exams/${exam.id}`)
            .set('Accept', 'application/json')
            .expect(204, done)


        api.get(`/api/exams/${exam.id}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200).end((err, res) => {
                if (err) return done(err)
                expect(res.body).toBeNull()
                done()
            })
    })

    it('POST /api/exams/:id/associate', async done => {
        const exam = await examDB.addExam({ name: 'Test exam', type: 'image' })
        const lab = await laboratoryDB.addLaboratory({ name: 'Test Lab' })
        api.put(`/api/exams/${exam.id}/associate`)
            .send({ laboratoryId: lab.id })
            .set('Accept', 'application/json')
            .expect(201).end(done)

        api.get(`/api/exams/${exam.id}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200).then(res => {
                expect(res.body.labs).toEqual([lab])
                done()
            })



        api.delete(`/api/exams/${exam.id}/unassociate`)
            .set('Accept', 'application/json')
            .expect(204).end(done)
    })

    afterAll(done => {
        examDB.dropAll()
        laboratoryDB.dropAll()
        return app.close(done)
    })
})