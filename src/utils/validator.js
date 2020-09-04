const validator = (schema) =>
    (payload) => {
        const { error } = schema.validate(payload, { abortEarly: false })
        if (error) {
            return {
                error: error.message
            }
        }
        return true
    }

module.exports = validator