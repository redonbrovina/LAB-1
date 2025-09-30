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
        allowNull: true
    }
}, {
    tableName: "team",
    timestamps: false
});

Team.associate = function(models) {
    Team.hasMany(models.Player, { 
        foreignKey: 'TeamId',
        as: 'players',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
};

module.exports = Team;
