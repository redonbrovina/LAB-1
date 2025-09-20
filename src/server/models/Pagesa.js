const { DataTypes } = require("sequelize");
const sequelize = require("../database/Database");

const Pagesa = sequelize.define("Pagesa", {
    pagesaID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    shuma_pageses: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: true
    },
    koha_pageses: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    },
    porosiaID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Porosia',
            key: 'porosiaID'
        }
    },
    menyra_pagesesID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'MenyraPageses',
            key: 'menyra_pagesesID'
        }
    },
    numri_llogarise: {
        type: DataTypes.STRING(20),
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
    tableName: "pagesa",
    timestamps: false
});

// Define relationships after model is created
Pagesa.associate = function(models) {
    Pagesa.belongsTo(models.Porosia, { 
        foreignKey: 'porosiaID',
        as: 'porosia'
    });
    Pagesa.belongsTo(models.MenyraPageses, { 
        foreignKey: 'menyra_pagesesID',
        as: 'menyraPageses'
    });
    Pagesa.belongsTo(models.Klienti, { 
        foreignKey: 'klientiID',
        as: 'klienti'
    });
    Pagesa.belongsTo(models.Admin, { 
        foreignKey: 'adminID',
        as: 'admin'
    });
};

module.exports = Pagesa;
