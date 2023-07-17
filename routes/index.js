const express = require('express')
const router = express.Router()
const admin = require('./modules/admin')
const passport = require('../config/passport')
const users = require('./modules/user')

const productController = require('../controllers/product-controllers')
const userController = require('../controllers/user-controllers')
const commentController = require('../controllers/comment-controllers')
const { generalErrorHandler } = require('../middleware/error-handler')
const { authenticated, authenticatedAdmin } = require('../middleware/auth')


router.use('/admin', authenticatedAdmin, admin)
router.use('/users', authenticatedAdmin, users)

router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)

router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
router.get('/logout', userController.logout)

router.get('/products/:id/dashboard', authenticated, productController.getDashboard)
router.get('/products/:id', authenticated, productController.getProduct)
router.get('/products', authenticated, productController.getProducts)

router.delete('/comments/:id', authenticatedAdmin, commentController.deleteComment)
router.post('/comments', authenticated, commentController.postComment)

router.use('/', (req, res) => res.redirect('/products'))
router.use('/', generalErrorHandler)

module.exports = router