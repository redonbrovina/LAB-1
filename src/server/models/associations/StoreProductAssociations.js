const Store = require('../Store');
const Product = require('../Product');

// Define associations
Store.hasMany(Product, {
  foreignKey: 'StoreId',
  as: 'products',
  onDelete: 'CASCADE'
});

Product.belongsTo(Store, {
  foreignKey: 'StoreId',
  as: 'store'
});

module.exports = { Store, Product };
