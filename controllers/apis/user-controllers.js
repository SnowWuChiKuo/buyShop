const userServices = require('../../service/user-controllers')
const jwt = require('jsonwebtoken')

const userController = {
  signUpPage: (req, res, next) => {
    userServices.signUpPage(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  signUp: (req, res, next) => {
    userServices.signUp(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  signInPage: (req, res) => {
    userServices.signInPage(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  signIn: async(req, res, next) => {
    // userServices.signIn(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
    try {
      const userData = await req.user.toJSON()
      delete userData.password
      const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '30d' })
      const data = { token, user: userData }
      console.log(data)
      // req.flash('success_messages', '成功登入!')
      res.json({ status: 'success', data })
    } catch (err) {
      next(err)
    }
  },
  logout: (req, res, next) => {
    userServices.logout(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  getUser: (req, res, next) => {
    userServices.getUser(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  editUser: (req, res, next) => {
    userServices.editUser(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  putUser: (req, res, next) => {
    userServices.putUser(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  addFavorite: (req, res, next) => {
    userServices.addFavorite(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  removeFavorite: (req, res, next) => {
    userServices.removeFavorite(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  addLike: (req, res, next) => {
    userServices.addLike(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  removeLike: (req, res, next) => {
    userServices.removeLike(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  getTopUsers: (req, res, next) => {
    userServices.getTopUsers(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  addFollowing: (req, res, next) => {
    userServices.addFollowing(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  removeFollowing: (req, res, next) => {
    userServices.removeFollowing(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  }
}

module.exports = userController