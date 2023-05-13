const mongoose = require('mongoose')

const mongodbURI = process.env.MONGODB_URI

mongoose.connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Conectado ao MongoDB')
}).catch(error => {
    console.log(error)
    const msg = 'Erro ao conectar ao MongoDB'
    console.log(msg)
})