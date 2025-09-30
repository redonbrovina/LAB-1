const { DataTypes } = require("sequelize");
const sequelize = require("../database/Database");

const Punetori = sequelize.define("Punetori", {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'ID'
    },
    Emri: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'Emri'
    },
    Mbiemri: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'Mbiemri'
    },
    Pozita: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'Pozita'
    },
    ID_fabrika: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'ID_fabrika',
        references: {
            model: 'fabrika',
            key: 'ID'
        }
    }
}, {
    tableName: 'punetori',
    timestamps: true,
    createdAt: 'CreatedAt',
    updatedAt: 'UpdatedAt'
});

Punetori.associate = (models) => {
    Punetori.belongsTo(models.Fabrika, {
        foreignKey: 'ID_fabrika',
        as: 'fabrika'
    });
};

module.exports = Punetori;