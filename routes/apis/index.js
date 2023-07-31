const express = require('express')
const router = express.Router()

const productController = require('../../controllers/apis/product-controllers')

router.get('/products', productController.getProducts)

module.exports = router