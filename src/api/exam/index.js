/**
 * Sets the base URL to this API
 */
const EXAM_BASE_URL = '/exams'

const examDB = require('../../data-access/exam-db')

module.exports = router => {
    /**
       * Retrieves all exams from database
       */
    router.get(EXAM_BASE_URL, (req, res) => {
        // Returning Status 200 and the json with exams.
        examDB.listExams().then(data => {
            res.status(200).json(data)
        }).catch(err => {
            res.status(400).json({ message: err.message })
        })
    })

    /**
       * Retrieves all exams from database
       */
      router.get(`${EXAM_BASE_URL}/search/:name`, (req, res) => {

        const { name } = req.params
        // Returning Status 200 and the json with exams.
        examDB.findExamsBy(name).then(data => {
            res.status(200).json(data.map(exam => ({name:exam.name, labs: exam.labs})))
        }).catch(err => {
            res.status(400).json({ message: err.message })
        })
    })

    /**
       * Add new exam on persistence
       */
    router.post(EXAM_BASE_URL, (req, res) => {
        try {
            examDB.addExam(req.body).then(data => {
                res.status(201).json(data)
            }).catch(err => {
                res.status(500).json({ message: err.message })
            })
        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    })

    /**
       * Associate a lab to a exam
       */
    router.put(`${EXAM_BASE_URL}/:id/associate`, (req, res) => {
        const { id } = req.params
        const { laboratoryId } = req.body

        examDB.associateLab(id, laboratoryId).then(data => {
            res.status(201).json(data)
        }).catch(err => {
            res.status(500).json({ message: err.message })
        })
    })

    /**
       * Unassociate a lab to a exam
       */
      router.delete(`${EXAM_BASE_URL}/:id/unassociate`, (req, res) => {
        const { id } = req.params
        const { laboratoryId } = req.body

        examDB.unassociateLab(id, laboratoryId).then(data => {
            res.status(204).json(data)
        }).catch(err => {
            res.status(500).json({ message: err.message })
        })
    })

    /**
       * Retrieves a single exam
       */
      router.get(`${EXAM_BASE_URL}/:id`, (req, res) => {
        const { id } = req.params

        examDB.findExam(id).then(data => {
            res.status(200).json(data)
        }).catch(err => {
            res.status(500).json({ message: err.message })
        })
    })

    /**
       * Retrieves all laboratories
       */
      router.get(`${EXAM_BASE_URL}/:id/laboratories`, (req, res) => {
        const { id } = req.params

        examDB.findExam(id).then(data => {
            res.status(200).json(data.labs)
        }).catch(err => {
            res.status(500).json({ message: err.message })
        })
    })

    /**
       * Update exam on persistence
       */
    router.put(`${EXAM_BASE_URL}/:id`, (req, res) => {
        const { id } = req.params
        try {
            examDB.updateExam(id, req.body).then(data => {
                res.status(200).json(data)
            }).catch(err => {
                res.status(500).json({ message: err.message })
            })
        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    })

    /**
       * Delete exam on persistence
       */
    router.delete(`${EXAM_BASE_URL}/:id`, (req, res) => {
        const { id } = req.params

        examDB.deleteExam(id).then(data => {
            res.status(204).json(data)
        }).catch(err => {
            res.status(500).json({ message: err.message })
        })
    })
}