const { DataTypes } = require("sequelize");
const sequelize = require("../database/Database");

const PagesaStatus = sequelize.define("PagesaStatus", {
    pagesa_statusID: {
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
    tableName: "pagesa_status",
    timestamps: false
});

// Define relationships after model is created
PagesaStatus.associate = function(models) {
    PagesaStatus.hasMany(models.Porosia, { 
        foreignKey: 'pagesa_statusID',
        as: 'porosite'
    });
};

module.exports = PagesaStatus;
