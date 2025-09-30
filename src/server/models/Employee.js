const { DataTypes } = require("sequelize");
const sequelize = require("../database/Database");

const Employee = sequelize.define("Employee", {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Name: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    Surname: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: "employee",
    timestamps: false
});

Employee.associate = function(models) {
    Employee.hasMany(models.Contract, { 
        foreignKey: 'Employee',
        as: 'contracts',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
};

module.exports = Employee;
