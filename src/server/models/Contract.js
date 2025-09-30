const { DataTypes } = require("sequelize");
const sequelize = require("../database/Database");

const Contract = sequelize.define("Contract", {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Employee: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'employee',
            key: 'ID'
        }
    },
    Title: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    Description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: "contract",
    timestamps: false
});

Contract.associate = function(models) {
    Contract.belongsTo(models.Employee, { 
        foreignKey: 'Employee',
        as: 'employee'
    });
};

module.exports = Contract;
