const { DataTypes } = require("sequelize");
const sequelize = require("../database/Database");

const Forma = sequelize.define("Forma", {
  FormaID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  lloji_formes: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  tableName: "Forma",
  timestamps: false
});

module.exports = Forma;
