const express = require('express')
const router = express.Router()
const admin = require('./modules/admin')
const passport = require('../config/passport')

const productController = require('../controllers/product-controllers')
const userController = require('../controllers/user-controllers')
const { generalErrorHandler } = require('../middleware/error-handler')
const { authenticated } = require('../middleware/auth')


router.use('/admin', admin)

router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)

router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
router.get('/logout', userController.logout)

router.get('/products', authenticated, productController.getProduct)


router.use('/', (req, res) => res.redirect('/products'))
router.use('/', generalErrorHandler)

module.exports = router