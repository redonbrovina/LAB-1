const { DataTypes } = require("sequelize");
const sequelize = require("../database/Database");

const Contract = sequelize.define("Contract", {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    Description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    EmployeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'employees',
            key: 'Id'
        }
    }
}, {
    tableName: 'contracts',
    timestamps: false,
    indexes: [
        {
            fields: ['EmployeeId']
        }
    ]
});

// Define relationships after model is created
Contract.associate = function(models) {
    Contract.belongsTo(models.Employee, { 
        foreignKey: 'EmployeeId',
        as: 'employee'
    });
};

module.exports = Contract;
