const { DataTypes } = require("sequelize");
const sequelize = require("../database/Database");

const Doza = sequelize.define("Doza", {
    dozaID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    doza: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    }
}, {
    tableName: "doza",
    timestamps: false
});

module.exports = Doza;
