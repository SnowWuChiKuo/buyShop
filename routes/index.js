const express = require('express')
const router = express.Router()

const productController = require('../controllers/product-controllers')


router.get('/products', productController.getProduct)


router.use('/', (req, res) => res.redirect('/products'))

module.exports = router