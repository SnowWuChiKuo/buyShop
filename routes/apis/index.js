const express = require('express')
const router = express.Router()
const admin = require('./modules/admin')

const productController = require('../../controllers/apis/product-controllers')



router.use('/admin', admin)

router.get('/products', productController.getProducts)

module.exports = router