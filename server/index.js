require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const http = require('http')
const { Server } = require('socket.io')

const PORT = process.env.PORT || 5000


const app = express()
app.use(cors({
    origin: '*'
}))
app.use(express.json())
app.use('/api', router)


const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
        method: ["GET", "POST"],
    } 
})

// app.get('/io', (req, res) => {
//     res.json('hi')
// })

io.on('connection', (socket) => {
    console.log(socket.id);
});   

app.use(errorHandler)

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