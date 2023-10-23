const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    username: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const ChatMembers = sequelize.define('chat_members', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const Chat = sequelize.define('chat', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
})

const Message = sequelize.define('message', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    content: {type: DataTypes.STRING},
})


User.hasMany(ChatMembers)
ChatMembers.belongsTo(User)

Chat.hasMany(ChatMembers)
ChatMembers.belongsTo(Chat)

User.hasMany(Message)
Message.belongsTo(User)

Chat.hasMany(Message)
Message.belongsTo(Chat)


module.exports = {
    User,
    ChatMembers,
    Chat,
    Message
}