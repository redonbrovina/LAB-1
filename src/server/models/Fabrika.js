const { DataTypes } = require("sequelize");
const sequelize = require("../database/Database");

const Fabrika = sequelize.define("Fabrika", {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'ID'
    },
    EmriFabrikes: {
        type: DataTypes.STRING(200),
        allowNull: false,
        field: 'EmriFabrikes'
    },
    Lokacioni: {
        type: DataTypes.STRING(200),
        allowNull: false,
        field: 'Lokacioni'
    }
}, {
    tableName: 'fabrika',
    timestamps: true,
    createdAt: 'CreatedAt',
    updatedAt: 'UpdatedAt'
});

Fabrika.associate = (models) => {
    Fabrika.hasMany(models.Punetori, {
        foreignKey: 'ID_fabrika',
        as: 'punetoret'
    });
};

module.exports = Fabrika;