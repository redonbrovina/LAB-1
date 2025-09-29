const { DataTypes } = require("sequelize");
const sequelize = require("../database/Database");

const Employee = sequelize.define("Employee", {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    Surname: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'employees',
    timestamps: false
});

// Define relationships after model is created
Employee.associate = function(models) {
    Employee.hasMany(models.Contract, { 
        foreignKey: 'EmployeeId',
        as: 'contracts'
    });
};

module.exports = Employee;
