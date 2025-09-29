const { DataTypes } = require("sequelize");
const sequelize = require("../database/Database");

const Lecture = sequelize.define("Lecture", {
    LectureID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    LectureName: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    LecturerID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'lecturers',
            key: 'LecturerID'
        }
    }
}, {
    tableName: 'lectures',
    timestamps: false,
    indexes: [
        {
            fields: ['LecturerID']
        }
    ]
});

// Define relationships after model is created
Lecture.associate = function(models) {
    Lecture.belongsTo(models.Lecturer, { 
        foreignKey: 'LecturerID',
        as: 'lecturer'
    });
};

module.exports = Lecture;
