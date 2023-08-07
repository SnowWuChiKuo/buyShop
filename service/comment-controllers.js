const { Comment, User, Product } = require('../models')

const commentServices = {
  postComment: async(req, cb) => {
    try {
      const { productId, text } = req.body
      const userId = req.user.id
      if (!text) throw new Error('評論未建立!')
      const [user, product] = await Promise.all([
        User.findByPk(userId),
        Product.findByPk(productId)
      ])
      if (!user) throw new Error('使用者未建立!')
      if (!product) throw new Error('產品未建立!')
      const data = await Comment.create({
        text,
        productId,
        userId
      })
      cb(null, { data })
    } catch (err) {
      cb(err)
    }
  },
  deleteComment: async(req, cb) => {
    try {
      const comment = await Comment.findByPk(req.params.id)
      if (!comment) throw new Error('找不到此評論!')
      await comment.destroy()
      cb(null, { comment })
    } catch (err) {
      cb(err)
    }
  }
}

module.exports = commentServices