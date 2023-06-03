const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../models')
const { Link } = require('../models');

const crypto = require('crypto')

const emailService = require('../../services/emailService')
const attributeExistenceMiddleware = require('../middlewares/attributeExistenceMiddleware');
const { getUserIdFromToken } = require('../middlewares/authToken');

const jwt_key = process.env.JWT_SECRET

const generateToken = (params = {}) => {
  return jwt.sign(params, jwt_key, {
    expiresIn: 86400
  })
}

module.exports = {

  // register
  register: [
    attributeExistenceMiddleware(User),
    async (req, res) => {
      const { email } = req.body

      try {
        if (await User.findOne({ email })) {
          return res.status(400).send({ error: 'Já existe um usuário cadastrado com esse email' })
        }

        const user = new User(req.body)

        const validationError = user.validateSync();

        if (validationError) {
          const errorMessages = Object.values(validationError.errors).map(error => error.message);
          return res.status(400).json({ error: errorMessages.join('\n') });
        }

        await user.save()

        user.password = undefined

        await emailService.sendWelcomeEmail(user);

        return res.send(user)

      } catch (err) {
        return res.status(400).send({ error: 'Falha no cadastro de novo usuário.' })
      }
    }
  ]
  ,
  // authenticate
  auth: async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+password')

    if (!user) {
      return res.status(400).send({ error: 'User not found.' })
    }

    if (!await bcrypt.compare(password, user.password)) {
      return res.status(400).send({ error: 'Invalid password.' })
    }

    user.password = undefined

    res.send({
      user,
      token: generateToken({ id: user.id })
    })
  }
  ,
  // forgot password
  forgotPassword: [
    attributeExistenceMiddleware(User),
    async (req, res) => {
      const { email } = req.body;

      try {
        const user = await User.findOne({ email });

        if (!user) {
          return res.status(400).send({ error: 'User not found.' });
        }

        const token = crypto.randomBytes(20).toString('hex')

        const now = new Date()
        now.setHours(now.getHours() + 1)

        await User.findByIdAndUpdate(user.id, {
          '$set': {
            passwordResetToken: token,
            passwordResetExpires: now
          }
        })

        await emailService.sendForgotPasswordEmail(user);

        return res.status(200).send({ message: 'E-mail enviado com sucesso' });

      } catch (err) {
        console.log(err);
        return res.status(400).send({ error: 'Erro ao solicitar a redefinição de senha, tente novamente' });
      }
    }
  ],

  // reset password
  resetPassword: async (req, res) => {
    const { email, token, password } = req.body

    try {
      const user = await User.findOne({ email })
        .select('+passwordResetToken passwordResetExpires')

      if (!user)
        return res.status(400).send({ error: 'User not found.' })

      if (token !== user.passwordResetToken)
        return res.status(400).send({ error: 'Token invalid.' })

      const now = new Date()

      if (now > user.passwordResetExpires)
        return res.status(400).send({ error: 'Token expired, generate a new token.' })

      user.password = password

      await user.save()

      res.status(200).send({ message: 'Updated password' })
    } catch (err) {
      res.status(400).send({ error: 'Cannot reset password, try again.' })
    }
  }

  ,
  listUsers: async (_, res) => {
    try {
      const users = await User.find().select('-passwordResetToken -passwordResetExpires')
      res.json(users)
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Erro ao buscar os usuários' })
    }
  },

  getUserById: async (req, res) => {
    const userId = req.params.user_id

    try {
      const user = await User.findById(userId)
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' })
      }

      res.json(user)
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Erro ao buscar o usuário' })
    }
  },

  updateUserById: [
    attributeExistenceMiddleware(User),
    async (req, res) => {
      const userId = req.params.user_id

      delete req.body.isAdmin

      try {
        const user = await User.findByIdAndUpdate(
          userId,
          { $set: req.body }, // Usando o operador $set para atualizar os atributos recebidos no corpo da solicitação
          { new: true }
        )

        if (!user) {
          return res.status(404).json({ error: 'Usuário não encontrado' })
        }

        res.json(user)
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Erro ao atualizar o usuário' })
      }
    }
  ],

  deleteUserById: async (req, res) => {
    const userId = req.params.user_id

    try {
      const user = await User.findByIdAndRemove(userId)
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' })
      }

      res.json({ message: 'Usuário excluído com sucesso' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Erro ao excluir o usuário' })
    }
  },

  // Obtém todos os links de um usuário específico
  getUserLinks: async (req, res) => {
    try {

      let userIdRequest;
      if (req.headers.authorization)
        userIdRequest = getUserIdFromToken(req.headers.authorization)

      const userId = req.params.user_id;

      let links;

      if (userIdRequest !== userId) {
        links = await Link.find({ user: userId, isPublic: true });
      } else {
        links = await Link.find({ user: userId });
      }

      res.status(200).json(links);

    } catch (error) {

      console.log(error)
      res.status(500).json({ error: 'Não foi possível obter os links do usuário' });
    }
  }
}


