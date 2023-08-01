const { imgurFileHandler } = require('../helpers/file-helpers')
const { Product, User, Category } = require('../models')


const adminServices = {
  getProducts: (req, cb) => {
    Product.findAll({
      raw: true,
      nest: true,
      include: [Category]
    })
      .then(products => cb(null, { products }))
      .catch(err => cb(err))
  },
  createProduct: (req, cb) => {
    Category.findAll({
      raw: true,
      nest: true
    })
      .then(categories => cb(null, { categories }))
      .catch(err => cb(err))
  },
  postProduct: (req, cb) => {
    const { name, price, description, image, categoryId } = req.body

    if (!name) throw new Error('產品名稱不可空白!')

    const { file } = req

    imgurFileHandler(file)
      .then(filePath => Product.create({
        name,
        price,
        description,
        image: filePath || null,
        categoryId
      }))

      .then(() => {
        req.flash('success_messages', '產品創建成功!')
        cb(null)
      })
      .catch(err => cb(err))
  },
  getProduct: (req, cb) => {
    Product.findByPk(req.params.id, {
      raw: true,
      nest: true,
      include: [Category]
    })

      .then(product => {
        if (!product) throw new Error('找不到此產品!')
        cb(null, { product })
      })
      .catch(err => cb(err))
  },
  editProduct: (req, cb) => {
    return Promise.all([
      Product.findByPk(req.params.id, { raw: true }),
      Category.findAll({ raw: true })
    ])
      .then(([product, categories]) => {
        if (!product) throw new Error('找不到此產品!')
        cb(null, { product, categories })
      })
      .catch(err => cb(err))
  },
  putProduct: (req, cb) => {
    const { name, price, description, categoryId } = req.body
    if (!name) throw new Error('請輸入產品名稱!')

    const { file } = req

    Promise.all([
      Product.findByPk(req.params.id),
      imgurFileHandler(file)
    ])
      .then(([product, filePath]) => {
        if (!product) throw new Error('找不到此產品!')
        return product.update({
          name,
          price,
          description,
          image: filePath || product.image,
          categoryId
        })
      })
      .then(() => {
        req.flash('success_messages', '產品編輯成功!')
        cb(null)
      })
      .catch(err => cb(err))
  },
  deleteProduct: (req, cb) => {
    Product.findByPk(req.params.id)
      .then(product => {
        if (!product) throw new Error('找不到此產品!')
        return product.destroy()
      })
      .then(() => cb(null))
      .catch(err => cb(err))
  },
  getUsers: (req, cb) => {
    User.findAll({ raw: true })
      .then(users => cb(null, { users }))
      .catch(err => cb(err))
  },
  patchUser: (req, cb) => {
    return User.findByPk(req.params.id)
      .then(user => {
        if (!user) throw new Error('找不到此使用者!')
        if (user.email === 'root@example.com') {
          req.flash('error_messages', '禁止變更 root 權限!')
          return cb(null)
        }
        return user.update({ isAdmin: !user.isAdmin })
      })
      .then(() => {
        req.flash('success_messages', '使用者變更權限成功!')
        return cb(null)
      })
      .catch(err => cb(err))
  }
}

module.exports = adminServices