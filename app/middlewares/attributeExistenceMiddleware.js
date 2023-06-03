const attributeExistenceMiddleware = (Model) => {
    return (req, res, next) => {
        const attributesToUpdate = req.body

        // Verificar se os atributos enviados existem no modelo fornecido
        const validAttributes = Object.keys(attributesToUpdate)
        const invalidAttributes = validAttributes.filter(attribute => !Model.schema.paths[attribute])

        if (invalidAttributes.length > 0) {
            return res.status(400).json({ error: `Os seguintes atributos não existem: [${invalidAttributes.join(', ')}]` })
        }

        next()
    }
}

module.exports = attributeExistenceMiddleware;