const { DataTypes } = require("sequelize");
const sequelize = require("../database/Database");

const Sateliti = sequelize.define("Sateliti", {
    SatelliteID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Name: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    IsDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    PlanetID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'planeti',
            key: 'PlanetID'
        }
    }
}, {
    tableName: "sateliti",
    timestamps: false
});

Sateliti.associate = function(models) {
    Sateliti.belongsTo(models.Planeti, { 
        foreignKey: 'PlanetID',
        as: 'planeti'
    });
};

module.exports = Sateliti;
