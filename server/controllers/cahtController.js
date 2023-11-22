const ApiError = require('../error/ApiError');
const {Chat, User, ChatMembers} = require('../models/models')


class CahatController {

    async getChats(req, res, next) {
        const username = req.query.username
        console.log(username);
        if (!username) {
            return next(ApiError.badRequest('Пользователь не найден'))
        }
        const candidates = await User.findAll({where: {username}, attributes: ['id', 'username']})
        return res.json({candidates})
    }

    async addChats(req, res, next) {
        const id = req.body.id;
        // const chat  = Chat.create({})
        console.log(id);
        console.log('Тело запроса:', req.body);
        res.send('Получен POST запрос');
    }

    
}

module.exports = new CahatController()