const express = require('express')
const router = express.Router()
const admin = require('./modules/admin')
const passport = require('../../config/passport')
const users = require('./modules/user')

const productController = require('../../controllers/apis/product-controllers')
const userController = require('../../controllers/apis/user-controllers')
const commentController = require('../../controllers/apis/comment-controllers')
const { apiErrorHandler } = require('../../middleware/error-handler')
const { generalErrorHandler } = require('../../middleware/error-handler')
const { authenticated, authenticatedAdmin } = require('../../middleware/auth')


router.use('/admin', admin)
router.use('/users', users)

router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)

router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local', { session: false }), userController.signIn)
router.get('/logout', userController.logout)

router.get('/products/top', productController.getTopProducts)
router.get('/products/feeds', productController.getFeeds)
router.get('/products/:id/dashboard', productController.getDashboard)
router.get('/products/:id', productController.getProduct)
router.get('/products', productController.getProducts)

router.delete('/comments/:id', commentController.deleteComment)
router.post('/comments', commentController.postComment)

router.post('/favorite/:productId', userController.addFavorite)
router.delete('/favorite/:productId', userController.removeFavorite)

router.post('/like/:productId', userController.addLike)
router.delete('/like/:productId', userController.removeLike)

router.post('/following/:userId', userController.addFollowing)
router.delete('/following/:userId', userController.removeFollowing)

router.use('/', (req, res) => res.redirect('/products'))
router.use('/', apiErrorHandler)
router.use('/', generalErrorHandler)

module.exports = router