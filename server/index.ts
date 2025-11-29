require('dotenv').config()
import express from 'express'
import sequelize from './db'
import models from './models/models'
import cors from 'cors'
import router from './routes/index'
import errorHandler from './middleware/ErrorHandlingMiddleware'
import http from 'http'
import { WebSocketServer } from 'ws'


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
