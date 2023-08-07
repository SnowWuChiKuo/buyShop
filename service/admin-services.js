const { imgurFileHandler } = require('../helpers/file-helpers')
const { Product, User, Category } = require('../models')


const adminServices = {
  getProducts: async(req, cb) => {
    try{
      let products = await Product.findAll({
        raw: true,
        nest: true,
        include: [Category]
      })
      return cb(null, { products })
    } catch (err) {
      cb(err)
    }
  },
  createProduct: async(req, cb) => {
    try {
      let categories = await Category.findAll({
        raw: true,
        nest: true
      })
      return cb(null, { categories })
    } catch (err) {
      cb(err)
    }
  },
  postProduct: async(req, cb) => {
    try {
      const { name, price, description, image, categoryId } = req.body
      const { file } = req
      const filePath = await imgurFileHandler(file)
      if (!name) throw new Error('產品名稱不可空白!')
      
      const data = await Product.create({
          name,
          price,
          description,
          image: filePath || null,
          categoryId
        })
      req.flash('success_messages', '產品創建成功!')
      cb(null, { data })
    } catch (err) {
      cb(err)
    }
  },
  getProduct: async(req, cb) => {
    try {
      let product = await Product.findByPk(req.params.id, {
      raw: true,
      nest: true,
      include: [Category]
      })
      if (!product) throw new Error('找不到此產品!')
      cb(null, { product })
    } catch (err) {
      cb(err)
    }
  },
  editProduct: async(req, cb) => {
    try {
      let product = await Product.findByPk(req.params.id, { raw: true })
      let categories = await Category.findAll({ raw: true })
      
      if (!product) throw new Error('找不到此產品!')
      
      cb(null, { product, categories })
    } catch (err) {
      cb(err)
    }
  },
  putProduct: async(req, cb) => {
    try {
      const { name, price, description, categoryId } = req.body
      
      if (!name) throw new Error('請輸入產品名稱!')
      
      const { file } = req
  
      let product = await Product.findByPk(req.params.id)
      let filePath = imgurFileHandler(file)
      if (!product) throw new Error('找不到此產品!')
      const data = await product.update({
            name,
            price,
            description,
            image: filePath || product.image,
            categoryId
          })
      req.flash('success_messages', '產品編輯成功!')
      cb(null, {data})
    } catch (err) {
      cb(err)
    }
  },
  deleteProduct: async(req, cb) => {
    try {
      const product = await Product.findByPk(req.params.id)
        
      if (!product) throw new Error('找不到此產品!')

      const data = await product.destroy()
      cb(null, { data })
    } catch (err) {
      cb(err)
    }
  },
  getUsers: async(req, cb) => {
    try {
      let users = await User.findAll({ raw: true })
        cb(null, { users })
    } catch (err) {
      cb(err)
    }
  },
  patchUser: async(req, cb) => {
    try {
      let user = await User.findByPk(req.params.id)
      if (!user) throw new Error('找不到此使用者!')
      if (user.email === 'root@example.com') {
        req.flash('error_messages', '禁止變更 root 權限!')
          return cb(null)
      }
      await user.update({ isAdmin: !user.isAdmin })
      req.flash('success_messages', '使用者變更權限成功!')
      cb(null, { user })
    } catch (err) {
      cb(err)
    }
  }
}

module.exports = adminServices