const { DataTypes } = require("sequelize");
const sequelize = require("../database/Database");

const Admin = sequelize.define("Admin", {
    adminID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
            isEmail: true
        }
    },
    pass: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    kodi_personal: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'administrator',
    timestamps: false
});

// Define relationships after model is created
Admin.associate = function(models) {
    Admin.hasMany(models.Aplikimi, { 
        foreignKey: 'adminID',
        as: 'aplikimet'
    });
};

module.exports = Admin;