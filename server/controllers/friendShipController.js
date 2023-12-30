const ApiError = require('../error/ApiError');
const {FriendShips, User} = require('../models/models')
const {io} = require('../index');
const { Op } = require('sequelize');

class FriendShipController {

    async getAllFriends(req, res, next) {
        const {userId} = req.query
        console.log(userId);
        const friendships = await FriendShips.findAll({
            where: {
                accepted: true,
                [Op.or]: [
                    { senderId: userId },
                    { receiverId: userId },
                ],
            },
        })
        if (friendships.length === 0) {
            return res.json([])
        }

        const friendIds = friendships.map((friendship) => {
            if (friendship.senderId === userId) {
              return friendship.receiverId;
            } else {
              return friendship.senderId;
            }
          });

        const candidates = await User.findAll({
            where: { id: friendIds}, attributes: ['id', 'username'], // Поиск пользователей по senderId
        })
        // if (candidates.length === 0) {
        //     return next(ApiError.badRequest('Друзья не получены!'))
        // }
        return res.json({candidates})
    }

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
        const friendShip = await FriendShips.findAll({where: {receiverId, accepted: false}});

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

    async getPotentialFriendship(req, res, next) {
        const {senderId} = req.query
        const friendShip = await FriendShips.findAll({where: {senderId, accepted: false}});

        const receiverIds = friendShip.map(item => item.receiverId)

        const candidates = await User.findAll({
            where: { id: receiverIds}, attributes: ['id', 'username'], // Поиск пользователей по senderId
          })
        if (!candidates) {
            return next(ApiError.badRequest('Нет заявок'))
        }
        // const friendShip = await FriendShips.create({senderId, receiverId})
        return res.json({candidates})
    }



    async acceptFriendship(req, res, next) {
        const {receiverId, senderId} = req.body
        const friendShip = await FriendShips.findOne({where: {receiverId, senderId}});

        if (!friendShip) {
            return next(ApiError.badRequest('Заявка в друзья не найдена'))
        }
        friendShip.accepted = true;
        await friendShip.save();
        
        return res.json({ message: 'Заявка в друзья успешно принята' })
    }
    async rejectFriendship(req, res, next) {
        const {senderId, receiverId} = req.body
        const friendShip = await FriendShips.findOne({where: {senderId,receiverId}});
        return res.json(friendShip)
    }
}


module.exports = new FriendShipController()