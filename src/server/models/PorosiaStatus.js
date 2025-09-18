const { DataTypes } = require("sequelize");
const sequelize = require("../database/Database");

const PorosiaStatus = sequelize.define("PorosiaStatus", {
    porosia_statusID: {
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
    tableName: "porosia_status",
    timestamps: false
});

PorosiaStatus.associate = function(models) {
    PorosiaStatus.hasMany(models.Porosia, { 
        foreignKey: 'porosia_statusID',
        as: 'porosite'
    });
};

module.exports = PorosiaStatus;
