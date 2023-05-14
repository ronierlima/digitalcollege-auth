const app = require('express')()
const consign = require('consign')

const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv').config()


require('./config/db')

const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

const routes = require('./routes/routes.js');

routes(app);

app.listen(port, () => {
  console.log(`Servidor online in ${port}`)
})

app.get("/", (req, res) => {
  console.log(`teste`)
  return res.status(200).send({ error: 'Error creating new project.' })
})