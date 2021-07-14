const express = require('express')
require("reflect-metadata")

const app = express()

//puerto de variable de entorno o 4000
app.set('port', process.env.PORT || 4000)
app.use(express.json())
app.use(express.urlencoded({extended: false}))



app.use("/api/v1/categories",require('./routes/categories.routes'))
app.use("/api/v1/products",require('./routes/products.routes'))

module.exports =  app