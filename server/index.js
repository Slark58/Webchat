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
// io.use((socket, next) => authenticateSocket(socket, next))




// io.use(async (socket, next) => {

//     // Здесь для Socket.IO нет заголовков, поэтому передаем токен через параметры запроса (например, socket.handshake.query.token)
//     const token = socket.handshake.auth.token;
//     if (token) {
//         console.log('token io:', token);
//         // Проверяем и верифицируем токен
//         jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
//             if (err) {
//                 // Если токен не прошел верификацию, вызываем ошибку или выполняем другие действия
//                 return next(new Error('Invalid token'));
//             }
//             // Если токен верен, можно сохранить раскодированные данные в объекте сокета для дальнейшего использования
//             socket.decoded = decoded;
//             next(); // Продолжаем работу с сокетом
//         });
//     } else {
//         console.log('lox');
//         // Если токен отсутствует, вызываем ошибку
//         next(new Error('Token is not provided'));
//     }
// });

io.on('connection', (socket) => {
    console.log(socket.id);
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