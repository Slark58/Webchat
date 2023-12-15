const ApiError = require('../error/ApiError');
const {FriendShips, User} = require('../models/models')
const {io} = require('../index')

class FriendShipController {

    async getFriendByQuery(req, res, next) {
        const username = req.query.username
        const candidates = await User.findAll({where: {username}, attributes: ['id', 'username']})
        if (candidates.length === 0) {
            return next(ApiError.badRequest('Пользователь не найден'))
        }
        return res.json({candidates})
    }

    async makeFriendship(req, res, next) {
        const {receiverId, senderId} = req.body
        console.log(receiverId);
        const friend = await User.findOne({where: {id: receiverId}, attributes: ['id', 'username']});
        // io.sockets.emit('friendshipCreated', {senderId, receiverId})
        if (!friend) {
            return next(ApiError.badRequest('Не удалось добавить пользователя'))
        }
        const friendShip = await FriendShips.create({senderId, receiverId})
        return res.json(friend)
    }

    async getFriendshipWannabe(req, res, next) {
        const {receiverId} = req.query
        const friendShip = await FriendShips.findAll({where: {receiverId}});

        const senserIds = friendShip.map(item => item.senderId)

        const candidates = await User.findAll({
            where: { id: senserIds}, attributes: ['id', 'username'], // Поиск пользователей по senderId
          })
        if (!candidates) {
            return next(ApiError.badRequest('Нет заявок'))
        }
        // const friendShip = await FriendShips.create({senderId, receiverId})
        return res.json({candidates})
    }
}


module.exports = new FriendShipController()