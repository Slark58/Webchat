const Router = require('express')
const router = new Router()
const cahtController = require('../controllers/cahtController')

router.post('/chats', cahtController.getChats)
// router.post('/myChats', )


module.exports = router