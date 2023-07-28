const express = require('express')
const router = express.Router()
const upload = require('../../../middleware/multer')

const adminController = require('../../../controllers/pages/admin-controllers')
const categoryController = require('../../../controllers/pages/category-controllers')

router.get('/products/create', adminController.createProduct)
router.get('/products/:id/edit', adminController.editProduct)
router.get('/products/:id', adminController.getProduct)
router.put('/products/:id', upload.single('image'), adminController.putProduct)
router.delete('/products/:id', adminController.deleteProduct)
router.get('/products', adminController.getProducts)
router.post('/products', upload.single('image'), adminController.postProduct)

router.patch('/users/:id', adminController.patchUser)
router.get('/users', adminController.getUsers)

router.get('/categories/:id', categoryController.getCategories)
router.put('/categories/:id', categoryController.putCategory)
router.delete('/categories/:id', categoryController.deleteCategory)
router.get('/categories', categoryController.getCategories)
router.post('/categories', categoryController.postCategories)

router.use('/', (req, res) => res.redirect('/admin/products'))

module.exports = router