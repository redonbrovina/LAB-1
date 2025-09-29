const { DataTypes } = require("sequelize");
const sequelize = require("../database/Database");

const Team = sequelize.define("Team", {
    TeamId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Name: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'teams',
    timestamps: false
});

// Define relationships after model is created
Team.associate = function(models) {
    Team.hasMany(models.Player, { 
        foreignKey: 'TeamId',
        as: 'players'
    });
};

module.exports = Team;
