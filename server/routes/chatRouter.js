const Router = require('express')
const router = new Router()
const cahtController = require('../controllers/cahtController')

router.get('/search', cahtController.getChats)
router.post('/addchat', cahtController.addChats)


module.exports = router