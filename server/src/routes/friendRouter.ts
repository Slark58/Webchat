const Router = require('express')
const router = new Router()
const FriendShipController = require('../controllers/friendShipController')


//? GET
router.get('/all', FriendShipController.getAllFriends)
router.get('/search', FriendShipController.getFriendByQuery)
router.get('/getRequestIncomming', FriendShipController.getFriendshipWannabe)
router.get('/getRequestOutcomming', FriendShipController.getPotentialFriendship)


//? POST
router.post('/add', FriendShipController.makeFriendship)
router.post('/accept', FriendShipController.acceptFriendship)
router.post('/reject', FriendShipController.rejectFriendship)

module.exports = router