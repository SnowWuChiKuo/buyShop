const express = require('express')
const router = express.Router()
const admin = require('./modules/admin')
const passport = require('../../config/passport')
const users = require('./modules/user')

const productController = require('../../controllers/pages/product-controllers')
const userController = require('../../controllers/pages/user-controllers')
const commentController = require('../../controllers/pages/comment-controllers')
const { generalErrorHandler } = require('../../middleware/error-handler')
const { authenticated, authenticatedAdmin } = require('../../middleware/auth')


router.use('/admin', authenticatedAdmin, admin)
router.use('/users', authenticated, users)

router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)

router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
router.get('/logout', userController.logout)

router.get('/products/top', productController.getTopProducts)
router.get('/products/feeds', productController.getFeeds)
router.get('/products/:id/dashboard', productController.getDashboard)
router.get('/products/:id', productController.getProduct)
router.get('/products', productController.getProducts)

router.delete('/comments/:id', authenticatedAdmin, commentController.deleteComment)
router.post('/comments', authenticated, commentController.postComment)

router.post('/favorite/:productId', authenticated, userController.addFavorite)
router.delete('/favorite/:productId', authenticated, userController.removeFavorite)

router.post('/like/:productId', authenticated, userController.addLike)
router.delete('/like/:productId', authenticated, userController.removeLike)

router.post('/following/:userId', authenticated, userController.addFollowing)
router.delete('/following/:userId', authenticated, userController.removeFollowing)

router.use('/', (req, res) => res.redirect('/products'))
router.use('/', generalErrorHandler)

module.exports = router