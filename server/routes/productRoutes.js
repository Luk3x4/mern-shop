const express = require('express');
const router = express.Router()
const productController = require('../controllers/productController')
const authenticateToken = require('../middleware/authenticateToken')
router.use(authenticateToken)

router.get('/', productController.getProducts);
router.post('/', productController.addProduct);
router.get('/:id', productController.getSingleProduct)

module.exports = router