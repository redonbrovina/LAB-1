const { DataTypes } = require("sequelize");
const sequelize = require("../database/Database");

const Furnitori = sequelize.define("Furnitori", {
    furnitoriID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    emri: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    shtetiID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "Shteti",
            key: "shtetiID"
        }
    }
}, {
    tableName: "furnitori",
    timestamps: false
});

// Define relationships after model is created
Furnitori.associate = function(models) {
    Furnitori.belongsTo(models.Shteti, { 
        foreignKey: 'shtetiID',
        as: 'shteti'
    });
    Furnitori.hasMany(models.ProduktVariacioni, { 
        foreignKey: 'furnitoriID',
        as: 'produktet'
    });
};

module.exports = Furnitori;
