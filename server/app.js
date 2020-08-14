require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./routes')
const error_handler = require('./middlewares/error_handler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', router)
app.use(error_handler)


module.exports = app