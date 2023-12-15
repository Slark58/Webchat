const Router = require('express')
const router = new Router()
const FriendShipController = require('../controllers/friendShipController')

router.get('/search', FriendShipController.getFriendByQuery)
router.get('/getfriendship', FriendShipController.getFriendshipWannabe)

router.post('/add', FriendShipController.makeFriendship)

module.exports = router