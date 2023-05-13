const app = require('express')()
const consign = require('consign')

require('dotenv').config()
require('./config/db')

const port = process.env.PORT || 3000

consign()
  .include('./app/middlewares/authToken.js')
  .then('./config/middlewares.js')
  .then('./app/models/')
  .then('./app/controllers')
  .then('./routes/routes.js')
  .into(app)

app.listen(port, () => {
  console.log(`Servidor online in ${port}`)
})