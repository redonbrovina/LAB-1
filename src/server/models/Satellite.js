const { DataTypes } = require('sequelize');
const sequelize = require('../database/Database');

const Satellite = sequelize.define('Satellite212299999', {
  SatelliteId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'SatelliteId'
  },
  Name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'Name'
  },
  IsDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: 'IsDeleted'
  },
  PlanetId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'PlanetId',
    references: {
      model: 'Planet212299999',
      key: 'PlanetId'
    }
  }
}, {
  tableName: 'Satellite212299999',
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
Satellite.associate = (models) => {
  Satellite.belongsTo(models.Planet, {
    foreignKey: 'PlanetId',
    as: 'Planet'
  });
};

module.exports = Satellite;
