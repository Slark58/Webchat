require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const authenticateSocket = require('./middleware/authenticateSocket')
const http = require('http')
const jwt = require('jsonwebtoken');
const { Server } = require('socket.io')
// const {io} = require('./socket')

const PORT = process.env.PORT || 5000


const app = express()
app.use(cors({
    origin: '*'
}))
app.use(express.json())
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
        method: ["GET", "POST"],
    } 
})
app.use('/api', router)
app.use(errorHandler)


io.on('connection', (socket) => {
    console.log(socket.id);

    // socket.on("friendshipCreated", (data) => {
    //     console.log(data)
    // })

});   


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        server.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}


start()
