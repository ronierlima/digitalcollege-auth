const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv').config()
require('./config/db')

const userController = require('./app/controllers/user');
const authTokenMiddleware = require('./app/middlewares/authToken');

const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

//ROTAS
app.post('/register', userController.register)
app.post('/auth', userController.auth)
app.post('/auth/forgot_password', userController.forgotPassword)
app.post('/auth/reset_password', userController.resetPassword)

app.route('/user')
  .all(authTokenMiddleware.authenticationJWT)
  .get(userController.userProfile)


app.get("/", (req, res) => {
  console.log(`teste`)
  return res.status(200).send({ teste: 'teste' })
})

app.listen(port, () => {
  console.log(`Servidor online in ${port}`)
})