const express = require('express')
const router = express.Router()

const adminController = require('../../../controllers/apis/admin-controllers')

router.get('/products', adminController.getProducts)

module.exports = router