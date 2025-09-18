const { DataTypes } = require("sequelize");
const sequelize = require("../database/Database");

const Porosia = sequelize.define("Porosia", {
    porosiaID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    koha_krijimit: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    },
    porosia_statusID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'PorosiaStatus',
            key: 'porosia_statusID'
        }
    },
    cmimi_total: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: true
    },
    pagesa_statusID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'PagesaStatus',
            key: 'pagesa_statusID'
        }
    },
    klientiID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Klienti',
            key: 'klientiID'
        }
    }
}, {
    tableName: "porosia",
    timestamps: false
});

Porosia.associate = function(models) {
    Porosia.belongsTo(models.PorosiaStatus, { 
        foreignKey: 'porosia_statusID',
        as: 'porosiaStatus'
    });
    Porosia.belongsTo(models.PagesaStatus, { 
        foreignKey: 'pagesa_statusID',
        as: 'pagesaStatus'
    });
    Porosia.belongsTo(models.Klienti, { 
        foreignKey: 'klientiID',
        as: 'klienti'
    });
    Porosia.hasMany(models.Pagesa, { 
        foreignKey: 'porosiaID',
        as: 'pagesat'
    });
    Porosia.hasMany(models.ProduktPorosise, { 
        foreignKey: 'porosiaID',
        as: 'produktet'
    });
    Porosia.hasMany(models.LevizjaNeStok, { 
        foreignKey: 'porosiaID',
        as: 'stockMovements'
    });
};

module.exports = Porosia;
