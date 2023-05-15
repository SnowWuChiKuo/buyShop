const express = require('express')
const router = express.Router()
const admin = require('./modules/admin')

const productController = require('../controllers/product-controllers')
const userController = require('../controllers/user-controllers')

router.use('/admin', admin)

router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)

router.get('/products', productController.getProduct)


router.use('/', (req, res) => res.redirect('/products'))

module.exports = router