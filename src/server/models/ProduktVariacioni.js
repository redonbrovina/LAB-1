const { DataTypes } = require("sequelize");
const sequelize = require("../database/Database");

const ProduktVariacioni = sequelize.define("ProduktVariacioni", {
    produkt_variacioniID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    cmimi: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: true
    },
    sasia_ne_stok: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0
        }
    },
    formaID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "Forma",
            key: "formaID"
        }
    },
    dozaID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "Doza",
            key: "dozaID"
        }
    },
    furnitoriID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "Furnitori",
            key: "furnitoriID"
        }
    },
    produktiID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "Produkti",
            key: "produktiID"
        }
    }
}, {
    tableName: "produkt_variacioni",
    timestamps: false
});

// Define relationships after model is created
ProduktVariacioni.associate = function(models) {
    ProduktVariacioni.belongsTo(models.Forma, { 
        foreignKey: 'formaID',
        as: 'forma'
    });
    ProduktVariacioni.belongsTo(models.Doza, { 
        foreignKey: 'dozaID',
        as: 'doza'
    });
    ProduktVariacioni.belongsTo(models.Furnitori, { 
        foreignKey: 'furnitoriID',
        as: 'furnitori'
    });
    ProduktVariacioni.belongsTo(models.Produkti, { 
        foreignKey: 'produktiID',
        as: 'produkti'
    });
    ProduktVariacioni.hasMany(models.ProduktCart, { 
        foreignKey: 'produkt_variacioniID',
        as: 'cartItems'
    });
    ProduktVariacioni.hasMany(models.ProduktPorosise, { 
        foreignKey: 'produkt_variacioniID',
        as: 'orderItems'
    });
    ProduktVariacioni.hasMany(models.LevizjaNeStok, { 
        foreignKey: 'produkt_variacioniID',
        as: 'stockMovements'
    });
};

module.exports = ProduktVariacioni;
