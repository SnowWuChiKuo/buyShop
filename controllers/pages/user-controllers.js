const userServices = require('../../service/user-controllers')

const userController = {
  signUpPage: (req, res, next) => {
    userServices.signUpPage(req, (err, data) => err ? next(err) : res.render('signup'))
  },
  signUp: (req, res, next) => {
    userServices.signUp(req, (err, data) => err ? next(err) : res.redirect('/sigin'))
  },
  signInPage: (req, res) => {
    userServices.signInPage(req, (err, data) => err ? next(err) : res.render('signin', data))
  },
  signIn: (req, res) => {
    userServices.signIn(req, (err, data) => err ? next(err) : res.redirect('/products'))
  },
  logout: (req, res) => {
    userServices.logout(req, (err, data) => err ? next(err) : res.redirect('/signin'))
  },
  getUser: (req, res, next) => {
    userServices.getUser(req, (err, data) => err ? next(err) : res.render('users/profile', data))
  },
  editUser: (req, res, next) => {
    userServices.editUser(req, (err, data) => err ? next(err) : res.render('users/edit', data))
  },
  putUser: (req, res, next) => {
    userServices.putUser(req, (err, data) => err ? next(err) : res.redirect('back'))
  },
  addFavorite: (req, res, next) => {
    userServices.addFavorite(req, (err, data) => err ? next(err) : res.redirect('back'))
  },
  removeFavorite: (req, res, next) => {
    userServices.removeFavorite(req, (err, data) => err ? next(err) : res.redirect('back'))
  },
  addLike: (req, res, next) => {
    userServices.addLike(req, (err, data) => err ? next(err) : res.redirect('back'))
  },
  removeLike: (req, res, next) => {
    userServices.removeLike(req, (err, data) => err ? next(err) : res.redirect('back'))
  },
  getTopUsers: (req , res, next) => {
    userServices.getTopUsers(req, (err, data) => err ? next(err) : res.render('top-users', data))
  },
  addFollowing: (req, res, next) => {
    userServices.addFollowing(req, (err, data) => err ? next(err) : res.redirect('back'))
  },
  removeFollowing: (req, res, next) => {
    userServices.removeFollowing(req, (err, data) => err ? next(err) : res.redirect('back'))
  }
}

module.exports = userController