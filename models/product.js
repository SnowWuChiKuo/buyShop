'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models){
      Product.belongsTo(models.Category, { foreignKey: 'categoryId' })
      Product.hasMany(models.Comment, { foreignKey: 'productId' })
      Product.belongsToMany(models.User, {
        through: models.Favorite,
        foreignKey: 'productId',
        as: 'FavoritedUsers'
      })
      Product.belongsToMany(models.User, {
        through: models.Like,
        foreignKey: 'productId',
        as: 'LikedUsers'
      })
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.NUMBER,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    viewCounts: DataTypes.INTEGER,
    commentCounts: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'Products',
    underscored: true,
  })
  return Product
}