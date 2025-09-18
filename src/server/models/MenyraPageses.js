const { DataTypes } = require("sequelize");
const sequelize = require("../database/Database");

const MenyraPageses = sequelize.define("MenyraPageses", {
    menyra_pagesesID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    menyra_pageses: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: "menyra_pageses",
    timestamps: false
});

// Define relationships after model is created
MenyraPageses.associate = function(models) {
    MenyraPageses.hasMany(models.Pagesa, { 
        foreignKey: 'menyra_pagesesID',
        as: 'pagesat'
    });
};

module.exports = MenyraPageses;
