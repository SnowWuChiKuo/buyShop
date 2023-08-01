const express = require('express')
const router = express.Router()
const admin = require('./modules/admin')

const productController = require('../../controllers/apis/product-controllers')


router.use('/admin', admin)

router.get('/products/top', productController.getTopProducts)
router.get('/products/feeds', productController.getFeeds)
router.get('/products/:id/dashboard', productController.getDashboard)
router.get('/products/:id', productController.getProduct)
router.get('/products', productController.getProducts)


router.use('/', (req, res) => res.redirect('/products'))

module.exports = router