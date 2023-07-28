const { Comment, User, Product } = require('../../models')

const commentController = {
  postComment: (req, res, next) => {
    const { productId, text } = req.body
    const userId = req.user.id
    if (!text) throw new Error('評論未建立!')
    return Promise.all([
      User.findByPk(userId),
      Product.findByPk(productId)
    ])
      .then(([user, product]) => {
        if (!user) throw new Error('使用者未建立!')
        if (!product) throw new Error('產品未建立!')
        product.increment('commentCounts')
        return Comment.create({
          text,
          productId,
          userId
        })
      })
      .then(() => {
        res.redirect(`/products/${productId}`)
      })
      .catch(err => next(err))
  },
  deleteComment: (req, res, next) => {
    const { productId } = req.body
    
    return Promise.all([
      Comment.findByPk(req.params.id),
      Product.findByPk(productId)
    ])
    
      .then(([comment, product]) => {
        if (!comment) throw new Error('找不到此評論!')
        if (!product) throw new Error('產品未建立!')
        product.decrement('commentCounts')
        return comment.destroy()
      })
      .then(deletedComment => res.redirect(`/products/${deletedComment.productId}`))
      .catch(err => next(err))
  }
}

module.exports = commentController