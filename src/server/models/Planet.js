const { DataTypes } = require('sequelize');
const sequelize = require('../database/Database');

const Planet = sequelize.define('Planet212299999', {
  PlanetId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'PlanetId'
  },
  Name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'Name'
  },
  Type: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'Type'
  },
  IsDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: 'IsDeleted'
  }
}, {
  tableName: 'Planet212299999',
  timestamps: true,
  createdAt: 'CreatedAt',
  updatedAt: 'UpdatedAt',
  paranoid: false, // We handle soft delete manually with IsDeleted
  defaultScope: {
    where: {
      IsDeleted: false
    }
  }
});

// Define associations
Planet.associate = (models) => {
  Planet.hasMany(models.Satellite, {
    foreignKey: 'PlanetId',
    as: 'Satellites'
  });
};

module.exports = Planet;
