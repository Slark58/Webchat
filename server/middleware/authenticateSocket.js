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