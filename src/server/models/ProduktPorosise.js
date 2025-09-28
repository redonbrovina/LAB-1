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
    produktiID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Produkti',
            key: 'produktiID'
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
    ProduktPorosise.belongsTo(models.Produkti, { 
        foreignKey: 'produktiID',
        as: 'produkti'
    });
};

module.exports = ProduktPorosise;