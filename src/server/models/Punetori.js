const {DataTypes} = require('sequelize');
const sequelize = require('../database/Database');

const Punetori = sequelize.define('Punetori', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Emri: {
        type: DataTypes.STRING(255),
    },
    Mbiemri: {
        type: DataTypes.STRING(255),
    },
    Pozita: {
        type: DataTypes.STRING(255),
    },
    ID_Fabrika: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Fabrika',
            key: 'ID'
        }
    }
}, {
    tableName: 'punetori',
    timestamps: false,
    indexes: [{
        fields: ['ID_Fabrika']
    }]
})

Punetori.associate = function(models) {
    Punetori.belongsTo(models.Fabrika, {
        foreignKey: 'ID_Fabrika',
        as: 'Fabrika'
    })
}

module.exports = Punetori;
