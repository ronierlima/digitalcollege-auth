// linkController.js
const attributeExistenceMiddleware = require('../middlewares/attributeExistenceMiddleware');
const { getUserIdFromToken } = require('../middlewares/authToken');

const { Link } = require('../models')


module.exports = {

  createLink : [
  attributeExistenceMiddleware(Link),
  async (req, res) => {

    const userId = getUserIdFromToken(req.headers.authorization)

    try {

      const link = new Link({ ...req.body, user: userId, })

      const validationError = link.validateSync();

      if (validationError) {
        const errorMessages = Object.values(validationError.errors).map(error => error.message);
        return res.status(400).json({ error: errorMessages.join('\n') });
      }

      await link.save()

      res.status(201).json(link);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Não foi possível criar o link' });
    }
  }]
}