const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path');

require('dotenv').config()
require('./config/db')

const app = express();

const userController = require('./app/controllers/user');
const authTokenMiddleware = require('./app/middlewares/authToken');
const swaggerDocument = require('./config/swagger')

const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

//ROTAS
app.use('/swagger-ui', express.static(path.join(__dirname, 'swagger-ui')));

app.get('/swagger.json', (_, res) => {

  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocument);
});

app.post('/auth', userController.auth)
app.post('/auth/forgot_password', userController.forgotPassword)
app.post('/auth/reset_password', userController.resetPassword)

app.route('/users')
  .post(userController.register)
  .all(authTokenMiddleware.authenticationJWT)
  .get(userController.listUsers)

app.route('/users/:user_id')
  .all(authTokenMiddleware.authenticationJWT)
  .get(userController.getUserById)
  .put(userController.updateUserById)
  .delete(userController.deleteUserById)


app.get("/", (req, res) => {
  console.log(`teste`)
  return res.status(200).send({ teste: 'teste' })
})

app.listen(port, () => {
  console.log(`Servidor online in ${port}`)
})