import Router from 'express'
import userRouter from './userRouter'
import chatRouter from './chatRouter'
import friendRouter from './friendRouter'

const router = new Router()


router.use('/user', userRouter)
router.use('/friend', friendRouter)
// router.use('/chat', chatRouter)

module.exports = router