const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User, Comment, Product, Favorite, Like, Followship } = require('../../models')
const { imgurFileHandler } = require('../../helpers/file-helpers')
const { getUser } = require('../../helpers/auth-helpers')

const userController = {
  signUpPage: (req, cb) => {
    cb(null)
  },
  signUp: async (req, res, next) => {
    try {
      const { name, email, password, passwordCheck } = req.body

      if (!name || !email || !password || !passwordCheck) throw new Error('欄位不可以空白!')

      if (password !== passwordCheck) throw new Error('密碼與確認密碼不同!')

      const user = await User.findOne({ where: { email } })

      if (user) throw new Error('帳號或信箱已有人使用了!')

      const hash = await bcrypt.hash(req.body.password, 10)

      const data = await User.create({
        name,
        email,
        password: hash
      })
      
      res.json({
        status: 'success',
        data 
      })
    } catch (err) {
      next(err)
    }
  },
  signInPage: (req, cb) => {
    cb(null)
  },
  signIn: async (req, res, next) => {
    try {
      const userData = await req.user.toJSON()
      delete userData.password
      const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '30d' })
      res.json({
        status: 'success',
        data: {
          token,
          user: userData
        }
      })
    } catch (err) {
      next(err)
    }
  },
  logout: (req, cb) => {
    req.flash('success_messages', '登出成功!')
    req.logout()
    cb(null)
  },
  getUser: async (req, cb) => {
    try {
      const currentUser = getUser(req)
      const user = await User.findByPk(req.params.id, {
        include: [{ model: Comment, include: Product }]
      })
      if (!user) throw new Error('使用者不存在!')
      cb(null, { currentUser, user: user.toJSON() })
    } catch (err) {
      cb(err)
    }
  },
  editUser: async (req, cb) => {
    try {
      const user = await User.findByPk(req.params.id, { raw: true })
      if (!user) throw new Error('使用者不存在!')
      cb(null, { user })
    } catch (err) {
      cb(err)
    }
  },
  putUser: async (req, cb) => {
    try {
      const { name } = req.body
      const { file } = req
      const [user, filePath] = await Promise.all([
        User.findByPk(req.params.id),
        imgurFileHandler(file)
      ])

      if (!user) throw new Error('使用者不存在!')
      const data = user.update({
        name: name || user.image,
        image: filePath || user.image
      })
      req.flash('success_messages', '使用者資料編輯成功!')
      cb(null, { data })
    } catch (err) {
      cb(err)
    }
  },
  addFavorite: async (req, cb) => {
    try {
      const { productId } = req.params
      let [product, favorite] = await Promise.all([
        Product.findByPk(productId),
        Favorite.findOne({
          where: {
            userId: req.user.id,
            productId
          }
        })
      ])
      if (!product) throw new Error('產品不存在!')
      if (favorite) throw new Error('此產品已加入過最愛!')

      const data = await Favorite.create({
        userId: req.user.id,
        productId
      })
      cb(null, { data })
    } catch (err) {
      cb(err)
    }
  },
  removeFavorite: async (req, cb) => {
    try {
      const favorite = await Favorite.findOne({
        where: {
          userId: req.user.id,
          productId: req.params.productId
        }
      })
      if (!favorite) throw new Error('未加入最愛此產品!')
      const data = await favorite.destroy()
      cb(null, { data })
    } catch (err) {
      cb(err)
    }

  },
  addLike: async (req, cb) => {
    try {
      const { productId } = req.params
      let [product, like] = await Promise.all([
        Product.findByPk(productId),
        Like.findOne({
          where: {
            userId: req.user.id,
            productId
          }
        })
      ])

      if (!product) throw new Error('產品不存在!')
      if (like) throw new Error('此產品已加入喜歡!')

      const data = await Like.create({
        userId: req.user.id,
        productId
      })
      cb(null, { data })
    } catch (err) {
      cb(err)
    }
  },
  removeLike: async (req, cb) => {
    try {
      const like = await Like.findOne({
        where: {
          userId: req.user.id,
          productId: req.params.productId
        }
      })

      if (!like) throw new Error('未加入喜歡此產品!')
      const data = await like.destroy()

      cb(null, { data })
    } catch (err) {
      cb(err)
    }
  },
  getTopUsers: async (req, cb) => {
    try {
      let users = await User.findAll({
        include: [{ model: User, as: 'Followers' }]
      })

      users = users.map(user => ({
        ...user.toJSON(),
        followerCount: user.Followers.length,
        isFollowed: req.user.Followings.some(f => f.id === user.id)
      }))
      users = users.sort((a, b) => b.followerCount - a.followerCount)
      cb(null, { users })
    } catch (err) {
      cb(err)
    }
  },
  addFollowing: async (req, cb) => {
    try {
      const { userId } = req.params
      const [user, followship] = await Promise.all([
        User.findByPk(userId),
        Followship.findOne({
          where: {
            followerId: req.user.id,
            followingId: req.params.userId
          }
        })
      ])

      if (!user) throw new Error('找不到使用者!')
      if (followship) throw new Error('已經追蹤過此使用者!')
      const data = await Followship.create({
        followerId: req.user.id,
        followingId: userId
      })

      cb(null, { data })
    } catch (err) {
      cb(err)
    }
  },
  removeFollowing: async (req, cb) => {
    try {
      const followship = await Followship.findOne({
        where: {
          followerId: req.user.id,
          followingId: req.params.userId
        }
      })

      if (!followship) throw new Error('未追蹤過此使用者!')
      const data = await followship.destroy()
      cb(null, { data })
    } catch (err) {
      cb(err)
    }
  }
}

module.exports = userController