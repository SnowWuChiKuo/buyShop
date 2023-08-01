const bcrypt = require('bcryptjs')
const { User, Comment, Product, Favorite, Like, Followship } = require('../models')
const { imgurFileHandler } = require('../helpers/file-helpers')
const { getUser } = require('../helpers/auth-helpers')

const userServices = {
  signUpPage: (req, cb) => {
    cb(null)
  },
  signUp: (req, cb) => {
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
        cb(null)
      })
      .catch(err => cb(err))
  },
  signInPage: (req, cb) => {
    cb(null)
  },
  signIn: (req, cb) => {
    req.flash('success_messages', '成功登入!')
    cb(null)
  },
  logout: (req, cb) => {
    req.flash('success_messages', '登出成功!')
    req.logout()
    cb(null)
  },
  getUser: (req, cb) => {
    const currentUser = getUser(req)
    return User.findByPk(req.params.id, {
      include: [{ model: Comment, include: Product }]
    })
      .then(user => {
        if (!user) throw new Error('使用者不存在!')
        return cb(null, { currentUser, user })
      })
      .catch(err => cb(err))
  },
  editUser: (req, cb) => {
    return User.findByPk(req.params.id)
      .then(user => {
        if (!user) throw new Error('使用者不存在!')
        user = user.toJSON()
        return cb(null, { user })
      })
      .catch(err => cb(err))
  },
  putUser: (req, cb) => {
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
        cb(null)
      })
      .catch(err => cb(err))
  },
  addFavorite: (req, cb) => {
    const { productId } = req.params
    return Promise.all([
      Product.findByPk(productId),
      Favorite.findOne({
        where: {
          userId: req.user.id,
          productId
        }
      })
    ])
      .then(([product, favorite]) => {
        if (!product) throw new Error('產品不存在!')
        if (favorite) throw new Error('此產品已加入過最愛!')

        return Favorite.create({
          userId: req.user.id,
          productId
        })
      })
      .then(() => cb(null))
      .catch(err => cb(err))
  },
  removeFavorite: (req, cb) => {
    return Favorite.findOne({
      where: {
        userId: req.user.id,
        productId: req.params.productId
      }
    })
      .then(favorite => {
        if (!favorite) throw new Error('未加入最愛此產品!')
        return favorite.destroy()
      })
      .then(() => cb(null))
      .catch(err => cb(err))

  },
  addLike: (req, cb) => {
    const { productId } = req.params
    return Promise.all([
      Product.findByPk(productId),
      Like.findOne({
        where: {
          userId: req.user.id,
          productId
        }
      })
    ])
      .then(([product, like]) => {
        if (!product) throw new Error('產品不存在!')
        if (like) throw new Error('此產品已加入喜歡!')

        return Like.create({
          userId: req.user.id,
          productId
        })
      })
      .then(() => cb(null))
      .catch(err => cb(err))
  },
  removeLike: (req, cb) => {
    return Like.findOne({
      where: {
        userId: req.user.id,
        productId: req.params.productId
      }
    })
      .then(like => {
        if (!like) throw new Error('未加入喜歡此產品!')
        return like.destroy()
      })
      .then(() => cb(null))
      .catch(err => cb(err))
  },
  getTopUsers: (req, cb) => {
    return User.findAll({
      include: [{ model: User, as: 'Followers' }]
    })
      .then(users => {
        users = users.map(user => ({
          ...user.toJSON(),
          followerCount: user.Followers.length,
          isFollowed: req.user.Followings.some(f => f.id === user.id)
        }))
        users = users.sort((a, b) => b.followerCount - a.followerCount)
        cb(null, { users: users })
      })
      .catch(err => cb(err))
  },
  addFollowing: (req, cb) => {
    const { userId } = req.params
    Promise.all([
      User.findByPk(userId),
      Followship.findOne({
        where: {
          followerId: req.user.id,
          followingId: req.params.userId
        }
      })
    ])
      .then(([user, followship]) => {
        if (!user) throw new Error('找不到使用者!')
        if (followship) throw new Error('已經追蹤過此使用者!')
        return Followship.create({
          followerId: req.user.id,
          followingId: userId
        })
      })
      .then(() => cb(null))
      .catch(err => cb(err))
  },
  removeFollowing: (req, cb) => {
    Followship.findOne({
      where: {
        followerId: req.user.id,
        followingId: req.params.userId
      }
    })
      .then(followship => {
        if (!followship) throw new Error('未追蹤過此使用者!')
        return followship.destroy()
      })
      .then(() => cb(null))
      .catch(err => cb(err))
  }
}

module.exports = userServices