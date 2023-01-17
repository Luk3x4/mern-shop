const router = require('express').Router()
const cartController = require('../controllers/cartController')
const authenticateToken = require('../middleware/authenticateToken')
router.use(authenticateToken)

router.get('/', cartController.getCartData)
router.post('/', cartController.addCartData)
router.delete('/:id', cartController.deleteCartData)

module.exports = router