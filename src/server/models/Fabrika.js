const {DataTypes} = require('sequelize')
const sequelize = require('../database/Database')

const Fabrika = sequelize.define('Fabrika', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    EmriFabrikes: {
        type: DataTypes.STRING(255),
    },
    Lokacioni: {
        type: DataTypes.STRING(255),
    }
}, {
    tableName: 'fabrika',
    timestamps: false
});

Fabrika.associate = function(models) {
    Fabrika.hasMany(models.Punetori, {
        foreignKey: 'ID_Fabrika',
        as: 'Fabrika'
    });
}

module.exports = Fabrika;