const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const chatRouter = require('./chatRouter')
const friendRouter = require('./friendRouter')

router.use('/user', userRouter)
router.use('/friend', friendRouter)
// router.use('/chat', chatRouter)

module.exports = router