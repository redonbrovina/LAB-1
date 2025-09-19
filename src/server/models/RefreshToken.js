const { DataTypes } = require("sequelize");
const sequelize = require("../database/Database");

const RefreshToken = sequelize.define("RefreshToken", {
    tokenID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING(500),
        allowNull: false,
        unique: true
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userType: {
        type: DataTypes.ENUM('klient', 'admin'),
        allowNull: false
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    isRevoked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: "refresh_tokens",
    timestamps: true
});

module.exports = RefreshToken;
