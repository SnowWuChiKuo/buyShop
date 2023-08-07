const commentServices = require('../../service/comment-controllers')

const commentController = {
  postComment: (req, res, next) => {
    commentServices.postComment(req, (err, data) => err ? next(err) : res.redirect('back')) 
  },
  deleteComment: (req, res, next) => {  
    commentServices.deleteComment(req, (err, data) => err ? next(err) : res.redirect('back'))
  }
}

module.exports = commentController