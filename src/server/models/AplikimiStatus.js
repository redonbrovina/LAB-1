const { DataTypes } = require("sequelize");
const sequelize = require("../database/Database");

const AplikimiStatus = sequelize.define("AplikimiStatus", {
    aplikimi_statusID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    statusi: {
        type: DataTypes.STRING(50),
        allowNull: true
    }
}, {
    tableName: 'aplikimi_status',
    timestamps: false
});

module.exports = AplikimiStatus;