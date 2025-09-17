const { DataTypes } = require("sequelize");
const sequelize = require("../database/Database");

const Shteti = sequelize.define("Shteti", {
    shtetiID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    emri_shtetit: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    iso_kodi: {
        type: DataTypes.STRING(10),
        allowNull: false
    }
}, {
    tableName: 'shteti',
    timestamps: false
});

// Define relationships after model is created
Shteti.associate = function(models) {
    Shteti.hasMany(models.Klienti, { 
        foreignKey: 'shtetiID',
        as: 'klientet'
    });
};

module.exports = Shteti;
