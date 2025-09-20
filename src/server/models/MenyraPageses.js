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
    },
    klientiID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Klienti',
            key: 'klientiID'
        }
    },
    adminID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Admin',
            key: 'adminID'
        }
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
    MenyraPageses.belongsTo(models.Klienti, { 
        foreignKey: 'klientiID',
        as: 'klienti'
    });
    MenyraPageses.belongsTo(models.Admin, { 
        foreignKey: 'adminID',
        as: 'admin'
    });
};

module.exports = MenyraPageses;
