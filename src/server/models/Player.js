const { DataTypes } = require("sequelize");
const sequelize = require("../database/Database");

const Player = sequelize.define("Player", {
    PlayerId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    Number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    BirthYear: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    TeamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'teams',
            key: 'TeamId'
        }
    }
}, {
    tableName: 'players',
    timestamps: false,
    indexes: [
        {
            fields: ['TeamId']
        }
    ]
});

// Define relationships after model is created
Player.associate = function(models) {
    Player.belongsTo(models.Team, { 
        foreignKey: 'TeamId',
        as: 'team'
    });
};

module.exports = Player;
