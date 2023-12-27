const Router = require('express')
const router = new Router()
const FriendShipController = require('../controllers/friendShipController')

router.get('/search', FriendShipController.getFriendByQuery)
router.get('/getfriendship', FriendShipController.getFriendshipWannabe)

router.post('/add', FriendShipController.makeFriendship)
router.post('/accept', FriendShipController.acceptFriendship)
router.post('/reject', FriendShipController.rejectFriendship)

module.exports = router