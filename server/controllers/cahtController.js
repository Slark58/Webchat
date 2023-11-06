const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {Chat, User, ChatMembers} = require('../models/models')


class CahatController {

    async getChats(req, res, next) {
        const {name} = req.body
        if (!name) {
            return next(ApiError.badRequest('Пользователь не найден'))
        }
        const candidates = await User.findAll({where: {name}})
        return res.json({candidates})
    }

    // async registration(req, res, next) {
    //     const {email, password, username, role} = req.body
    //     if (!email || !password) {
    //         return next(ApiError.badRequest('Некорректный email или password'))
    //     }
    //     const candidate = await User.findOne({where: {email}})
    //     if (candidate) {
    //         return next(ApiError.badRequest('Пользователь с таким email уже существует'))
    //     }
    //     const hashPassword = await bcrypt.hash(password, 5)
    //     const user = await User.create({email, role, username, password: hashPassword})
    //     const token = generateJwt(user.id, user.email, user.username, user.role)
    //     return res.json({token})
    // }

    // async login(req, res, next) {
    //     const {email, password} = req.body
    //     const user = await User.findOne({where: {email}})
    //     if (!user) {
    //         return next(ApiError.internal('Пользователь не найден'))
    //     }
    //     let comparePassword = bcrypt.compareSync(password, user.password)
    //     if (!comparePassword) {
    //         return next(ApiError.internal('Указан неверный пароль'))
    //     }
    //     const token = generateJwt(user.id, user.email, user.username, user.role)
    //     return res.json({token})
    // }

    // async check(req, res, next) {
    //     const token = generateJwt(req.user.id, req.user.email, req.user.username, req.user.role)
    //     return res.json({token})
    // }

    // async addChat(res, req, next) {
        
    // }
}

module.exports = new CahatController()