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
        allowNull: true
    },
    Number: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    BirthYear: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    TeamId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'team',
            key: 'TeamId'
        }
    }
}, {
    tableName: "player",
    timestamps: false
});

Player.associate = function(models) {
    Player.belongsTo(models.Team, { 
        foreignKey: 'TeamId',
        as: 'team'
    });
};

module.exports = Player;
