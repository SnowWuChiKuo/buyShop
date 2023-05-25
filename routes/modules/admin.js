const express = require('express')
const router = express.Router()

const adminController = require('../../controllers/admin-controllers')

router.get('/products/create', adminController.createProduct)
router.get('/products/:id/edit', adminController.editProduct)
router.get('/products/:id', adminController.getProduct)
router.put('/products/:id', adminController.putProduct)
router.get('/products', adminController.getProducts)
router.post('/products', adminController.postProduct)

router.use('/', (req, res) => res.redirect('/admin/products'))

module.exports = router