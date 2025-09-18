const { DataTypes } = require("sequelize");
const sequelize = require("../database/Database");

const LevizjaNeStok = sequelize.define("LevizjaNeStok", {
    levizjaID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    lloji_levizjes: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    sasia: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: 1
        }
    },
    koha_krijimit: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    },
    produkt_variacioniID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'ProduktVariacioni',
            key: 'produkt_variacioniID'
        }
    },
    porosiaID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Porosia',
            key: 'porosiaID'
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
    tableName: "leviza_ne_stok",
    timestamps: false
});

// Define relationships after model is created
LevizjaNeStok.associate = function(models) {
    LevizjaNeStok.belongsTo(models.ProduktVariacioni, { 
        foreignKey: 'produkt_variacioniID',
        as: 'produktVariacioni'
    });
    LevizjaNeStok.belongsTo(models.Porosia, { 
        foreignKey: 'porosiaID',
        as: 'porosia'
    });
    LevizjaNeStok.belongsTo(models.Admin, { 
        foreignKey: 'adminID',
        as: 'admin'
    });
};

module.exports = LevizjaNeStok;
