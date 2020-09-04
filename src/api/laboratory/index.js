/**
 * Sets the base URL to this API
 */
const LABORATORY_BASE_URL = '/laboratories'

const laboratoryDB = require('../../data-access/laboratory-db')

module.exports = (router, database) => {
    /**
       * Retrieves all laboratories from database
       */
    router.get(LABORATORY_BASE_URL, (req, res) => {
        // Returning Status 200 and the json with laboratories.
        laboratoryDB.listLaboratories().then(data => {
            res.status(200).json(data)
        }).catch(err => {
            res.status(400).json({ message: err.message })
        })
    })

    /**
       * Add new laboratory on persistence
       */
    router.post(LABORATORY_BASE_URL, (req, res) => {
        try {
            laboratoryDB.addLaboratory(req.body).then(data => {
                res.status(201).json(data)
            }).catch(err => {
                res.status(500).json({ message: err.message })
            })
        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    })

    /**
       * Retrieves a single laboratory
       */
    router.get(`${LABORATORY_BASE_URL}/:id`, (req, res) => {
        const { id } = req.params

        laboratoryDB.findLaboratory(id).then(data => {
            res.status(200).json(data)
        }).catch(err => {
            res.status(500).json({ message: err.message })
        })
    })

    /**
       * Update laboratory on persistence
       */
    router.put(`${LABORATORY_BASE_URL}/:id`, (req, res) => {
        const { id } = req.params
        try {
            laboratoryDB.updateLaboratory(id, req.body).then(data => {
                res.status(200).json(data)
            }).catch(err => {
                res.status(500).json({ message: err.message })
            })
        } catch (e) {
            res.status(400).json({ message: e.message })
        }
    })

    /**
       * Delete laboratory on persistence
       */
    router.delete(`${LABORATORY_BASE_URL}/:id`, (req, res) => {
        const { id } = req.params

        laboratoryDB.deleteLaboratory(id).then(data => {
            res.status(204).json(data)
        }).catch(err => {
            res.status(500).json({ message: err.message })
        })
    })
}