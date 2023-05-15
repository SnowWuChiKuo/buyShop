const express = require('express')
const router = express.Router()

const adminController = require('../../controllers/admin-controllers')

router.get('/products', adminController.getProducts)

router.use('/', (req, res) => res.redirect('/admin/products'))

module.exports = router