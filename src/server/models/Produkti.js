const { DataTypes } = require("sequelize");
const sequelize = require("../database/Database");

const Produkti = sequelize.define("Produkti", {
    produktiID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    emri: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    pershkrimi: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    kategoriaID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "Kategoria",
            key: "kategoriaID"
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    furnitoriID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "Furnitori",
            key: "furnitoriID"
        }
    },
    sasia_ne_stok: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
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
    imazhi: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    cmimi: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: true,
        defaultValue: 0.00
    }
}, {
    tableName: "produkti",
    timestamps: false
});

// Define relationships after model is created
Produkti.associate = function(models) {
    Produkti.belongsTo(models.Kategoria, { 
        foreignKey: 'kategoriaID',
        as: 'kategoria'
    });
    Produkti.belongsTo(models.Furnitori, { 
        foreignKey: 'furnitoriID',
        as: 'furnitori'
    });
    Produkti.belongsTo(models.Doza, { 
        foreignKey: 'dozaID',
        as: 'doza'
    });
};

module.exports = Produkti;
