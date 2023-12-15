const jwt = require('jsonwebtoken');

const authenticateSocket = async (socket, next) => {
  // const token = socket.handshake.auth.token;
  const token = socket.handshake.auth.token;
  console.log('token:', token);

  if (!token) {
    console.log('lox ebani');
    return next(new Error('Authentication error: Token not provided'));
  }

  try {
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    socket.decode = decode;
    console.log(socket);  
    console.log(socket.id);
    next();
  } catch (error) {
    return next(new Error('Authentication error: Invalid token'));
  }
}; 
 

module.exports = authenticateSocket;




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