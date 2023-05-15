const express = require('express')
const router = express.Router()
const admin = require('./modules/admin')

const productController = require('../controllers/product-controllers')

router.use('/admin', admin)

router.get('/products', productController.getProduct)


router.use('/', (req, res) => res.redirect('/products'))

module.exports = router