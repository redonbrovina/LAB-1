const { DataTypes } = require("sequelize");
const sequelize = require("../database/Database");

const Kategoria = sequelize.define("Kategoria", {
    kategoriaID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    emri: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: "kategoria",
    timestamps: false
});

// Define relationships after model is created
Kategoria.associate = function(models) {
    Kategoria.hasMany(models.Produkti, { 
        foreignKey: 'kategoriaID',
        as: 'produktet',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
};

module.exports = Kategoria;
