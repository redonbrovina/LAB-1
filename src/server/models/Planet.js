const {DataTypes} = require('sequelize')
const sequelize = require('../database/Database')

const Planet = sequelize.define('Planet',{
    PlanetId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    Type: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
}, {
    tableName: 'planet',
    timestamps: false
})

Planet.associate = function(models) {
    Planet.hasMany(models.Satellite, {
        foreignKey: 'PlanetId',
        as: 'Planet'
    })
}

module.exports = Planet