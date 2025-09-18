const { DataTypes } = require("sequelize");
const sequelize = require("../database/Database");

const Forma = sequelize.define("Forma", {
    formaID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    lloji_formes: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: "forma",
    timestamps: false
});

// Define relationships after model is created
Forma.associate = function(models) {
    Forma.hasMany(models.ProduktVariacioni, { 
        foreignKey: 'formaID',
        as: 'variacionet'
    });
};

module.exports = Forma;
