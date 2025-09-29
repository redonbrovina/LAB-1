const { DataTypes } = require("sequelize");
const sequelize = require("../database/Database");

const Lecturer = sequelize.define("Lecturer", {
    LecturerID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    LecturerName: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    Department: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
}, {
    tableName: 'lecturers',
    timestamps: false
});

// Define relationships after model is created
Lecturer.associate = function(models) {
    Lecturer.hasMany(models.Lecture, { 
        foreignKey: 'LecturerID',
        as: 'lectures'
    });
};

module.exports = Lecturer;
