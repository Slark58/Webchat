const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const chatRouter = require('./chatRouter')

router.use('/user', userRouter)
router.use('/chat', chatRouter)

module.exports = router