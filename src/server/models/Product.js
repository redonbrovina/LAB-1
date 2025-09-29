const { DataTypes } = require('sequelize');
const sequelize = require('../database/Database');

const Product = sequelize.define('Product', {
  ProductId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  ProductName: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  Price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  StoreId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'stores',
      key: 'StoreId'
    }
  }
}, {
  tableName: 'products',
  timestamps: true,
  createdAt: 'CreatedAt',
  updatedAt: 'UpdatedAt'
});

module.exports = Product;
