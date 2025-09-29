const {DataTypes} = require("sequelize");
const sequelize = require("../database/Database");

const Ligjeruesi = sequelize.define("Ligjeruesi", {
    LecturerID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    LecturerName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Department: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "ligjeruesi",
    timestamps: false
});

Ligjeruesi.associate = function(models) {
    Ligjeruesi.hasMany(models.Ligjerata, {
        foreignKey: 'LecturerID',
        as: 'Ligjerata'
    });
};


module.exports = Ligjeruesi;