const request = require('supertest')
const app = require('../../app')

describe('API /api/exams', function () {
    const api = request(app)

    it('GET /api/exams', done => {
        api.get('/api/exams')
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

    it('GET /api/exams/:id', done => {
        api.get('/api/exams/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200).then(res => {
                expect(res.body.id).toBeDefined()
                done()
            })


        api.get('/api/exams/12342134')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200).then(res => {
                expect(res.body).toBeNull()
                done()
            })
    })

    it('PUT /api/exams/:id', done => {
        api.put('/api/exams/1')
            .send({ name: 'Lab Test 3', type: 'image' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200).then(res => {
                expect(res.body.exam_old).toBeDefined()
                expect(res.body.exam).toBeDefined()
                done()
            })


        api.put('/api/exams/1')
            .send({ name: 'Lab Test 3', status: 1 })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, done)
    })

    it('DELETE /api/exams/:id', done => {
        api.delete('/api/exams/1')
            .set('Accept', 'application/json')
            .expect(204, done)


        api.get('/api/exams/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200).end((err, res) => {
                if (err) return done(err)
                expect(res.body).toBeNull()
                done()
            })
    })


    afterAll(done => {
        return app.close(done)
    })
})