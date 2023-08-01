const express = require('express')
const router = express.Router()
const upload = require('../../../middleware/multer')

const adminController = require('../../../controllers/apis/admin-controllers')

router.get('/products/create', adminController.createProduct)
router.get('/products', adminController.getProducts)
router.post('/products', upload.single('image'), adminController.postProduct)

module.exports = router