const { DataTypes } = require("sequelize");
const sequelize = require("../database/Database");

const ProduktPorosise = sequelize.define("ProduktPorosise", {
    produkti_porosiseID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    porosiaID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Porosia',
            key: 'porosiaID'
        }
    },
    produkt_variacioniID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'ProduktVariacioni',
            key: 'produkt_variacioniID'
        }
    },
    sasia: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: 1
        }
    },
    cmimi: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: true
    }
}, {
    tableName: "produkti_porosise",
    timestamps: false
});

ProduktPorosise.associate = function(models) {
    ProduktPorosise.belongsTo(models.Porosia, { 
        foreignKey: 'porosiaID',
        as: 'porosia'
    });
    ProduktPorosise.belongsTo(models.ProduktVariacioni, { 
        foreignKey: 'produkt_variacioniID',
        as: 'produktVariacioni'
    });
};

module.exports = ProduktPorosise;