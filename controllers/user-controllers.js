const bcrypt = require('bcryptjs')
const { User, Comment, Product } = require('../models')
const { imgurFileHandler } = require('../helpers/file-helpers')
const { getUser } = require('../helpers/auth-helpers')

const userController = {
  signUpPage: (req, res) => {
    res.render('signup')
  },
  signUp: (req, res, next) => {
    const { name, email, password, passwordCheck } = req.body

    if (!name || !email || !password || !passwordCheck) throw new Error('欄位不可以空白!')

    if (password !== passwordCheck) throw new Error('密碼與確認密碼不同!')

    User.findOne({ where: { email } })
      .then(user => {
        if (user) throw new Error('帳號或信箱已有人使用了!')

        return bcrypt.hash(req.body.password, 10)
      })
      .then(hash => User.create({
        name,
        email,
        password: hash
      }))
      .then(() => {
        req.flash('success_messages', '成功註冊帳號!')
        res.redirect('/sigin')
      })
      .catch(err => next(err))
  },
  signInPage: (req, res) => {
    res.render('signin')
  },
  signIn: (req, res) => {
    req.flash('success_messages', '成功登入!')
    res.redirect('/products')
  },
  logout: (req, res) => {
    req.flash('success_messages', '登出成功!')
    req.logout()
    res.redirect('/signin')
  },
  getUser: (req, res, next) => {
    const currentUser = getUser(req)
    return User.findByPk(req.params.id, {
      include: [{ model: Comment, include: Product }]
    })
      .then(user => {
        if (!user) throw new Error('使用者不存在!')
        user = user.toJSON()
        return res.render('users/profile', { currentUser, user })
      })
      .catch(err => next(err))
  },
  editUser: (req, res, next) => {
    return User.findByPk(req.params.id, { raw: true })
      .then(user => {
        if (!user) throw new Error('使用者不存在!')
        return res.render('users/edit', { user })
      })
      .catch(err => next(err))
  },
  putUser: (req, res, next) => {
    const { name } = req.body
    const { file } = req
    return Promise.all([
      User.findByPk(req.params.id),
      imgurFileHandler(file)
    ])
      .then(([user, filePath]) => {
        if (!user) throw new Error('使用者不存在!')
        return user.update({
          name: name || user.image,
          image: filePath || user.image
        })
      })
      .then(() => {
        req.flash('success_messages', '使用者資料編輯成功!')
        res.redirect(`/users/${req.params.id}`)
      })
      .catch(err => next(err))
  }
}

module.exports = userController