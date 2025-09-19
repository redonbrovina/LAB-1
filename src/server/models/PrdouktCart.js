const { DataTypes } = require("sequelize");
const sequelize = require("../database/Database");

const ProduktCart = sequelize.define("ProduktCart", {
    produkti_cartID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
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
    },
    cartID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Cart',
            key: 'cartID'
        }
    },
    produkt_variacioniID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'ProduktVariacioni',
            key: 'produkt_variacioniID'
        }
    }
}, {
    tableName: "produkti_cart",
    timestamps: false,
    freezeTableName: true
});

ProduktCart.associate = function(models) {
    ProduktCart.belongsTo(models.Cart, { 
        foreignKey: 'cartID',
        as: 'cart'
    });
    ProduktCart.belongsTo(models.ProduktVariacioni, { 
        foreignKey: 'produkt_variacioniID',
        as: 'produktVariacioni'
    });
};

module.exports = ProduktCart;
