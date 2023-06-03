const jwt = require('jsonwebtoken')

const jwt_key = process.env.JWT_SECRET

module.exports = {
  authenticationJWT: (req, res, next) => {

    const authHeader = req.headers.authorization

    if (!authHeader)
      return res.status('401').send({ error: 'Token não informado' })

    const parts = authHeader.split(' ')

    if (!parts.length === 2)
      return res.status('401').send({ error: 'Erro no token' })

    const [bearer, token] = parts

    if (!/^Bearer$/i.test(bearer))
      return res.status('401').send({ error: 'Token malformatado' })

    jwt.verify(token, jwt_key, (err, decoded) => {
      if (err)
        return res.status('401').send({ error: 'Token inválido' })

      req.userId = decoded.id

      return next()
    })
  },

  getUserIdFromToken: (token) => {
    try {

      if (token.split(" ").length > 1)
        token = token.split(" ")[1]

      const decoded = jwt.decode(token);
      console.log(decoded)


      return decoded.id;
    } catch (error) {
      // Caso ocorra algum erro na verificação do token
      console.error('Erro na verificação do token:', error);
      return null;
    }
  },

  generateToken: (params = {}) => {
    return jwt.sign(params, jwt_key, {
      expiresIn: 86400
    })
  }
}

