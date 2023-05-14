const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const modelsUser = require('../models/User')
const crypto = require('crypto')

const client = require('../../modules/mailer')

const { User } = modelsUser()

const jwt_key = process.env.JWT_SECRET

const generateToken = (params = {}) => {
  return jwt.sign(params, jwt_key, {
    expiresIn: 86400
  })
}

module.exports = {

  // register
  register: async (req, res) => {
    const { email } = req.body

    try {
      if (await User.findOne({ email })) {
        return res.status(400).send({ error: 'User already exists.' })
      }

      const user = new User(req.body)
      await user.save()

      user.password = undefined

      return res.send({
        user,
        token: generateToken({ id: user.id })
      })

    } catch (err) {
      return res.status(400).send({ error: 'Registration failed.' })
    }
  }
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

  // user profile
  userProfile: async (req, res) => {
    res.send({ ok: true, user: req.userId })
  }
  ,
  // forgot password
  forgotPassword: async (req, res) => {
    const { email } = req.body

    try {
      const user = await User.findOne({ email })

      if (!user)
        return res.status(400).send({ error: 'User not found.' })

      const token = crypto.randomBytes(20).toString('hex')

      const now = new Date()
      now.setHours(now.getHours() + 1)

      await User.findByIdAndUpdate(user.id, {
        '$set': {
          passwordResetToken: token,
          passwordResetExpires: now
        }
      })

      // .sendMail({
      //   from: 'ronier.lim@gmail.com',
      //   to: email,
      //   subject: 'Link para Resetar sua Senha ✔',
      //   text: `Utilize o token ${token} para resetar sua senha`,
      // }, (err) => {
      //   if (err)
      //     return res.status(400).send({ error: 'Cannot send forgot password email' })

      //   return res.status(200).send({ message: "Email send successfully" })
      // })

      client
        .send({
          from: {
            email: "mailtrap@ronierlima.dev",
            name: "Mailtrap Test",
          },
          to: [{
            email: "ronier.lim@gmail.com",
          }],
          template_uuid: "20deed01-4f02-4026-902e-2a90c9c46b29",
          template_variables: {
            "user_email": token,
            "user_token": token
          }
        })
        .then(() => res.status(200).send({ message: "Email send successfully" }), (error) => {
          console.log(error)
          return res.status(400).send({ error: 'Cannot send forgot password email' })
        }
        );


    } catch (err) {
      console.log(err)
      return res.status(400).send({ error: 'Error on forgot password, try again' })
    }
  }
  ,
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
  listUsers: async (req, res) => {
    try {
      const users = await User.find().select('-passwordResetToken -passwordResetExpires')

      return res.send(users)
    } catch (err) {
      return res.status(400).send({ error: 'Error fetching users.' })
    }
  }

}


