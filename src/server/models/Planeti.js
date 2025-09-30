const { DataTypes } = require("sequelize");
const sequelize = require("../database/Database");

const Planeti = sequelize.define("Planeti", {
    PlanetID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Name: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    Type: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    IsDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    }
}, {
    tableName: "planeti",
    timestamps: false
});

Planeti.associate = function(models) {
    Planeti.hasMany(models.Sateliti, { 
        foreignKey: 'PlanetID',
        as: 'satelitet',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
};

module.exports = Planeti;
