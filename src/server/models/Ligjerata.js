const {DataTypes} = require("sequelize");
const sequelize = require("../database/Database");

const Ligjerata = sequelize.define("Ligjerata", {
    LectureID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    LectureName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    LecturerID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Ligjeruesi',
            key: 'LecturerID'
        }
    }
}, {
    tableName: "ligjerata",
    timestamps: false,
    indexes: [{
        fields: ['LecturerID']
    }]
});

Ligjerata.associate = function(models) {
    Ligjerata.belongsTo(models.Ligjeruesi, {
        foreignKey: 'LecturerID',
        as: 'Ligjeruesi'
    });
};



module.exports = Ligjerata;