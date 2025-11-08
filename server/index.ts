require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const http = require('http')
const { WebSocketServer } = require('ws')


const PORT = process.env.PORT || 5000


const app = express()
app.use(cors({origin: '*'}))
app.use(express.json())
app.use('/api', router)
app.use(errorHandler)


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`HTTP+WS server on ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
