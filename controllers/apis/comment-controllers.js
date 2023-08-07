const commentServices = require('../../service/comment-controllers')

const commentController = {
  postComment: (req, res, next) => {
    commentServices.postComment(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  deleteComment: (req, res, next) => {
    commentServices.deleteComment(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  }
}

module.exports = commentController