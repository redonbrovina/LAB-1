const { DataTypes } = require("sequelize");
const sequelize = require("../database/Database");

const Cart = sequelize.define("Cart", {
    cartID: {
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
    cmimi_total: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: true
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
    tableName: 'cart',
    timestamps: false
});

Cart.associate = function(models) {
    Cart.belongsTo(models.Klienti, { 
        foreignKey: 'klientiID',
        as: 'klienti'
    });
    Cart.hasMany(models.ProduktCart, { 
        foreignKey: 'cartID',
        as: 'produktet'
    });
};

module.exports = Cart;
