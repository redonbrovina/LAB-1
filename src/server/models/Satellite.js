const {DataTypes} = require('sequelize')
const sequelize = require('../database/Database')

const Satellite = sequelize.define('Satellite', {
    SatelliteId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    PlanetId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Planet',
            key: 'PlanetId'
        }
    }
}, {
    tableName: 'satellite',
    timestamps: false,
    indexes: [{
        fields: ['PlanetId']
    }]
})

Satellite.associate = function(models) {
    Satellite.belongsTo(models.Planet, {
        foreignKey: 'PlanetId',
        as: 'Planet'
    })
}

module.exports = Satellite

