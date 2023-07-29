// linkController.js
const attributeExistenceMiddleware = require('../middlewares/attributeExistenceMiddleware');
const { getUserIdFromToken } = require('../middlewares/authToken');

const { Link } = require('../models')


module.exports = {

  createLink: [
    attributeExistenceMiddleware(Link),
    async (req, res) => {

      const userId = getUserIdFromToken(req.headers.authorization)

      try {

        const link = new Link({ ...req.body, userId: userId, })

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
    }
  ],

  getAllLinks: async (req, res) => {
    try {
      const links = await Link.find({ user: userId, isPublic: true });

      res.status(200).json(links);

    } catch (error) {

      console.log(error)
      res.status(500).json({ error: 'Não foi possível obter os links do usuário' });
    }
  },

  getLinkById: async (req, res) => {
    const linkId = req.params.link_id

    try {
      const link = await Link.findById(linkId)
      if (!link) {
        return res.status(404).json({ error: 'Link não encontrado' })
      }

      res.json(userView.render(user))
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Erro ao buscar o link' })
    }
  },

  updateLinkById: [
    attributeExistenceMiddleware(Link),
    async (req, res) => {

      const linkId = req.params.id;
      const userId = getUserIdFromToken(req.headers.authorization);

      try {
        const link = await Link.findOneAndUpdate(
          { _id: linkId, user: userId },
          { $set: req.body },
          { new: true }
        );

        if (!link) {
          return res.status(404).json({ error: 'Link não encontrado' });
        }

        res.json(link);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Não foi possível atualizar o link' });
      }
    }
  ],

  deleteLinkById: async (req, res) => {

    let userIdRequest;
    if (req.headers.authorization)
      userIdRequest = getUserIdFromToken(req.headers.authorization)

    const linkId = req.params.link_id;

    try {
      const link = await Link.findByIdAndRemove(linkId)

      if (!link) {
        return res.status(404).json({ error: 'Link não encontrado' })
      }

      // if (userIdRequest !== link.userId) {
      //   return res.status(403).json({ error: 'Link não pertence ao usuário' })
      // }

      res.json({ message: 'Link excluído com sucesso' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Erro ao excluir o link' })
    }
  },
}